const mongoose = require('mongoose')

const MachinerySchema = new mongoose.Schema({
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
    modal: {
        type: String,
    },
    yearBuild: {
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
    weight: {
        type: String,
    },
    power: {
        type: String,
    },
    available: {
        type: Boolean,
    },
    guarantee: {
        type: String,
    },
    size: {
        type: String,
    },
    machineType: {
        type: String,
    },
    brand: {
        type: String,
    },
    certication: {
        type: String,
    },
    condition: {
        type: String,
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


const MachineryModal = mongoose.model('machinery', MachinerySchema);

module.exports = MachineryModal;
