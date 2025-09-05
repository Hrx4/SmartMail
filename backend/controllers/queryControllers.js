
const asyncHandler = require("express-async-handler");
const queryModel = require("../models/queryModel");
const userModel = require("../models/userModel");
const generateEmbeddings = require("../utils/generateEmbeddings");

const addQuery = asyncHandler(async (req, res) => {

    const { userEmail, queryText } = req.body;

    if (!userEmail || !queryText ) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    const embeddings = await generateEmbeddings(queryText);

    const user = await userModel.findOne({ mainEmail: userEmail });
    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }
    const query = await queryModel.create({
        userEmail,
        queryText,
        embeddings
    });
    res.status(200).json(query);

})

const deleteQuery = asyncHandler(async (req, res) => {
    const { id} = req.body;

    const query = await queryModel.findByIdAndDelete(id);
    res.status(200).json(query);
})


module.exports = { addQuery , deleteQuery };