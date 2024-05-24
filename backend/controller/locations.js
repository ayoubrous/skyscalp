const LocationModal = require('../modal/Locations')
const sendResponse = require("../utils/sendResponse")


const addCountry = async (req, res) => {
    try {
        if (!req.body) {
            sendResponse(req, res, false, "Data not found", null)
        }

        let countryData = new LocationModal({
            name: req.body.country, // country name
            label: "Country",
            group: "World",
            country: req.body.country,
            state: null,
            city: null,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        })
        let result = await countryData.save()
        if (result) {
            sendResponse(req, res, true, "Country Added successfully", result)
        }
        else {
            sendResponse(req, res, false, "Error adding Country, try again", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const addState = async (req, res) => {
    try {
        if (!req.body) {
            sendResponse(req, res, false, "Data not found", null)
        }

        let stateData = new LocationModal({
            name: req.body.state,
            label: "State",
            group: req.body.country,
            country: req.body.country,
            state: req.body.state,
            city: null,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        })
        let result = await stateData.save()
        if (result) {
            sendResponse(req, res, true, "State Added successfully", result)
        }
        else {
            sendResponse(req, res, false, "Error adding State, try again", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}
const addCity = async (req, res) => {
    try {
        if (!req.body) {
            sendResponse(req, res, false, "Data not found", null)
        }

        let cityData = new LocationModal({
            name: req.body.city,
            label: "City",
            group: req.body.country,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        })
        let result = await cityData.save()
        if (result) {
            sendResponse(req, res, true, "City Added successfully", result)
        }
        else {
            sendResponse(req, res, false, "Error adding City, try again", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const addStreet = async (req, res) => {
    try {
        if (!req.body) {
            sendResponse(req, res, false, "Data not found", null)
        }

        let streetData = new LocationModal({
            name: req.body.street,
            label: "Street",
            group: req.body.city,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            street: req.body.street,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        })
        let result = await streetData.save()
        if (result) {
            sendResponse(req, res, true, "Street Added successfully", result)
        }
        else {
            sendResponse(req, res, false, "Error adding Street, try again", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}


const getCountries = async (req, res) => {
    try {
        let response = await LocationModal.find({ label: "Country" })
        if (response) {
            sendResponse(req, res, true, "Countries found successfully", response)
        }
        else {
            sendResponse(req, res, false, "No Countries found", null)
        }
    }
    catch (err) {
        console.log(err)
        sendResponse(req, res, false, "Error proceeding your request, try again", null)

    }

}

const getStatesByCountry = async (req, res) => {
    try {
        let country = req.query.country
        let response = await LocationModal.find({ label: "State", country: country })
        if (response) {
            sendResponse(req, res, true, "States By Country found successfully", response)
        }
        else {
            sendResponse(req, res, false, "No States By Country found", null)
        }
    }
    catch (err) {
        console.log(err)
        sendResponse(req, res, false, "Error proceeding your request, try again", null)

    }
}

const getCitiesByState = async (req, res) => {
    try {
        let state = req.query.state
        let response = await LocationModal.find({ label: "City", state: state })
        if (response) {
            sendResponse(req, res, true, "Cities by state found successfully", response)
        }
        else {
            sendResponse(req, res, false, "No Cities by state found", null)
        }
    }
    catch (err) {
        console.log(err)
        sendResponse(req, res, false, "Error proceeding your request, try again", null)

    }
}

const getStreetsByCity = async (req, res) => {
    try {
        let city = req.query.city
        let response = await LocationModal.find({ label: "Street", city: city })
        if (response) {
            sendResponse(req, res, true, "Streets by city found successfully", response)
        }
        else {
            sendResponse(req, res, false, "No Streets by city found", null)
        }
    }
    catch (err) {
        console.log(err)
        sendResponse(req, res, false, "Error proceeding your request, try again", null)

    }
}


const getAllLocations = async (req, res) => {
    try {
        let response = await LocationModal.find();

        if (response.length > 0) {
            sendResponse(req, res, true, "Locations found successfully", response);
        } else {
            sendResponse(req, res, false, "No Locations found", null);
        }
    } catch (err) {
        console.log(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};


const getLocationsByTyping = async (req, res) => {
    try {
        let location = req.query.location;

        // Check if location is provided and not an empty string
        if (!location || location.trim().length === 0) {
            return sendResponse(req, res, false, "No search term provided", null);
        }

        let regex = new RegExp("^" + location, "i"); // "i" flag for case-insensitive matching
        let response = await LocationModal.find({ name: regex }).limit(10);

        if (response.length > 0) {
            sendResponse(req, res, true, "Locations found successfully", response);
        } else {
            sendResponse(req, res, false, "No locations found", null);
        }
    } catch (err) {
        console.log(err);
        sendResponse(req, res, false, "Error processing your request, try again", null);
    }
};


module.exports = {
    addCountry,
    addState,
    addCity,
    addStreet,
    getCountries,
    getStatesByCountry,
    getCitiesByState,
    getStreetsByCity,
    getLocationsByTyping,
    getAllLocations
}