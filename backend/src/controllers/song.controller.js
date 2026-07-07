const songModel = require('../models/song.model')
const id3 = require('node-id3')
const storageService = require('../sevices/storage.services.js')

async function uploadSong(req, res) {
    console.log(req.file , '    ------');
    console.log(req.file.buffer  , '   ------');
    
    const songBuffer = req.file.buffer
    const tags = id3.read(songBuffer)
    
    console.log(tags , '  ------');
    
    const { mood } = req.body


    const posterBuffer = tags.image?.imageBuffer

    console.log(posterBuffer , '  ------');
    

    if (!posterBuffer) {
        return res.status(400).json({
            message: "Song must have cover image"
        })
    }


    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            fileName: tags.title + '.mp3',
            folder: '/cohort-2/moodify/songs'
        }),
        storageService.uploadFile({
            buffer: posterBuffer,
            fileName: tags.title + '.jpeg',
            folder: '/cohort-2/moodify/posters'
        })
    ])

    const song = await songModel.create({
        url: songFile.url,
        posterUrl: posterFile.url,
        title: tags.title,
        mood: mood,
        artist: tags.artist,
        album: tags.album
    })

    return res.status(201).json({
        message: "Song created successfully",
        song
    })

}

async function getSong(req, res) {
    console.log(req.query)

    const { mood } = req.query

    if (!mood) {
        return res.status(400).json({
            message: "Mood is required"
        })
    }

    try {
        const songs = await songModel.find({ mood }).sort({ _id: -1 }).limit(10)

        res.status(200).json({
            message: "song fetched successfully.",
            songs
        })
    } catch (err) {
        res.status(500).json({ message: "Error fetching songs" })
    }
}

module.exports = {
    uploadSong, getSong
}












// {
//   title: 'Aari Aari - PagalNew',
//   artist: 'Shashwat Sachdev, Bombay Rockers',
//   album: 'Dhurandhar The Revenge',
//   recordingTime: '2026',
//   genre: 'Bollywood',
//   publisher: 'Pagalnew',
//   copyright: 'Pagalnew',
//   composer: 'Shashwat Sachdev',
//   userDefinedText: [
//     { description: 'ID3v1 Comment', value: 'Download From Pagalnew' },
//     { description: 'comment', value: 'Download From Pagalnew' },
//     {
//       description: 'Download From PagalNew.com',
//       value: 'Download From PagalNew.com'
//     },
//     {
//       description: 'description',
//       value: 'Ranveer Singh, R. Madhavan, Sanjay Dutt, Arjun Rampal'
//     }
//   ],
//   performerInfo: 'Shashwat Sachdev, Bombay Rockers, Irshad Kamil, Khan Saab',
//   encodingTechnology: 'Lavf57.83.100',
//   image: {
//     mime: 'image/jpeg',
//     type: { id: 3, name: 'front cover' },
//     description: undefined,
//     imageBuffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 02 00 00 64 00 64 00 00 ff ec 00 11 44 75 63 6b 79 00 01 00 04 00 00 00 24 00 00 ff ee 00 0e 41 64 6f 62 65 00 64 ... 29101 more bytes>
//   },
//   raw: {
//     TIT2: 'Aari Aari - PagalNew',
//     TPE1: 'Shashwat Sachdev, Bombay Rockers',
//     TALB: 'Dhurandhar The Revenge',
//     TDRC: '2026',
//     TCON: 'Bollywood',
//     TPUB: 'Pagalnew',
//     TCOP: 'Pagalnew',
//     TCOM: 'Shashwat Sachdev',
//     TXXX: [ [Object], [Object], [Object], [Object] ],
//     TPE2: 'Shashwat Sachdev, Bombay Rockers, Irshad Kamil, Khan Saab',
//     TSSE: 'Lavf57.83.100',
//     APIC: {
//       mime: 'image/jpeg',
//       type: [Object],
//       description: undefined,
//       imageBuffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 02 00 00 64 00 64 00 00 ff ec 00 11 44 75 63 6b 79 00 01 00 04 00 00 00 24 00 00 ff ee 00 0e 41 64 6f 62 65 00 64 ... 29101 more bytes>
//     }
//   }
// }