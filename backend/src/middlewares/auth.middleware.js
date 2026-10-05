const blacklistModel = require('../models/blacklist.model')
const jwt = require('jsonwebtoken')

async function authUser(req, res, next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Token not provided"
        })
    }

    let isTokenBlacklisted
    try {
        isTokenBlacklisted = await blacklistModel.exists({ token })
    } catch (err) {
        return res.status(503).json({
            message: "Authentication service is temporarily unavailable"
        })
    }

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