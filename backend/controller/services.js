const ServiceModal = require('../modal/Service')
const sendResponse = require("../utils/sendResponse")

const addService = async (req, res) => {
    try {
        if (!req.body) {
            sendResponse(req, res, false, "Data not found", null)
        };
        const data = { ...req.body };
        let service = new ServiceModal(data)
        let result = await service.save()
        if (result) {
            sendResponse(req, res, true, "Service published successfully", result)
        }
        else {
            sendResponse(req, res, false, "Error creating Service, try again", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}
const getSingleService = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {

            sendResponse(req, res, false, "ID not found", null)
        }
        let result = await ServiceModal.findOne({ _id: id }).populate('userID')
        if (result) {
            result = {
                ...result.toObject(),
                user: {
                    username: result.userID.username,
                    email: result.userID.email,
                    profileImage: result.userID.profileImage,
                    phone: result.userID.phone,
                },
                userID: result.userID._id
            };
            sendResponse(req, res, true, "Service found successfully", result)
        }
        else {
            sendResponse(req, res, false, "No Service found", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const updateService = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            sendResponse(req, res, false, "ID not found", null)
        }
        if (!req.body) {
            sendResponse(req, res, false, "Data not found", null)
        }
        let response = await ServiceModal.findOneAndUpdate({ _id: id }, req.body)
        if (response) {
            sendResponse(req, res, true, "Service updated successfully", null)
        }
        else {
            sendResponse(req, res, false, "Error updating Service, try again", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const getServices = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const sortby = req.query.sortby || 'createdAt';
    const sortOrder = req.query.order || 'desc';
    const skipIndex = (page - 1) * limit;

    try {
        const totalItems = await ServiceModal.countDocuments();
        const totalPages = Math.ceil(totalItems / limit);

        const mongooseSortOrder = sortOrder === 'desc' ? -1 : 1;

        let response = await ServiceModal.find()
            .skip(skipIndex)
            .limit(limit)
            .sort({ [sortby]: mongooseSortOrder }) // Sort properties data by the specified field and order
            .populate('userID');

        if (response.length > 0) {
            response = response.map(item => ({
                ...item.toObject(),
                user: {
                    username: item.userID.username,
                    email: item.userID.email,
                    profileImage: item.userID.profileImage,
                    phone: item.userID.phone
                },
                userID: item.userID._id
            }));

            const data = {
                documents: response,
                currentPage: page,
                totalPages: totalPages,
                totalProducts: totalItems,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            };

            sendResponse(req, res, true, "Services found successfully", data);
        } else {
            sendResponse(req, res, false, "No Services found", null);
        }
    } catch (err) {
        console.log(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};

const getServicesByUserID = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            sendResponse(req, res, false, "ID not found", null)
        }
        let result = await ServiceModal.find({ userID: id }).sort({ createdAt: 1 });
        
        if (result) {
            sendResponse(req, res, true, "Services found successfully", result)
        }
        else {
            sendResponse(req, res, false, "No Services found", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const deleteService = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            sendResponse(req, res, false, "Service ID not found", null)
        }
        let result = await ServiceModal.findOneAndDelete({ _id: id })
        if (result) {
            sendResponse(req, res, true, "Service deleted successfully", result)
        }
        else {
            sendResponse(req, res, false, "Error deleting Service ", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
};

module.exports = {
    addService,
    updateService,
    getSingleService,
    getServices,
    getServicesByUserID,
    deleteService
}