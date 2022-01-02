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
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('discoverys', DiscoverySchema);
