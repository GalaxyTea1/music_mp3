const mongoose = require('mongoose');
const discoverys = require('../models/Discovery');

export function createDiscovery(req, res) {
    const discovery = new Discovery({
        _id: mongoose.Types.ObjectId(),
        img: req.body.img,
        title: req.body.title,
        author: req.body.author,
    });

    return discovery
        .save()
        .then((newDiscovery) => {
            return res.status(201).json({
                success: true,
                message: 'New discovery created successfully',
                Discovery: newDiscovery,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
}
