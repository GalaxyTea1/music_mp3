const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        default: 'Other',
    },
    roles: {
        type: String,
    },
    playlist: {
        type: mongoose.Types.ObjectId,
        ref: 'playlists',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('users', UserSchema);
