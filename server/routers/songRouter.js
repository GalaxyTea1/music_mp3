const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const cloudinary = require('../utils/cloudinary');
var jsmediatags = require('jsmediatags');

router.get('/', async (req, res) => {
    try {
        const songs = await Song.find({ user: req.userId }).populate('user', ['username']);
        res.json({ success: true, songs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    const file = req.files.audio;
    await cloudinary.uploader.upload(
        file.tempFilePath,
        { resource_type: 'video' },
        function (error, result) {
            new jsmediatags.Reader(result.url).setTagsToRead(['title', 'artist']).read({
                onSuccess: function (tag) {
                    console.log(tag);
                    try {
                        const newSong = new Song({
                            audio: result.url,
                            length: result.duration,
                            author: tag.tags.artist,
                            name: tag.tags.title,
                            user: req.userId,
                        });
                        newSong.save();
                        res.json({ success: true, message: 'Happy!', song: newSong });
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
    const songUpdateCondition = { _id: req.params.id };
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
                            user: req.userId,
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
                                message: 'Song not found or user not authorised',
                            });

                        res.json({
                            success: true,
                            message: 'Excellent progress!',
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
