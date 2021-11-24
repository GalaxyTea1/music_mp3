const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const Playlist = require('../models/Playlist');

router.post('/', verifyToken, async (req, res) => {
    try {
        const newPlaylist = new Playlist({
            song: req.song,
            name: tag.tags.title,
            user: req.user._id,
        });
        newPlaylist.save();
        res.json({ success: true, message: 'Happy!', playlist: newPlaylist });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
