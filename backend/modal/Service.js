const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    title: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    language: {
        type: String
    },
    experience: {
        type: String
    },
    availibility: {
        type: String
    },
    education: {
        type: String
    },
    budget: {
        type: Number
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    street: {
        type: String
    },
    mapLocation: {
        type: [String],
    },

    field: {
        type: String,
    },
    experty: {
        type: String,
    },
    filter1Data: {
        filterName: {
            type: String,
        },
        selectedOption: {
            type: String,
        }
    },
    filter2Data: {
        filterName: {
            type: String,
        },
        selectedOption: {
            type: String,
        }
    },
    filter3Data: {
        filterName: {
            type: String,
        },
        selectedOption: {
            type: String,
        }
    },
    filter1: {
        type: String,
    },
    filter2: {
        type: String,
    },
    filter3: {
        type: Object,
    },
    images: {
        type: [String]
    },
    otherFilter1Value: {
        type: String,
    },
    otherFilter2Value: {
        type: String,
    },
    otherFilter3Value: {
        type: String,
    },
    otherLanguage: {
        type: String,
    },
    otherAvailibility: {
        type: String,
    },
    otherEducation: {
        type: String,
    },
    toFavourites: {
        type: [String]
    },
    status: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: String,
        value: Date.now()
    },
}, { timestamps: true })


const model = mongoose.model('services', schema);

module.exports = model;
