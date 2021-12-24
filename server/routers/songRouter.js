const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const Song = require('../models/Song');
const cloudinary = require('../utils/cloudinary');
var jsmediatags = require('jsmediatags');

router.get('/', async (req, res) => {
    try {
        const songs = await Song.find({});
        res.json({ success: true, songs });
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
                        const newSong = new Song({
                            audio: result.url,
                            duration: result.duration,
                            artists_names: tag.tags.artist,
                            name: tag.tags.title,
                            user: req.user._id,
                        });
                        newSong.save();
                        res.json({ success: true, msg: 'Happy!', song: newSong });
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

router.put('/:id', async (req, res) => {
    const file = req.files.audio;
    const songUpdateCondition = { _id: req.params.id, user: req.user._id };
    await cloudinary.uploader.upload(
        file.tempFilePath,
        { resource_type: 'video' },
        function (error, result) {
            new jsmediatags.Reader(result.url).setTagsToRead(['title', 'artist']).read({
                onSuccess: async function (tag) {
                    try {
                        let updatedSong = {
                            audio: result.url,
                            length: result.duration,
                            author: tag.tags.artist,
                            name: tag.tags.title,
                            user: req.user._id,
                        };

                        updatedSong = await Song.findOneAndUpdate(
                            songUpdateCondition,
                            updatedSong,
                            {
                                new: true,
                            }
                        );

                        // User not authorised to update post or post not found
                        if (!updatedSong)
                            return res.status(401).json({
                                success: false,
                                msg: 'Song not found or user not authorised',
                            });

                        res.json({
                            success: true,
                            msg: 'Excellent progress!',
                            song: updatedSong,
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

router.patch('/update/:id', async (req, res) => {
    try {
        const { name, artists_names, audio, author, album, lyric, duration } = req.body;
        const song = await Song.findOneAndUpdate(
            { _id: req.params.id },
            {
                name,
                artists_names,
                audio,
                author,
                album,
                lyric,
                duration,
            }
        );
        res.json({
            success: true,
            msg: 'Cập nhật thành công!',
            newSong: {
                ...song._doc,
                name,
                artists_names,
                audio,
                author,
                album,
                lyric,
                duration,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const songDeleteCondition = { _id: req.params.id };
        const deletedSong = await Song.findOneAndDelete(songDeleteCondition);

        // User not authorised or post not found
        if (!deletedSong)
            return res.status(401).json({
                success: false,
                message: 'Song not found or user not authorised',
            });

        res.json({ success: true, song: deletedSong });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
