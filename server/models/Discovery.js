const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('users', UserSchema);
