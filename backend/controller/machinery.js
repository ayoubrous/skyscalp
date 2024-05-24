const MachineryModal = require('../modal/Machinery')
const sendResponse = require("../utils/sendResponse")


const addMachinery = async (req, res) => {
    try {
        if (!req.body) {
            sendResponse(req, res, false, "Data not found", null)
        }

        let property = new MachineryModal(req.body)
        let result = await property.save()
        if (result) {
            sendResponse(req, res, true, "Machinery published successfully", result)
        }
        else {
            sendResponse(req, res, false, "Error creating Machinery, try again", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const updateMachinery = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            sendResponse(req, res, false, "ID not found", null)
        }
        if (!req.body) {
            sendResponse(req, res, false, "Data not found", null)
        }

        let response = await MachineryModal.findOneAndUpdate({ _id: id }, req.body)
        if (response) {
            sendResponse(req, res, true, "Machinery updated successfully", null)
        }
        else {
            sendResponse(req, res, false, "Error updating Machinery, try again", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const getMachinery = async (req, res) => {
    //logic for pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skipIndex = (page - 1) * limit;
    try {
        const totalMachinery = await MachineryModal.countDocuments();
        const totalPages = Math.ceil(totalMachinery / limit);

        let response = await MachineryModal.find().skip(skipIndex).limit(limit)
        if (response) {
            let data = {
                documents: response,
                currentPage: page,
                totalPages: totalPages,
                totalProperties: totalMachinery,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
            sendResponse(req, res, true, "Machineries found successfully", data)
        }
        else {
            sendResponse(req, res, false, "No Machineries found", null)
        }
    }
    catch (err) {
        console.log(err)
        sendResponse(req, res, false, "Error proceeding your request, try again", null)

    }

}

const getSingleMachinery = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            sendResponse(req, res, false, "ID not found", null)
        }
        let result = await MachineryModal.findOne({ _id: id })
        if (result) {
            sendResponse(req, res, true, "Machinery found successfully", result)
        }
        else {
            sendResponse(req, res, false, "No Machinery found", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const deleteMachinery = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            sendResponse(req, res, false, "ID not found", null)
        }
        let result = await MachineryModal.findOneAndDelete({ _id: id })
        if (result) {
            sendResponse(req, res, true, "Machinery deleted successfully", result)
        }
        else {
            sendResponse(req, res, false, "Error deleting Machinery ", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}
module.exports = {
    addMachinery,
    updateMachinery,
    getMachinery,
    getSingleMachinery,
    deleteMachinery
}