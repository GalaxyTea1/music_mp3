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
    length: {
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

module.exports = mongoose.model('songs', SongSchema);
