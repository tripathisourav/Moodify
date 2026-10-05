const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const blacklistModel = require("../models/blacklist.model")

function getAuthCookieOptions() {
    const isProduction = process.env.NODE_ENV === 'production'
    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax'
    }
}

// async function registerUser(req, res) {
//     const { username, email, password } = req.body

//     const isUserAlreadyExists = await userModel.findOne({
//         $or: [
//             { email },
//             { username }
//         ]
//     })

//     if (isUserAlreadyExists) {
//         return res.status(400).json({
//             message: "User is already registered"
//         })
//     }

//     const user = await userModel.create({
//         username,
//         email,
//         password: await bcrypt.hash(password, 10)
//     })


//     const token = jwt.sign(
//         {
//             id: user._id,
//             username: user.username
//         },
//         process.env.JWT_SECRET, { expiresIn: '1d' }
//     )

//     res.cookie('token', token)

//     res.status(201).json({
//         message: 'user registered successfully',
//         user: {
//             id: user._id,
//             name: user.username,
//             email: user.email
//         }
//     })
// }

async function registerUser(req, res){
    const {username, email, password} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })


    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "User Already Exists"
        })
    }

    const user = await userModel.create({
        username,
        email,
        password: await bcrypt.hash(password, 10)
    })

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        }
    )

    res.cookie('token', token, getAuthCookieOptions())

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            name: user.username,
            email: user.email
        }
    })
}


async function loginUser(req, res) {
    const { identifier, password } = req.body

    const User = await userModel.findOne({
        $or: [
            { username: identifier },
            { email: identifier }
        ]
    }).select('+password') // we need to select password here because in user model we have set select to false for password field

    // const isEmail = identifier.includes('@')

    // const User = await userModel.findOne(
    //     isEmail ? { email: identifier } : { username: identifier }
    // ).select('+password')

    if (!User) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, User.password)

    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign(
        {
            id: User._id,
            username: User.username
        },
        process.env.JWT_SECRET, { expiresIn: '1d' }
    )

    res.cookie('token', token, getAuthCookieOptions())

    res.status(201).json({
        message: 'user logged in successfully',
        user: {
            id: User._id,
            name: User.username,
            email: User.email
        }
    })
}


async function getMe(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: 'User found successfully',
        user
    })
}


async function logoutUser(req, res) {
    const token = req.cookies.token

    if (!token) {
        return res.status(400).json({
            message: "Token not provided"
        })
    }

    try {
        await blacklistModel.create({ token })
    } catch (err) {
        return res.status(503).json({
            message: "Logout service is temporarily unavailable"
        })
    }

    res.clearCookie('token', getAuthCookieOptions())
    // write operation in database every time user logs out to handle this many requests we use redis to store the blacklisted tokens in memory, which will make the lookup faster. we can set the expiry time for the token in Redis, so that we don't have to worry about removing the token from the blacklist after a certain period of time.
    // data stored in redis will be in the form of key-value pair, where key is the token and value is the time when the token was blacklisted. we can set the expiry time for the token in Redis, so that we don't have to worry about removing the token from the blacklist after a certain period of time. 

    return res.status(201).json({
        message: "Logged out successfully"
    })
}






module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser
}