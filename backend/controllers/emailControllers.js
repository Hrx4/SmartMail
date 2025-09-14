const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const dotenv = require("dotenv");
const { startEmailWatcher } = require("../imapManager");
const emailsModel = require("../models/emailsModel");
dotenv.config();

const addEmailToImap = asyncHandler(
    async (req, res) => {
        const {  email, password } = req.body;    
        //  console.log(req.user , email , password);

            const emailAccount = {
                                        user: email,
                                        password : password,
                                        host: "imap.gmail.com",
                                        port: 993,
                                        tls: true,
                                        tlsOptions: {
                                            rejectUnauthorized: false,
                                        },
                                    };

             const getLast15DaysDate = () => {
        const sinceDate = new Date();
        sinceDate.setDate(sinceDate.getDate() - 15); // subtract 15 days
        console.log(sinceDate.toLocaleString());
        return sinceDate;
    };

            const success = await startEmailWatcher({emailAccount , lastSynced:getLast15DaysDate().toUTCString().slice(5, 16) , userId:req.user.userId});
            if(success === false){
                throw new Error("Error in Email Watcher");
            }


        const user = await userModel.findOneAndUpdate({ mainEmail : req.user.email }, {
            $push: { emails: { email, password:process.env.APP_PASSWORD } }
        }, { new: true });
        if (!user) {
            res.status(400);
            throw new Error("User not found");
        }
        res.status(200).json(user);

    })

    const getAllEmails = asyncHandler(
        async (req, res) => {
            
            const user = await userModel.findOne({mainEmail : req.user.email});
            const mailIds = user.emails.map((item)=> item.email)

            console.log(mailIds);

            const emails = await emailsModel.find({ account: { $in : mailIds}}).sort({receivedAt:-1});
           
            res.status(200).json({emails , mailIds});
        });

    const getEmailByMail = asyncHandler(
        async (req, res) => {
            const { mail } = req.body;

            const email = await emailsModel.findOne({ account: mail });
            res.status(200).json(email);
        });

    const getEmailById = asyncHandler(
        async (req, res) => {
            const { id } = req.body;
            const email = await emailsModel.findOne({ messageId: id });
            res.status(200).json(email);
        });



module.exports = { addEmailToImap , getAllEmails , getEmailByMail , getEmailById };