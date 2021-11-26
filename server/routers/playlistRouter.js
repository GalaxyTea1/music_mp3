const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const Playlist = require('../models/Playlist');
const cloudinary = require('../utils/cloudinary');
var jsmediatags = require('jsmediatags');

router.post('/', verifyToken, async (req, res) => {
    const file = req.files.audio;
    const { name } = req.body;
    await cloudinary.uploader.upload(
        file.tempFilePath,
        { resource_type: 'video' },
        function (error, result) {
            new jsmediatags.Reader(result.url).setTagsToRead(['title', 'artist']).read({
                onSuccess: function (tag) {
                    try {
                        const newPlaylist = new Playlist({
                            audio: result.url,
                            name,
                            artists_names: tag.tags.artist,
                            title: tag.tags.title,
                            user: req.user._id,
                        });
                        newPlaylist.save();
                        res.json({ success: true, message: 'Happy!', playlist: newPlaylist });
                    } catch (error) {
                        console.log(error);
                        res.status(500).json({ success: false, message: 'Internal server error' });
                    }
                },
                onError: function (error) {
                    console.log(':(', error.type, error.info);
                },
            });
        }
    );
});

module.exports = router;
