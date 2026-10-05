const songModel = require('../models/song.model')
const id3 = require('node-id3')
const storageService = require('../sevices/storage.services.js')

async function uploadSong(req, res) {
    // console.log(req.file, '    ------');
    // console.log(req.file.buffer, '   ------');

    if (!req.file) {
        return res.status(400).json({ message: "Please select an MP3 file" })
    }

    const songBuffer = req.file.buffer
    const tags = id3.read(songBuffer)

    // console.log(tags, '  ------');

    const { mood } = req.body


    const posterBuffer = tags.image?.imageBuffer

    // console.log(posterBuffer, '  ------');


    if (!tags.title || !tags.artist || !tags.album || !posterBuffer) {
        return res.status(400).json({
            message: "MP3 must include title, artist, album, and cover image metadata"
        })
    }

    if (!["sad", "happy", "surprised"].includes(mood)) {
        return res.status(400).json({ message: "Please select a valid mood" })
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
        album: tags.album,
        like: "disliked"
    })

    return res.status(201).json({
        message: "Song created successfully",
        song
    })

}


// Toggle like status
async function toggleLike(req, res){
    try {
        const { id } = req.params;

        const song = await songModel.findById(id);
        if (!song) {
            return res.status(404).json({ success: false, message: 'Song not found' });
        }

        // Toggle like status
        song.like = song.like === "liked" ? "disliked" : "liked";
        await song.save();

        res.status(200).json({
            success: true,
            song,
            message: `Song ${song.like === 'liked' ? 'liked' : 'disliked'} successfully`
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get liked songs
async function getLikedSongs(req, res){
    try {
        const songs = await songModel.find({ like: "liked" });
        res.status(200).json({ success: true, songs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



async function getSong(req, res) {
    console.log(req.query)

    const { mood } = req.query

    try {
        let songs;
        
        // If mood is "neutral" or not provided, fetch all songs
        if (!mood || mood === "neutral" || mood === "all") {
            songs = await songModel.find({}).sort({ _id: -1 }).limit(50)
        } else {
            // Otherwise fetch songs by specific mood
            songs = await songModel.find({ mood }).sort({ _id: -1 }).limit(10)
        }

        res.status(200).json({
            message: "song fetched successfully.",
            songs
        })
    } catch (err) {
        res.status(500).json({ message: "Error fetching songs" })
    }
}

// Delete song
async function deleteSong(req, res) {
    try {
        const { id } = req.params;

        const song = await songModel.findByIdAndDelete(id);
        if (!song) {
            return res.status(404).json({ success: false, message: 'Song not found' });  
        }

        res.status(200).json({
            success: true,
            message: 'Song deleted successfully',
            deletedSong: song
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    uploadSong, getSong, toggleLike, getLikedSongs, deleteSong
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