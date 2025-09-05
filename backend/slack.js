const axios = require("axios");
const dotenv = require('dotenv');

dotenv.config()
  
 const  triggerWebhook= async (email) => {
  try {
    console.log(email);
    const message = `Here is the suggested response:\n${email}`;
    await axios.post(
      process.env.WEBHOOK_URL,
      { text: message },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("Webhook triggered!");
  } catch (error) {
    console.error("Webhook Error:", error);
  }
}

module.exports = { triggerWebhook };
