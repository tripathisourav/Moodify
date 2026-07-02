const { Router } = require('express')
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const appRouter = Router()

appRouter.post('/register', authController.registerUser)
appRouter.post('/login', authController.loginUser)
appRouter.get('/get-me', authMiddleware.authUser, authController.getMe)
appRouter.post('/logout', authController.logoutUser)

module.exports = appRouter