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
        You are an AI email assistant. Your task is to analyze the new email in relation to past queries.

        ### Past Queries:
        ${context}

        ### New Email:
        "${query}"

        ### Instructions:
        1. If the new email is unrelated to all past queries, reply with exactly:
          False
          (no explanation, no extra text).
        2. If the new email is related, craft a helpful and professional reply.
        3. Your reply should be clear, concise, and in a polite email tone.

        ### Output:
        Return only one of the following:
        - "False"
        - A professional email reply
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