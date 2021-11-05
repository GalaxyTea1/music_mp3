const express = require('express');
const router = express.Router();

const Radio = require('../models/Radio');

// @route GET api/posts
// @desc Get posts
// @access Private
router.get('/', async (req, res) => {
    try {
        const radios = await Radio.find({ user: req.userId }).populate('user', ['username']);
        res.json({ success: true, radios });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', async (req, res) => {
    const { img, icon, title, listen } = req.body;

    // Simple validation
    if (!img) return res.status(400).json({ success: false, message: 'Image is required' });

    try {
        const newRadio = new Radio({
            img,
            icon,
            title,
            listen,
            user: req.userId,
        });

        await newRadio.save();

        res.json({ success: true, message: 'Happy!', radio: newRadio });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// @route PUT api/posts
// @desc Update post
// @access Private
router.put('/:id', async (req, res) => {
    const { img, title, author, listen } = req.body;

    // Simple validation
    if (!img) return res.status(400).json({ success: false, message: 'Image is required' });

    try {
        let updatedDiscovery = {
            img,
            icon,
            title,
            listen,
        };

        const radioUpdateCondition = { _id: req.params.id };

        updatedRadio = await Radio.findOneAndUpdate(radioUpdateCondition, updatedRadio, {
            new: true,
        });

        // User not authorised to update post or post not found
        if (!updatedRadio)
            return res.status(401).json({
                success: false,
                message: 'Radio not found or user not authorised',
            });

        res.json({
            success: true,
            message: 'Excellent progress!',
            radio: updatedRadio,
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
        const radioDeleteCondition = { _id: req.params.id };
        const deletedRadio = await Radio.findOneAndDelete(radioDeleteCondition);

        // User not authorised or post not found
        if (!deletedRadio)
            return res.status(401).json({
                success: false,
                message: 'Radio not found or user not authorised',
            });

        res.json({ success: true, radio: deletedRadio });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
