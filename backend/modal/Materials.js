const mongoose = require('mongoose')

const MaterialsSchema = new mongoose.Schema({
    userID: {
        type: String,
        ref: 'users',
        required: true
    },
    featured: {
        type: Boolean,
    },
    materialGroup: { // machinery, construction , and furniture
        type: String,
        required: true
    },
    title: {
        type: String
    },
    budget: {
        type: Number
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
    model: {
        type: String,
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
    machineryType: {
        type: String,
    },
    guarantee: {
        type: Boolean,
    },
    guaranteePeriod: {
        type: String,
    },
    size: {
        type: String,
    },
    brand: {
        type: String,
    },
    condition: {
        type: String,
    },
    color: {
        type: String,
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
    },
    // for construction 
    quantity: {
        type: String,
    },
    dimensions: {
        type: String,
    },
    base: {
        type: String,
    },
    thickness: {
        type: String,
    },
    finish: {
        type: String,
    },
    voltage: {
        type: String,
    },
    material: {
        type: String,
    },
    otherBase: { type: String },
    otherColor: { type: String },
    otherFinish: { type: String },
    otherMaterial: { type: String },
    otherSize: { type: String },
    otherThickness: { type: String },
    otherType: { type: String },
    otherVoltage: { type: String },
    otherMachine: { type: String },
    otherApplication: { type: String },
    otherType: { type: String },


    // for furniture
    style: {
        type: String,
    },
    feature: {
        type: String,
    },
    article: {
        type: String,
    },
    otherFeature: {type: String},
    otherBrand: {type: String},


}, { timestamps: true })


const MaterialsModal = mongoose.model('materials', MaterialsSchema);

module.exports = MaterialsModal;
