const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    name: {
        type: String,
    },
    artists_names: {
        type: String,
    },
    thumbnail: {
        type: String,
        default:
            'https://w7.pngwing.com/pngs/741/277/png-transparent-scalable-graphics-compact-disc-icon-cd-logo-cartoon-cd-player-thumbnail.png',
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
    lyric: {
        type: String,
    },
    duration: {
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
