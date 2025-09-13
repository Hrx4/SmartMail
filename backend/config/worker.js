const {Worker} = require('bullmq');
const {emailCategorizeQueue , redisConnection} = require('./bullmq');
const { giveDetails } = require('../utils/llm');
const emailsModel = require('../models/emailsModel');
const { startEmailWatcher } = require('../imapManager');

const worker = new Worker('emailCategorizeQueue', async (job)=>{
    try {
        const {emailObj} = job.data;
    const {subject , body , messageId} = emailObj;
    console.log(emailObj.messageId);
    const currentMessage = await emailsModel.findOne({messageId});
     if (!currentMessage) {
        console.log("Message not found, retrying later...");
        return
      }
      if(currentMessage && currentMessage.folder !== "Pending"){
        return
      }
    const emailCategory = await giveDetails({subject , body});
    if(emailCategory === "Error"){
        await emailCategorizeQueue.add('categorizeEmails',{emailObj});
        return;
    } 
    currentMessage.folder=emailCategory;
    const updatedMails = await currentMessage.save();
    return updatedMails.folder;
    } catch (error) {
        console.error("Worker error:", error.message);
      throw error; // let BullMQ handle retries/backoff
    }
} , {connection: redisConnection});

worker.on('completed', (job , result) => {
        console.log(`Job ${job.id} has completed! Result: ${result}`);
    });

    worker.on('failed', (job, err) => {
        console.error(`Job ${job?.id} has failed with error: ${err.message}`);
    });


const imapWorker = new Worker('imapWatcherQueue', async (job)=>{
    try {
        const {emailAccount , lastSynced , userId} = job.data;
        await startEmailWatcher({emailAccount , lastSynced , userId});

        
    } catch (error) {
        throw new Error(error);
    }
} , {connection: redisConnection});

imapWorker.on('completed', (job , result) => {
        console.log(`Job ${job.id} has completed! Result: ${result}`);
    });

    imapWorker.on('failed', (job, err) => {
        console.error(`Job ${job?.id} has failed with error: ${err.message}`);
    });

    console.log(`Worker for queue emailCategorizeQueue started.`);

