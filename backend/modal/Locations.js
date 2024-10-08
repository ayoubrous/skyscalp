const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    name: {
        type: "String"
    },
    label: {
        type: String
    },
    group: {
        type: String
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    }
})

const LocationModal = mongoose.model('locations', locationSchema);

module.exports = LocationModal;