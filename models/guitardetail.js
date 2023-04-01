const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guitarstatSchema = new Schema({
    guitarid: {
        type: Number,
        required: true
    },
    statname: {
        type: String,
        required: true

    },
    head: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

const guitarstat2Schema = new Schema({
    guitarid: {
        type: Number,
        required: true
    },
    statname: {
        type: String,
        required: true

    },
    head: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

const guitarstat3Schema = new Schema({
    guitarid: {
        type: Number,
        required: true
    },
    statname: {
        type: String,
        required: true
    },
    videoId: {
      type: String,
      required: true  
    },
    head: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    videoId2: {
        type: String,
        required: true  
      },
      text2: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const guitarstat4Schema = new Schema({
    guitarid: {
        type: Number,
        required: true
    },
    statname: {
        type: String,
        required: true
    },
    nameMan: {
        type: String,
        required: true
    },
    nameMan2: {
        type: String,
        required: true
    },
    nameMan3: {
        type: String,
        required: true
    },
    Manufacture1URL: {
        type: String,
        required: false
    },
    Manufacture2URL: {
        type: String,
        required: false
    },
    Manufacture3URL: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const guitarstat5Schema = new Schema({
    guitarid: {
        type: Number,
        required: true
    },
    statname: {
        type: String,
        required: true
    },
    nameMan: {
        type: String,
        required: true
    },
    nameMan2: {
        type: String,
        required: true
    },
    nameMan3: {
        type: String,
        required: true
    },
    Manufacture1URL: {
        type: String,
        required: false
    },
    Manufacture2URL: {
        type: String,
        required: false
    },
    Manufacture3URL: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const guitardetailSchema = new Schema({
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
    guitarstat: [guitarstatSchema],
    guitarstat2: [guitarstat2Schema],
    guitarstat3: [guitarstat3Schema],
    guitarstat4: [guitarstat4Schema],
    guitarstat5: [guitarstat5Schema]
}, {
    timestamps: true
});


const GuitarDetail = mongoose.model('GuitarDetail', guitardetailSchema);

module.exports = GuitarDetail;