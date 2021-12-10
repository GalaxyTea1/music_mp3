const express = require('express');
const router = require('express').Router();
const verifyToken = require('../middleware/auth');
const cloudinary = require('../utils/cloudinary');
var jsmediatags = require('jsmediatags');
const HandleSong = require('../models/handleSong');

router.get('/', async (req, res) => {
    try {
        const handlesong = await HandleSong.find({});
        res.json({ success: true, handlesong });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/', verifyToken, async (req, res) => {
    const file = req.files.audio;
    await cloudinary.uploader.upload(
        file.tempFilePath,
        { resource_type: 'video' },
        function (error, result) {
            new jsmediatags.Reader(result.url).setTagsToRead(['title', 'artist']).read({
                onSuccess: function (tag) {
                    try {
                        const newHandleSong = new HandleSong({
                            audio: result.url,
                            duration: result.duration,
                            artists_names: tag.tags.artist,
                            name: tag.tags.title,
                            user: req.user._id,
                        });
                        newHandleSong.save();
                        res.json({
                            success: true,
                            msg: 'Đang chờ xét duyệt!',
                            handlesong: newHandleSong,
                        });
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

router.delete('/:id', async (req, res) => {
    try {
        const songDeleteCondition = { _id: req.params.id };
        const deletedSong = await HandleSong.findOneAndDelete(songDeleteCondition);

        // User not authorised or post not found
        if (!deletedSong)
            return res.status(401).json({
                success: false,
                message: 'Song not found or user not authorised',
            });

        res.json({ success: true, message: 'Đã xóa', handlesong: deletedSong });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
