// require('dotenv').config();
// const app = require('./src/app')
// const connectToDB = require('./src/config/database')


// connectToDB();


// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// })



require('dotenv').config()
const app = require('../Backend/src/app')
const connectToDB = require('../Backend/src/config/database')

connectToDB()

app.listen(3000, () => {
    console.log('server is running at port 3000');
})


