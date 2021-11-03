const express = require('express');
const router = express.Router();

const Discovery = require('../models/Discovery');

// @route GET api/posts
// @desc Get posts
// @access Private
router.get('/', async (req, res) => {
    try {
        const discoverys = await Discovery.find({ user: req.userId }).populate('user', [
            'username',
        ]);
        res.json({ success: true, discoverys });
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
        const newDiscovery = new Discovery({
            img,
            title,
            author,
            user: req.userId,
        });

        await newDiscovery.save();

        res.json({ success: true, message: 'Happy!', discovery: newDiscovery });
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
        let updatedDiscovery = {
            img,
            title,
            author,
        };

        const discoveryUpdateCondition = { _id: req.params.id, user: req.userId };

        updatedDiscovery = await Discovery.findOneAndUpdate(
            discoveryUpdateCondition,
            updatedDiscovery,
            { new: true }
        );

        // User not authorised to update post or post not found
        if (!updatedDiscovery)
            return res.status(401).json({
                success: false,
                message: 'Discovery not found or user not authorised',
            });

        res.json({
            success: true,
            message: 'Excellent progress!',
            discovery: updatedDiscovery,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete('/:id', async (req, res) => {
    try {
        const discoveryDeleteCondition = { _id: req.params.id, user: req.userId };
        const deletedDiscovery = await Post.findOneAndDelete(discoveryDeleteCondition);

        // User not authorised or post not found
        if (!deletedDiscovery)
            return res.status(401).json({
                success: false,
                message: 'Discovery not found or user not authorised',
            });

        res.json({ success: true, discovery: deletedDiscovery });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
