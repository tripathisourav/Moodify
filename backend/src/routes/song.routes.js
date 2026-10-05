const express = require('express')
const upload = require('../middlewares/upload.middleware')
const authMiddleware = require('../middlewares/auth.middleware')
const songController = require('../controllers/song.controller')

const router = express.Router()


router.post('/', authMiddleware.authUser, upload.single('song'), songController.uploadSong)
router.get('/', songController.getSong)
router.get('/liked', songController.getLikedSongs);
router.patch('/:id/like', authMiddleware.authUser, songController.toggleLike);
router.delete('/:id', authMiddleware.authUser, songController.deleteSong);

module.exports = router