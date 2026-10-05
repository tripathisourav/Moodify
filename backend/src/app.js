const express = require('express') // Importing the Express framework to create a web server and handle routing in our application. Express is a popular Node.js framework that simplifies the process of building web applications and APIs by providing a robust set of features for handling HTTP requests, middleware, and routing.
const cookieParser = require('cookie-parser') // Importing the cookie-parser package to parse cookies in incoming HTTP requests. This middleware allows us to easily access and manipulate cookies in our Express application, which is essential for handling user sessions, authentication, and other features that rely on cookies.
const cors = require('cors') // Importing the cors package to handle Cross-Origin Resource Sharing (CORS) in our Express application. CORS is a security feature implemented by web browsers that restricts web pages from making requests to a different domain than the one that served the web page. By using the cors middleware, we can specify which origins are allowed to access our API, enabling us to control and secure cross-origin requests.

const app = express()

app.use(express.json()) // Middleware to parse incoming JSON payloads in HTTP requests. This allows us to easily access the data sent in the request body as a JavaScript object, which is essential for handling API requests that involve creating or updating resources with JSON data.
app.use(cookieParser()) 

const localOrigins = [
    "http://localhost:5173",
    "http://localhost:5174"
]
const configuredOrigins = (process.env.CORS_ORIGINS || process.env.FRONTEND_URL || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean)
const allowedOrigins = [...localOrigins, ...configuredOrigins]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}))


const authRouter = require('../src/routes/auth.routes')
const songRouter = require('../src/routes/song.routes')

app.use('/api/auth', authRouter)
app.use('/api/songs', songRouter)

module.exports = app;