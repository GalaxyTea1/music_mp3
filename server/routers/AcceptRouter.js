const express = require('express');
const router = require('express').Router();
const HandleSong = require('../models/handleSong');
const Song = require('../models/Song');

router.post('/', async (req, res) => {
    const { item } = req.body;
    try {
        const handlesong = await HandleSong.findById(item._id);
        const song = new Song({
            name: item.name,
            artists_names: item.artists_names,
            thumbnail: item.thumbnail,
            audio: item.audio,
            duration: item.duration,
            user: item.user,
        });
        song.save();
        res.json({
            success: true,
            msg: 'Ok! Đã duyệt',
            handle_accept: song,
        });
        handlesong.remove();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
module.exports = router;
