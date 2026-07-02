const blacklistModel = require('../models/blacklist.model')
const jwt = require('jsonwebtoken')
const redis = require('../config/cache')

async function authUser(req, res, next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Token not provided"
        })
    }

    const isTokenBlacklisted = await redis.get(token)  //  read operation in database every time middleware is used to handle this many requests we use redis

    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "token is invalid login again"
        })
    }

    let decoded = null

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch(err) {
        return res.status(400).json({
            message: "Invalid Token"
        })
    }
}


module.exports = { authUser }