const express = require('express');
const router = express.Router();

const Rank = require('../models/Rank');

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
    const { img, title, author } = req.body;

    // Simple validation
    if (!img) return res.status(400).json({ success: false, message: 'Image is required' });

    try {
        const newRank = new Rank({
            img,
            title,
            author,
            user: req.userId,
        });

        await newRank.save();

        res.json({ success: true, message: 'Happy!', rank: newRank });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// @route PUT api/posts
// @desc Update post
// @access Private
router.put('/:id', async (req, res) => {
    const { img, title, author } = req.body;

    // Simple validation
    if (!img) return res.status(400).json({ success: false, message: 'Image is required' });

    try {
        let updatedRank = {
            img,
            title,
            author,
        };

        const rankUpdateCondition = { _id: req.params.id };

        updatedRank = await Rank.findOneAndUpdate(rankUpdateCondition, updatedRank, { new: true });

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
