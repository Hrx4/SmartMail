


const express = require("express");
const jwtVerify = require("../middlewares/jwtVerify");
const { addQuery, deleteQuery, getQueries } = require("../controllers/queryControllers");
const router = express.Router();


router.post('/addquery' , jwtVerify, addQuery)
router.delete('/deletequery' , jwtVerify, deleteQuery)
router.get('/allqueries' , jwtVerify, getQueries)

module.exports = router;