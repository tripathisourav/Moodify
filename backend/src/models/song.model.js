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
    like: {
        type: String,
        required: true,
        enum: {
            values: ["liked", "disliked"],
            message: 'Like must be either liked or disliked'
        },
        default: "disliked"
    }
}, {
    timestamps: true
})


const songModel = mongoose.model('songs', songSchema)

module.exports = songModel