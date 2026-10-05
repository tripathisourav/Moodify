// require('dotenv').config();
// const app = require('./src/app')
// const connectToDB = require('./src/config/database')


// connectToDB();


// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// })



require('dotenv').config()
const app = require('./src/app')
const connectToDB = require('./src/config/database')

async function startServer() {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured')
        }

        await connectToDB()
        const port = process.env.PORT || 3000
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message)
        process.exit(1)
    }
}

startServer()


