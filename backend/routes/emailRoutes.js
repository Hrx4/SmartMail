

const express = require("express");
const { getAllEmails, addEmailToImap, getEmailByMail, getEmailById } = require("../controllers/emailControllers");
const jwtVerify = require("../middlewares/jwtVerify");
const router = express.Router();


router.post('/allmails', jwtVerify, getAllEmails)
router.post('/addemail' , jwtVerify, addEmailToImap)
router.post('/getemailbymail' , jwtVerify,  getEmailByMail)
router.post('/getemailbyid' , jwtVerify,  getEmailById)

module.exports = router;