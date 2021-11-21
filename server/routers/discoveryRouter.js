const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

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
router.post('/', upload.single('discoveryImage'), async (req, res) => {
    const { title, author, image } = req.body;

    // Simple validation
    // if (!img) return res.status(400).json({ success: false, message: 'Image is required' });

    try {
        const newDiscovery = new Discovery({
            title,
            author,
            image,
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
    const { image, title, author } = req.body;

    // Simple validation
    // if (!image) return res.status(400).json({ success: false, message: 'Image is required' });

    try {
        let updatedDiscovery = {
            image,
            title,
            author,
        };

        const discoveryUpdateCondition = { _id: req.params.id };

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
// , user: req.userId
router.delete('/:id', async (req, res) => {
    try {
        const discoveryDeleteCondition = { _id: req.params.id };
        const deletedDiscovery = await Discovery.findOneAndDelete(discoveryDeleteCondition);

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
