const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const Playlist = require('../models/Playlist');

router.post('/', verifyToken, async (req, res) => {
    const { name } = req.body;

    try {
        const newPlaylist = new Playlist({
            name,
            song: req.list_song._id,
            user: req.user._id,
        });
        await newPlaylist.save();
        res.json({ success: true, message: 'Happy!', playlist: newPlaylist });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
