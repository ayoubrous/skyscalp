const mongoose = require('mongoose')

const PropertySchema = new mongoose.Schema({
    userID: {
        type: String,
        ref: 'users',
        required: true,
    },
    featured: {
        type: Boolean,
    },
    title: {
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
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String
    },
    mapLocation: {
        type: [String],
    },
    area: {
        type: Number,
    },
    build: {
        type: String,
    },
    application: {
        type: String,
    },
    category: {
        type: String,
    },
    type: {
        type: String,
    },
    rooms: {
        type: Number,
    },
    bathrooms: {
        type: Number,
    },
    kitchen: {
        type: Number,
    },
    garage: {
        type: Number,
    },
    pool: {
        type: Number,
    },
    garden: {
        type: Number,
    },
    condition: {
        type: String,
    },
    proximity: {
        type: String,
    },
    features: {
        type: [String]
    },
    description: {
        type: String,
    },
    images: {
        type: [String]
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
    }
}, { timestamps: true })


const PropertyModal = mongoose.model('properties', PropertySchema);

module.exports = PropertyModal;
