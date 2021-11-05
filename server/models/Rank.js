const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RankSchema = new Schema({
    img: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    user: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('ranks', RankSchema);
