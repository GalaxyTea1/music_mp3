const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
    name: {
        type: String,
    },
    song: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'songs',
        },
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('playlists', PlaylistSchema);
