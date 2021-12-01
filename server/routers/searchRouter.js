const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

router.get('/', async (req, res) => {
    try {
        const search = await Song.find({ name: { $regex: req.query.name } })
            .limit(10)
            .select('name artists_names thumbnail audio');
        res.json({ search });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
