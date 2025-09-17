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
                index: "vector_index",
                path:"embeddings",
            }
        }
    ])

    return result;
}

module.exports = getQueries;