

const express = require("express");
const { getAllEmails, addEmailToImap, getEmailByMail } = require("../controllers/emailControllers");
const jwtVerify = require("../middlewares/jwtVerify");
const router = express.Router();


router.post('/allmails', jwtVerify, getAllEmails)
router.post('/addemail' , jwtVerify, addEmailToImap)
router.post('/getemailbymail' , jwtVerify,  getEmailByMail)

module.exports = router;