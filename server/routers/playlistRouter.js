const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const Playlist = require('../models/Playlist');

router.post('/', verifyToken, async (req, res) => {
    const { name, list_song } = req.body;

    try {
        console.log(name, list_song);
        const newPlaylist = new Playlist({
            name,
            list_song,
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
