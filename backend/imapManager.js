const Imap = require("imap");
const { simpleParser } = require("mailparser");
// const { giveDetails } = require("./gemini");
// const { triggerWebhook } = require("./slack");
const dotenv = require("dotenv");
const emailsModel = require("./models/emailsModel");
const getQueries = require("./utils/getEmbeddedQueries");
const { suggetionPromt } = require("./utils/gemini");
const { triggerWebhook } = require("./slack");
const { emailCategorizeQueue } = require("./config/bullmq");

dotenv.config();



// const FOLDERS = ["INBOX", "[Gmail]/Sent Mail", "[Gmail]/Spam"];
const FOLDERS = ["INBOX", "[Gmail]/Sent Mail"];

function getLast30DaysDate() {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return date
    .toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(",", "");
}

function connectIMAP(account) {
  return new Promise((resolve, reject) => {
    const imap = new Imap(account);

    imap.once("ready", () => {
      console.log(`IMAP connection established for ${account.user}`);
      resolve(imap);
    });

    imap.once("error", (err) =>
    {
      console.log(err) 
      reject(`IMAP Connection Error for ${account.user}: ${err.message}`)
    }
    );
    imap.once("end", () =>
      console.log(`IMAP Connection ended for ${account.user}`)
    );

    imap.connect();
  });
}

function fetchEmailsFromFolder(imap, folder, sinceDate) {
  return new Promise((resolve, reject) => {
    imap.openBox(folder, true, (err , box) => {
      if (err) return reject(`Error opening folder ${folder}: ${err.message}`);

      imap.search([["SINCE", sinceDate]], (err, results) => {
        if (err || !results.length) return resolve([]);
        const fetchRange = `${box.messages.total - 49}:*`

        const f = imap.seq.fetch(fetchRange, { bodies: "", struct: true });
        let emails = [];

        f.on("message", (msg) => {
          let emailData = "";
          msg.on("body", (stream) => {
            stream.on("data", (chunk) => (emailData += chunk.toString("utf8")));
          });

          msg.on("end", async () => {
            try {
              const parsed = await simpleParser(emailData); 
              const emailObj = {
                messageId: parsed.messageId,
                account: parsed.to.value[0].address,
                subject: parsed.subject,
                sender: parsed.from.value[0].address,
                body: parsed.text,
                receivedAt: parsed.date,
              };
              await emailCategorizeQueue.add('categorizeEmails', { emailObj});
              emails.push(emailObj);
            } catch (parseErr) {
              console.error(`Parsing error: ${parseErr.message}`);
            }
          });
        });

        f.once("end", async() => {
            await storeBulkEmail(emails);
          resolve(emails)
        });
        f.once("error", (err) =>
          reject(`Fetch error in ${folder}: ${err.message}`)
        );
      });
    });
  });
}

async function startEmailWatcher(emailAccount) {
  const sinceDate = getLast30DaysDate();
    try {
      const imap = await connectIMAP(emailAccount);
      
      for (const folder of FOLDERS) {
        await fetchEmailsFromFolder(imap, folder, sinceDate);
      }
      watchForNewEmails(imap);
    } catch (error) {
       
      console.error("Error:", error);
      return false
    }
  }


function watchForNewEmails(imap) {
  imap.openBox("INBOX", true, (err) => {
    if (err) throw err;
    console.log("Watching for new emails...");

    imap.on("mail", async () => {
      console.log("New email detected!");
      await fetchLatestEmail(imap);
    });
  });
}

async function fetchLatestEmail(imap) {
  return new Promise((resolve, reject) => {
    imap.search(["ALL"], (err, results) => {
      if (err || !results.length) return reject("No emails found.");

      const latestEmailUID = results[results.length - 1];
      const f = imap.fetch(latestEmailUID, { bodies: "", struct: true });
      let emailData = "";

      f.on("message", (msg) => {
        msg.on("body", (stream) => {
          stream.on("data", (chunk) => (emailData += chunk.toString("utf8")));
        });

        msg.on("end", async () => {
          try {
            const parsed = await simpleParser(emailData);
            let res = "Spam"
             res = await giveDetails({
              subject: parsed.subject,
              body: parsed.text,
            });
            const emailObj = {
              messageId: parsed.messageId,
              account: parsed.to.value[0].address,
              folder: res,
              subject: parsed.subject,
              sender: parsed.from.value[0].address,
              body: parsed.text,
              receivedAt: parsed.date,
            };
            await storeOneEmail(emailObj);
            
            const queriesFromDb = getQueries(parsed.text);

            console.log(queriesFromDb);

            const generatedResponse = await suggetionPromt(queriesFromDb, parsed.text);
            console.log(generatedResponse);
            
            if (generatedResponse !== "False") {
              await triggerWebhook(generatedResponse);
            }

            // if (res === "Interested\n") {
            //   await triggerWebhook(emailObj);
            // }
            resolve(parsed);
          } catch (parseErr) {
            reject(`Parsing error: ${parseErr.message}`);
          }
        });
      });

      f.once("error", (err) => reject(`Fetch error: ${err.message}`));
    });
  });
}

async function storeOneEmail(emailData) {
  try {
    await emailsModel.insertOne(emailData)
  } catch (err) {
    console.error(" Error storing email in Mongo:", err.message);
  }
}

async function storeBulkEmail(emailData) {
  try {
    await emailsModel.insertMany(emailData , {
      
    })
  } catch (err) {
    console.error(" Error storing email in Mongo:", err.message);
  }
}

module.exports = { startEmailWatcher };
