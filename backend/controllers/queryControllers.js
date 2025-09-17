
const asyncHandler = require("express-async-handler");
const queryModel = require("../models/queryModel");
const userModel = require("../models/userModel");
const generateEmbeddings = require("../utils/generateEmbeddings");

const addQuery = asyncHandler(async (req, res) => {

    const {  queryText } = req.body;

    if ( !queryText ) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    const embeddings = await generateEmbeddings(queryText);

    const user = await userModel.findOne({ mainEmail: req.user.email });
    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }
    const query = await queryModel.create({
        userEmail : req.user.email,
        queryText,
        embeddings
    });
    res.status(200).json(query);

})

const getQueries = asyncHandler(async (req, res) => {
    const user = await userModel.find({ mainEmail: req.user.email });
    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }
    const queries = await queryModel.find({ userEmail: req.user.email });
    console.log(queries);
    res.status(200).json(queries);
})

const deleteQuery = asyncHandler(async (req, res) => {
    const { id} = req.body;

    const query = await queryModel.findByIdAndDelete(id);
    res.status(200).json(query);
})


module.exports = { addQuery , deleteQuery , getQueries };