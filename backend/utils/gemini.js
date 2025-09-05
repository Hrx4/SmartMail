const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API,
});

const giveDetails = async (emails) => {
  try {
    const CATEGORIES = [
      "Important",
      "Work",
      "Personal",
      "Spam",
      "Newsletter",
    ];

    console.log("gemnai");

    const prompt = `
    You are an AI assistant that classifies emails into categories.
        Classify the following email into one of these categories: ${CATEGORIES.join(
          ", "
        )}.

    Subject: ${emails.subject}
    Body: ${emails.body}

    Respond with only the category name.
        `;
    console.log(prompt);
    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    console.log(result.text);
    return result.text;
  } catch (err) {
    console.log(err);
    return "Error";
  }
};



const suggetionPromt = async (contexts, query) => {
  try {
    const context = contexts
      .map((item) => `Past Email: ${item._source.query}`)
      .join("\n\n");

    const prompt = `
       You are an AI email assistant. Use the following past queries to take valuable information and craft a reply. If you find out that the nex message is not related to the queries then just return "False" -

    ${context}
    
    new email recived: "${query}"
    
    Generate a helpful and professional reply.
     `;
    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    console.log(result.text);
    return result.text;
  } catch (err) {
    console.log(err);
    return await embeddings(query);
  }
};

module.exports = { giveDetails, suggetionPromt };
