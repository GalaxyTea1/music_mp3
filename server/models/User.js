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
    avatar: {
        type: String,
    },
    gender: {
        type: String,
        default: 'Male',
    },
    roles: {
        type: String,
        default: '0',
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
