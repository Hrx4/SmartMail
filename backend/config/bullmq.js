const {Queue} = require('bullmq');
const {Redis} = require('ioredis');

const redisConnection = new Redis({
    port: 6379,
    host: 'localhost',
})

const emailCategorizeQueue = new Queue('emailCategorizeQueue', {
    connection: redisConnection,
})

module.exports = { emailCategorizeQueue , redisConnection }