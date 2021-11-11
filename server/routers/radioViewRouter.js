const express = require('express');
const router = express.Router();

const radioView = require('../models//radioView');

// @route GET api/posts
// @desc Get posts
// @access Private
router.get('/', async (req, res) => {
    try {
        const radioviews = await radioView
            .find({ user: req.userId })
            .populate('user', ['username']);
        res.json({ success: true, radioviews });
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
        const newRadioView = new radioView({
            img,
            title,
            author,
            user: req.userId,
        });

        await newRadioView.save();

        res.json({ success: true, message: 'Happy!', radioview: newRadioView });
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
        let updatedRadioView = {
            img,
            title,
            author,
        };

        const radioViewUpdateCondition = { _id: req.params.id };

        updatedRadioView = await radioView.findOneAndUpdate(
            radioViewUpdateCondition,
            updatedRadioView,
            { new: true }
        );

        // User not authorised to update post or post not found
        if (!updatedRadioView)
            return res.status(401).json({
                success: false,
                message: 'Radio view not found or user not authorised',
            });

        res.json({
            success: true,
            message: 'Excellent progress!',
            radioview: updatedRadioView,
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
        const radioViewDeleteCondition = { _id: req.params.id };
        const deletedRadioView = await radioView.findOneAndDelete(radioViewDeleteCondition);

        // User not authorised or post not found
        if (!deletedRadioView)
            return res.status(401).json({
                success: false,
                message: 'Radio view not found or user not authorised',
            });

        res.json({ success: true, radioview: deletedRadioView });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
