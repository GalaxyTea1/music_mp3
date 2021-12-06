const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const Playlist = require('../models/Playlist');

router.get('/', async (req, res) => {
    try {
        const playlist = await Playlist.find({}).populate('list_song');
        res.json({ success: true, playlist });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/', verifyToken, async (req, res) => {
    const { name, list_song_id } = req.body;
    try {
        const newPlaylist = new Playlist({
            name,
            list_song: list_song_id,
            user: req.user._id,
        });
        await newPlaylist.save();
        res.json({ success: true, message: 'Happy!', playlist: newPlaylist });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    const { name, list_song_id } = req.body;
    try {
        let newPlaylist = new Playlist({
            name,
            list_song: list_song_id,
            user: req.user._id,
        });

        const playlistUpdateCondition = { _id: req.params.id };
        updatedPlaylist = await Playlist.findOneAndUpdate(
            playlistUpdateCondition,
            updatedPlaylist,
            { new: true }
        );
        // User not authorised to update post or post not found
        if (!updatedPlaylist)
            return res.status(401).json({
                success: false,
                message: 'Playlist not found or user not authorised',
            });

        res.json({
            success: true,
            message: 'Excellent progress!',
            playlist: updatedPlaylist,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const playlistDeleteCondition = { _id: req.params.id };
        const deletedPlaylist = await Playlist.findOneAndDelete(playlistDeleteCondition);

        // User not authorised or post not found
        if (!deletedPlaylist)
            return res.status(401).json({
                success: false,
                message: 'Playlist not found or user not authorised',
            });

        res.json({ success: true, playlist: deletedPlaylist });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
