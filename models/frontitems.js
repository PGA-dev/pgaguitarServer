const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const frontitemsSchema = new Schema({
    src: {
        type: String,
        required: true

    },
    altText: {
        type: String,
        required: true

    },
}, {
    timestamps: true
});

const FrontItems = mongoose.model('FrontItems', frontitemsSchema);

module.exports = FrontItems;