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



const getFilteredServices = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const sortby = req.query.sortby || 'createdAt';
    const sortOrder = req.query.order || 'desc';
    const skipIndex = (page - 1) * limit;

    // Construct filter object based on provided filters
    const filters = {
        status: true
    };

    // Destructure filters from request body
    const {
        minPrice,
        maxPrice,
        selectedExperty,
        selectedField,
        selectedCountries,
        selectedStates,
        selectedCities,
        selectedStreets,
        selectedAvailibilities,
        selectedEducations,
        selectedLanguages,
        selectedExperience,
        selectedFilters1,
        selectedFilters2,
        selectedFilters3
    } = req.body;

    // Filter based on price range, skip if minPrice and maxPrice are both 0
    if (minPrice > 0 || maxPrice > 0) {
        filters.budget = {};
        if (minPrice > 0) filters.budget.$gte = parseInt(minPrice);
        if (maxPrice > 0) filters.budget.$lte = parseInt(maxPrice);
    }

    // Filter based on field
    if (selectedField) filters.field = selectedField;

    // Array-based filters, only apply if arrays have values
    // if (selectedExperty && selectedExperty.length > 0) filters.experty = { $in: selectedExperty };
    if (selectedExperty && selectedExperty.length > 0) filters.experty = selectedExperty[0];

    if (selectedAvailibilities && selectedAvailibilities.length > 0) filters.availibility = { $in: selectedAvailibilities };
    if (selectedEducations && selectedEducations.length > 0) filters.education = { $in: selectedEducations };
    if (selectedLanguages && selectedLanguages.length > 0) filters.language = { $in: selectedLanguages };

    // Location filters, only apply if arrays have values
    if (selectedCountries && selectedCountries.length > 0) filters.country = { $in: selectedCountries };
    if (selectedStates && selectedStates.length > 0) filters.state = { $in: selectedStates };
    if (selectedCities && selectedCities.length > 0) filters.city = { $in: selectedCities };
    if (selectedStreets && selectedStreets.length > 0) filters.street = { $in: selectedStreets };

    // Handle nested filters, only apply if selectedOption is not empty
    if (selectedFilters1 && selectedFilters1.selectedOption && selectedFilters1.selectedOption.length > 0) {
        filters['filter1Data.selectedOption'] = { $in: selectedFilters1.selectedOption };
    }
    if (selectedFilters2 && selectedFilters2.selectedOption && selectedFilters2.selectedOption.length > 0) {
        filters['filter2Data.selectedOption'] = { $in: selectedFilters2.selectedOption };
    }
    if (selectedFilters3 && selectedFilters3.selectedOption && selectedFilters3.selectedOption.length > 0) {
        filters['filter3Data.selectedOption'] = { $in: selectedFilters3.selectedOption };
    }

    // console.log(filters);


    try {
        const totalItems = await ServiceModal.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const mongooseSortOrder = sortOrder === 'desc' ? -1 : 1;

        let response = await ServiceModal.find(filters)
            .skip(skipIndex)
            .limit(limit)
            .sort({ [sortby]: mongooseSortOrder })
            .populate('userID');


        if (response.length > 0) {
            response = response.map(product => ({
                ...product.toObject(),
                user: {
                    username: product.userID.username,
                    email: product.userID.email,
                    profileImage: product.userID.profileImage,
                    phone: product.userID.phone
                },
                userID: product.userID._id
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortby = req.query.sortby || 'createdAt';
    const sortOrder = req.query.order || 'desc';
    const skipIndex = (page - 1) * limit;
    try {
        const id = req.params.id
        if (!id) {
            sendResponse(req, res, false, "ID not found", null)
        }
        // let result = await ServiceModal.find({ userID: id }).sort({ createdAt: 1 });

        const totalItems = await ServiceModal.countDocuments({ userID: id });
        const totalPages = Math.ceil(totalItems / limit);

        const mongooseSortOrder = sortOrder === 'desc' ? -1 : 1;

        let response = await ServiceModal.find({ userID: id })
            .skip(skipIndex)
            .limit(limit)
            .sort({ [sortby]: mongooseSortOrder })
        const data = {
            documents: response,
            currentPage: page,
            totalPages: totalPages,
            totalProducts: totalItems,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        };

        if (response) {
            sendResponse(req, res, true, "Services found successfully", data)
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
    deleteService,
    getFilteredServices
}