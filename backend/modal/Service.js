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
        type: String
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


// {
//     "images": [],
//     "country": "Morocco",
//     "state": "Oriental",
//     "city": "Oujda",
//     "street": "Boulevard Mohammed V",
//     "budget": "120",
//     "description": "<p>desc</p>",
//     "mapLocation": [
//       26.404991028312054,
//       -5.903472400143246
//     ],
//     "field": "Legal",
//     "experty": "Lawyer",
//     "filter1": {
//       "filterName": "Civil Law",
//       "selectedOption": "Other"
//     },
//     "filter2": {
//       "filterName": "Criminal Law",
//       "selectedOption": "Other"
//     },
//     "filter3": {
//       "filterName": "Commercial Law",
//       "selectedOption": "Other"
//     },
//     "otherFilter1Value": "other civil",
//     "otherFilter2Value": "other Law",
//     "otherFilter3Value": "otherCommercial",
//     "experience": "2",
//     "language": "Other",
//     "education": "Other",
//     "availibilty": "Other",
//     "otherLanguage": "hindko",
//     "otherEducation": "BS",
//     "otherAvailibility": "no",
//     "status": true
//   }