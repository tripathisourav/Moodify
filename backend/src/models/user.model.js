// // userSchema.pre('save', function(next){
// //     if(this.password && this.isModified('password')){
// //         this.password = this.password.split('').reverse().join('')
// //     }   
// //     next();
// // })

// // userSchema.post('save', function(doc, next){
// //     console.log('User saved successfully');
// //     next();
// // })



const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Username is required'],
        unique: [true, 'Username must be unique']
    },
    email: {
        type: String,
        require: [true, 'Email is required'],
        unique: [true, 'Email must be unique']
    },
    password: {
        type: String,
        require: [true, 'Password is required'],
        select: false // This means that when we query the user, the password field will not be returned by default. This is a security measure to prevent the password from being exposed in API responses or logs. If we need to access the password field, we can explicitly include it in our queries using the `select` method.
    }
})


module.exports = mongoose.model('User', userSchema)