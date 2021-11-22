const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const radioViewSchema = new Schema({
    image: {
        type: String,
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

module.exports = mongoose.model('radioviews', radioViewSchema);
