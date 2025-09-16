


const express = require("express");
const jwtVerify = require("../middlewares/jwtVerify");
const { addQuery, deleteQuery } = require("../controllers/queryControllers");
const router = express.Router();


router.post('/addquery' , jwtVerify, addQuery)
router.delete('/deletequery' , jwtVerify, deleteQuery)

module.exports = router;