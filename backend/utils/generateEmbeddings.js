const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API,
});

const generateEmbeddings = async(queryText)=>{
    try {
        const embeddings = await genAI.models.embedContent({
          model: "text-embedding-004",
          contents: queryText,
          config: {
            outputDimensionality: 768,
          },
        });
        return embeddings.embeddings[0].values;
      } catch (err) {
        console.log(err);
      }
}

module.exports = generateEmbeddings;