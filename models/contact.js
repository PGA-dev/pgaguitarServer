const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    firstname: {
        type: String,
        required: true

    },
    lastname: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;