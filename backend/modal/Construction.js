const mongoose = require('mongoose')

const ConstructionSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    title: {
        type: String
    },
    budget: {
        type: String
    },
    unit: { // per item, per kg 
        type: String
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
    streetAddress: {
        type: String
    },
    location: {
        type: String,
    },
    application: {
        type: String,
    },
    category: {
        type: String,
    },
    quality: {
        type: String,
    },
    quantity: {
        type: String,
    },
    color: {
        type: String,
    },
    dimensions: {
        type: String,
    },
    weight: {
        type: String,
    },
    size: {
        type: String,
    },
    guarantee: {
        type: String,
    },
    brand: {
        type: String,
    },
    condition: {
        type: String,
    },
    available: {
        type: Boolean,
    },
    description: {
        type: String,
    },
    images: {
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


const ConstructionModal = mongoose.model('construction', ConstructionSchema);

module.exports = ConstructionModal;
