const {Worker} = require('bullmq');
const {emailCategorizeQueue , redisConnection} = require('./bullmq');
const { giveDetails } = require('../utils/gemini');
const emailsModel = require('../models/emailsModel');

const worker = new Worker('emailCategorizeQueue', async (job)=>{
    console.log(job.data)
    const {emailObj} = job.data;
    const {subject , body , messageId} = emailObj;
    const currentMessage = await emailsModel.findOne(messageId);
    if(!currentMessage){

    }
    const emailCategory = giveDetails({subject , body});
    currentMessage.folder=emailCategory;
    await currentMessage.save();


} , {connection: redisConnection});