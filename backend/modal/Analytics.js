const mongoose = require('mongoose')

const analyticsSchema = new mongoose.Schema({
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    countryCode: {
        type: String,
    },
    date: {
        type: String,
    },
    ip: {
        type: String,
    },
    userID: {
        type: String,
        ref: 'users'
    },
    useragent: {
        type: String,
    },
    timestamp: {
        type: String,
        value: Date.now()
    }

}, { timestamps: true })

const AnalyticsModal = mongoose.model('analytics', analyticsSchema);

module.exports = AnalyticsModal;