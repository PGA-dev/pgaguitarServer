const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guitarSchema = new Schema({
    name: {
        type: String,
        required: true

    },
    image: {
        type: String,
        required: true
    },
    pageUrl: {
        type: String,
        required: true
    },
    pageUrlTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

const Guitar = mongoose.model('Guitar', guitarSchema);

module.exports = Guitar;