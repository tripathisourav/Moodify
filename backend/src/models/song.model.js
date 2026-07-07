const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        enum: {
            values: ["sad", "happy", "surprised"],
            message: 'Enum this is'
        }
    }, 
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    },
})


const songModel = mongoose.model('songs', songSchema)

module.exports = songModel