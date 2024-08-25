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
    description: {
        type: String
    },
    language: {
        type: String
    },
    experience: {
        type: String
    },
    availablity: {
        type: String
    },
    education: {
        type: String
    },
    consultationFee: {
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
    street: {
        type: String
    },
    mapLocation: {
        type: [String],
    },
    
    category: {
        type: String,
    },
    expert: {
        type: String,
    },
    filter: {
        type: String,
    },
    filterChoices: {
        type: [String],
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
    },
}, { timestamps: true })


const model = mongoose.model('services', schema);

module.exports = model;
