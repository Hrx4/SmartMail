const { default: axios } = require("axios");

const giveDetails = async (emails) => {
  try {
    const CATEGORIES = [
      "Important",
      "Work",
      "Personal",
      "Spam",
      "Newsletter",
    ];


    const userPrompt = `
        Subject: ${emails.subject}
    Body: ${emails.body}
    `

    const mainPrompt = `
    You are an AI assistant that classifies emails into categories.
        

        ${userPrompt}

    Strictly classify the email into one of these categories: ${CATEGORIES.join(
      ", "
    )}. 
    and dont use any other words , sentences or reply multiple categories just reply with one of the categories.

    
        `;

        
   const response = await axios.post('http://localhost:11434/api/generate', {
        model: 'llama3.1:latest',
        prompt: mainPrompt,
        stream: false
      });
      console.log(response.data.response);
      return response.data.response;


                
  } catch (err) {
    console.log(err);
    return "Error";
  }
};


const suggetionPromt = async (contexts, query) => {
  try {
    const context = contexts.map((item) => `Past Email: ${item}`)
      .join("\n\n");

    const prompt = `
       You are an AI email assistant. Use the following past queries to take valuable information and craft a reply. 
       If you find out that the new email is not related to the queries then strictly return "False" -

    past queries - ${context}
    
    new email recived: "${query}"
    
    Generate a helpful and professional reply.
     `;
    const response = await axios.post('http://localhost:11434/api/generate', {
        model: 'llama3.1:latest',
        prompt: prompt,
        stream: false
      });
      console.log(response.data.response);
      return response.data.response;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};


module.exports = { giveDetails  , suggetionPromt };