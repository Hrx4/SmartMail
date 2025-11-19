const {Queue} = require('bullmq');
// const {Redis} = require('ioredis');

const redisConnection = {
    maxRetriesPerRequest: null,
    port: 6379,
    host: 'redis',
}

const emailCategorizeQueue = new Queue('emailCategorizeQueue', {
    connection: redisConnection,
})
const imapWatcherQueue = new Queue('imapWatcherQueue', {
    connection: redisConnection,
})

module.exports = { emailCategorizeQueue , redisConnection ,imapWatcherQueue}