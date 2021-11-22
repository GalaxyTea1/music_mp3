const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');

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
    const { title, author } = req.body;
    const file = req.files.image;
    await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        try {
            const newRadioView = new radioView({
                image: result.url,
                title,
                author,
                user: req.userId,
            });
            newRadioView.save();
            res.json({ success: true, message: 'Happy!', radioview: newRadioView });
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

    const radioViewUpdateCondition = { _id: req.params.id };

    await cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        try {
            let updatedRadioView = {
                image: result.url,
                title,
                author,
            };

            updatedRadioView = await radioView.findOneAndUpdate(
                radioViewUpdateCondition,
                updatedRadioView,
                {
                    new: true,
                }
            );

            // User not authorised to update post or post not found
            if (!updatedRadioView)
                return res.status(401).json({
                    success: false,
                    message: 'Radio not found or user not authorised',
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
