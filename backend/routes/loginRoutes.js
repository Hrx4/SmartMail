
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { userLogin, userLogout } = require("../controllers/loginController");


router.get('/auth', userLogin)
router.get('/logout', userLogout)
module.exports = router;