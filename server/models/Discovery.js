const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiscoverySchema = new Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    user: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('discoverys', DiscoverySchema);
