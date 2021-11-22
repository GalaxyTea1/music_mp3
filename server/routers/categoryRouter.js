const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');

const Category = require('../models/Category');

// @route GET api/posts
// @desc Get posts
// @access Private
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({ user: req.userId }).populate('user', ['username']);
        res.json({ success: true, categories });
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
        console.log(result);
        try {
            const newCategory = new Category({
                image: result.url,
                title,
                author,
                user: req.userId,
            });
            newCategory.save();
            res.json({ success: true, message: 'Happy!', category: newCategory });
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
    const { image, title, author } = req.body;

    try {
        let updatedCategory = {
            image,
            title,
            author,
        };

        const categoryUpdateCondition = { _id: req.params.id };

        updatedCategory = await Category.findOneAndUpdate(
            categoryUpdateCondition,
            updatedCategory,
            { new: true }
        );

        // User not authorised to update post or post not found
        if (!updatedCategory)
            return res.status(401).json({
                success: false,
                message: 'Category not found or user not authorised',
            });

        res.json({
            success: true,
            message: 'Excellent progress!',
            category: updatedCategory,
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
        const categoryDeleteCondition = { _id: req.params.id };
        const deletedCategory = await Category.findOneAndDelete(categoryDeleteCondition);

        // User not authorised or post not found
        if (!deletedCategory)
            return res.status(401).json({
                success: false,
                message: 'Category not found or user not authorised',
            });

        res.json({ success: true, category: deletedCategory });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
