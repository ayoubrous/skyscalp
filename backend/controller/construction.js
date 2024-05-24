const ConstructionModal = require('../modal/Construction')
const sendResponse = require("../utils/sendResponse")


const addConstruction = async (req, res) => {
    try {
        if (!req.body) {
            sendResponse(req, res, false, "Data not found", null)
        }

        let construction = new ConstructionModal(req.body)
        let result = await construction.save()
        if (result) {
            sendResponse(req, res, true, "Construction Item published successfully", result)
        }
        else {
            sendResponse(req, res, false, "Error creating Construction Item, try again", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const updateConstruction = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            sendResponse(req, res, false, "ID not found", null)
        }
        if (!req.body) {
            sendResponse(req, res, false, "Data not found", null)
        }

        let response = await ConstructionModal.findOneAndUpdate({ _id: id }, req.body)
        if (response) {
            sendResponse(req, res, true, "Construction Item updated successfully", null)
        }
        else {
            sendResponse(req, res, false, "Error updating Construction Item, try again", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const getConstruction = async (req, res) => {
    //logic for pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skipIndex = (page - 1) * limit;
    try {
        const totalItems = await ConstructionModal.countDocuments();
        const totalPages = Math.ceil(totalItems / limit);

        let response = await ConstructionModal.find().skip(skipIndex).limit(limit)
        if (response) {
            let data = {
                documents: response,
                currentPage: page,
                totalPages: totalPages,
                totalProperties: totalItems,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
            sendResponse(req, res, true, "Construction Items found successfully", data)
        }
        else {
            sendResponse(req, res, false, "No Construction Items found", null)
        }
    }
    catch (err) {
        console.log(err)
        sendResponse(req, res, false, "Error proceeding your request, try again", null)

    }

}

const getSingleConstruction = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            sendResponse(req, res, false, "ID not found", null)
        }
        let result = await ConstructionModal.findOne({ _id: id })
        if (result) {
            sendResponse(req, res, true, "Construction Item found successfully", result)
        }
        else {
            sendResponse(req, res, false, "No Construction Item found", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const deleteConstruction = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            sendResponse(req, res, false, "ID not found", null)
        }
        let result = await ConstructionModal.findOneAndDelete({ _id: id })
        if (result) {
            sendResponse(req, res, true, "Construction Item deleted successfully", result)
        }
        else {
            sendResponse(req, res, false, "Error deleting Construction Item ", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}
module.exports = {
    addConstruction,
    updateConstruction,
    getConstruction,
    getSingleConstruction,
    deleteConstruction
}