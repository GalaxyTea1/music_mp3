const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RadioSchema = new Schema({
    img: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
    title: {
        type: String,
    },
    listen: {
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

module.exports = mongoose.model('radios', RadioSchema);
