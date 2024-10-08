const mongoose = require('mongoose')

const articlesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    order: {
        type: Number,
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: true
    },
    timestamp: {
        type: String,
        value: Date.now()
    }

}, { timestamps: true })

const ArticlesModal = mongoose.model('articles', articlesSchema);

module.exports = ArticlesModal;