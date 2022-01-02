const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('categories', CategorySchema);
