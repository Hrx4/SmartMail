const {Queue} = require('bullmq');
const {Redis} = require('ioredis');

const redisConnection = new Redis({
    maxRetriesPerRequest: null,
    port: 6379,
    host: 'localhost',
})

const emailCategorizeQueue = new Queue('emailCategorizeQueue', {
    connection: redisConnection,
})
const imapWatcherQueue = new Queue('imapWatcherQueue', {
    connection: redisConnection,
})

module.exports = { emailCategorizeQueue , redisConnection ,imapWatcherQueue}