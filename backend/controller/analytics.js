
const AnalyticsModal = require('../modal/Analytics')
const sendResponse = require("../utils/sendResponse");



const addAnalytics = async (req, res) => {
    try {
        if (!req.body) {
            sendResponse(req, res, false, "Data not found", null)
        }

        let analytics = new AnalyticsModal(req.body)
        let response = await analytics.save()

        if (response) {
            sendResponse(req, res, true, "Analytics Added successfully", response)
        }
        else {
            sendResponse(req, res, false, "Error adding Analytics, try again", null)
        }
    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
        console.log(err);
    }
}


const getAnalytics = async (req, res) => {
    try {

        let response = await AnalyticsModal.find()

        if (response) {
            sendResponse(req, res, true, "Analytics Found successfully", response)
        }
        else {
            sendResponse(req, res, false, "Error Founding Analytics, try again", null)
        }
    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
        console.log(err);
    }
}
module.exports = {
    addAnalytics,
    getAnalytics
}

