

//  npm i ioredis to use redis


const Redis = require("ioredis").default

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    lazyConnect: true,
    retryStrategy(times) {
        if (times > 3) return null
        return Math.min(times * 500, 2000)
    }
})

let redisUnavailable = false

redis.on("connect", () => {
    redisUnavailable = false
    console.log('server is connected to redis');
})

redis.on("error", (err) => {
    if (!redisUnavailable) {
        redisUnavailable = true
        console.error('Redis connection error:', err.code || err.message)
    }
})


module.exports = redis