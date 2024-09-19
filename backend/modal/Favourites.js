const mongoose = require('mongoose')

const favouritesSchema = new mongoose.Schema({
    userID: {
        type: String,
        ref: 'users',
        required: true
    },
    productID: {
        type: String,
        required: true
    },
    collectionReference: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        value: Date.now()
    }

}, { timestamps: true })

const FavouritesModal = mongoose.model('favourites', favouritesSchema);

module.exports = FavouritesModal;