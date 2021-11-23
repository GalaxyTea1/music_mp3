const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    audio: {
        type: String,
    },
    author: {
        type: String,
    },
    album: {
        type: String,
    },
    type: {
        type: String,
    },
    user: {
        type: String,
    },
    length: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('songs', SongSchema);
