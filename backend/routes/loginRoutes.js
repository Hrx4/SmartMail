
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { userLogin } = require("../controllers/loginController");


router.get('/auth', userLogin)
module.exports = router;