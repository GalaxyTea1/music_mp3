const express = require('express');
const router = express.Router();
const Rank = require('../models/Rank');
const cloudinary = require('../utils/cloudinary');

// @route GET api/posts
// @desc Get posts
// @access Private
router.get('/', async (req, res) => {
    try {
        const ranks = await Rank.find({ user: req.userId }).populate('user', ['username']);
        res.json({ success: true, ranks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', async (req, res) => {
    const { image, title, author } = req.body;
    const file = req.files.image;
    await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        try {
            const newRank = new Rank({
                image: result.url,
                title,
                author,
                user: req.userId,
            });
            newRank.save();
            res.json({ success: true, message: 'Happy!', rank: newRank });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    });
});

// @route PUT api/posts
// @desc Update post
// @access Private
router.put('/:id', async (req, res) => {
    const { title, author } = req.body;
    const file = req.files.image;

    const rankUpdateCondition = { _id: req.params.id };

    await cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        try {
            let updatedRank = {
                image: result.url,
                title,
                author,
            };

            updatedRank = await Rank.findOneAndUpdate(rankUpdateCondition, updatedRank, {
                new: true,
            });

            // User not authorised to update post or post not found
            if (!updatedRank)
                return res.status(401).json({
                    success: false,
                    message: 'Rank not found or user not authorised',
                });

            res.json({
                success: true,
                message: 'Excellent progress!',
                rank: updatedRank,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    });
});

// @route DELETE api/posts
// @desc Delete post
// @access Private
// , user: req.userId
router.delete('/:id', async (req, res) => {
    try {
        const rankDeleteCondition = { _id: req.params.id };
        const deletedRank = await Rank.findOneAndDelete(rankDeleteCondition);

        // User not authorised or post not found
        if (!deletedRank)
            return res.status(401).json({
                success: false,
                message: 'Rank not found or user not authorised',
            });

        res.json({ success: true, rank: deletedRank });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
