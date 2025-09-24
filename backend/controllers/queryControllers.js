
const asyncHandler = require("express-async-handler");
const queryModel = require("../models/queryModel");
const userModel = require("../models/userModel");
const generateEmbeddings = require("../utils/generateEmbeddings");
const z = require("zod");

const addQuery = asyncHandler(async (req, res) => {
    const schema = z.object({
    queryText: z.string().min(1, "Query text cannot be empty"),
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.errors[0].message,
    });
  }

  const { queryText } = parsed.data;

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
    const schema = z.object({
        id: z.string().min(1, "Query ID is required"),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            error: parsed.error.errors[0].message,
        });
    }
    const { id} = parsed.data;


    const query = await queryModel.findByIdAndDelete(id);
    res.status(200).json(query);
})


module.exports = { addQuery , deleteQuery , getQueries };