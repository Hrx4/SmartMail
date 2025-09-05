const queryModel = require("../models/queryModel");
const generateEmbeddings = require("./generateEmbeddings");

const getQueries = async (body) => {


    const embeddings = await generateEmbeddings(body);


    const result = await queryModel.aggregate([
        {
            $vectorSearch:{
                limit:1,
                numCandidates: 768,
                queryVector: embeddings,
                index: "embeddings_1",
                path:"embeddings",
            }
        }
    ])

    return result;
}

module.exports = getQueries;