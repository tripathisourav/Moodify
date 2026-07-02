const mongoose = require('mongoose')

const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "token is required for blacklisting."],
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('blacklist', blackListSchema)


// here we use redis instead of mongodb for blacklisting the token. Redis is an in-memory data structure store, which is used as a database, cache and message broker. It is a NoSQL database that supports various data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs and geospatial indexes with radius queries and streams. Redis has built-in replication, Lua scripting, LRU eviction, transactions and different levels of on-disk persistence, and provides high availability via Redis Sentinel and automatic partitioning with Redis Cluster.
// because of high throughput and low latency, Redis is a good choice for blacklisting tokens. We can set the expiry time for the token in Redis, so that we don't have to worry about removing the token from the blacklist after a certain period of time. We can also use Redis to store the blacklisted tokens in memory, which will make the lookup faster.