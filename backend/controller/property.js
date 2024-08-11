const MaterialsModal = require('../modal/Materials');
const PropertyModal = require('../modal/Property')
const sendResponse = require("../utils/sendResponse")


const addProperty = async (req, res) => {
    try {
        if (!req.body) {
            sendResponse(req, res, false, "Property Data not found", null)
        }
        // console.log(req.body)
        const data = { ...req.body, featured: false };
        let property = new PropertyModal(data)
        let result = await property.save()
        if (result) {
            sendResponse(req, res, true, "Property published successfully", result)
        }
        else {
            sendResponse(req, res, false, "Error creating Property, try again", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const updateProperty = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            sendResponse(req, res, false, "Property ID not found", null)
        }
        if (!req.body) {
            sendResponse(req, res, false, "Property Data not found", null)
        }

        // let property = new PropertyModal(req.body)
        let response = await PropertyModal.findOneAndUpdate({ _id: id }, req.body)
        if (response) {
            sendResponse(req, res, true, "Property updated successfully", null)
        }
        else {
            sendResponse(req, res, false, "Error updating Property, try again", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const updatePropertyFeature = async (req, res) => {
    try {
        const id = req.params.id
        const featured = req.params.featured
        if (!id && !featured) {
            sendResponse(req, res, false, "ID not found", null)
        }

        // let property = new PropertyModal(req.body)
        let response = await PropertyModal.findOneAndUpdate({ _id: id }, { featured: featured })
        if (response) {
            sendResponse(req, res, true, "Feature updated successfully", null)
        }
        else {
            sendResponse(req, res, false, "Error updating Feature, try again", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const updatePropertyFavourites = async (req, res) => {
    try {
        const propertyID = req.params.id
        const favouriteID = req.params.favouriteID
        const action = req.params.action;
        if (!propertyID && !favouriteID) {
            sendResponse(req, res, false, "ID not found", null)
        }

        let updateOperation;

        if (action === 'add') {
            updateOperation = { $addToSet: { toFavourites: favouriteID } };
        } else if (action === 'remove') {
            updateOperation = { $pull: { toFavourites: favouriteID } };
        }

        let response = await PropertyModal.findOneAndUpdate(
            { _id: propertyID },
            updateOperation,
            { new: true }
        );

        if (response) {
            sendResponse(req, res, true, "Favourite updated successfully", null)
        }
        else {
            sendResponse(req, res, false, "Error updating Favourite, try again", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}
const getProperties = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const sortby = req.query.sortby || 'createdAt'; // Default to 'relevance' if not provided
    const sortOrder = req.query.order || 'desc'; // Default to 'desc' if not provided
    const skipIndex = (page - 1) * limit;
    const sellType = req.query.type || ''

    try {
        const totalItems = await PropertyModal.countDocuments();
        const totalPages = Math.ceil(totalItems / limit);

        const mongooseSortOrder = sortOrder === 'desc' ? -1 : 1;

        let response = await PropertyModal.find({ status: true })
            .skip(skipIndex)
            .limit(limit)
            .sort({ [sortby]: mongooseSortOrder }) // Sort properties data by the specified field and order
            .populate('userID');

        if (response.length > 0) {
            response = response.map(property => ({
                ...property.toObject(),
                user: {
                    username: property.userID.username,
                    email: property.userID.email,
                    profileImage: property.userID.profileImage,
                    phone: property.userID.phone
                },
                userID: property.userID._id
            }));

            const data = {
                documents: response,
                currentPage: page,
                totalPages: totalPages,
                totalProperties: totalItems,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            };

            sendResponse(req, res, true, "Properties found successfully", data);
        } else {
            sendResponse(req, res, false, "No Properties found", null);
        }
    } catch (err) {
        console.log(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};

const getFeaturedProperties = async (req, res) => {

    try {
        let response = await PropertyModal.find({ featured: true })
            .populate('userID');

        if (response.length > 0) {
            response = response.map(property => ({
                ...property.toObject(),
                user: {
                    username: property.userID.username,
                    email: property.userID.email,
                    profileImage: property.userID.profileImage,
                    phone: property.userID.phone
                },
                userID: property.userID._id
            }));

            sendResponse(req, res, true, "Products found successfully", response);
        } else {
            sendResponse(req, res, false, "No Products found", null);
        }
    } catch (err) {
        console.log(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};

const getSingleProperty = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {

            sendResponse(req, res, false, "Property ID not found", null)
        }
        let result = await PropertyModal.findOne({ _id: id }).populate('userID')
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
            sendResponse(req, res, true, "Property found successfully", result)
        }
        else {
            sendResponse(req, res, false, "No property found", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const getPropertiesByUserid = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            sendResponse(req, res, false, "ID not found", null)
        }
        let result = await PropertyModal.find({ userID: id }).sort({ createdAt: 1 })
        if (result) {
            sendResponse(req, res, true, "Property found successfully", result)
        }
        else {
            sendResponse(req, res, false, "No property found", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const deleteProperty = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            sendResponse(req, res, false, "Property ID not found", null)
        }
        let result = await PropertyModal.findOneAndDelete({ _id: id })
        if (result) {
            sendResponse(req, res, true, "Property deleted successfully", result)
        }
        else {
            sendResponse(req, res, false, "Error deleting property ", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}



const updateArea = async (req, res) => {
    try {
        const getResponse = await MaterialsModal.find()

        getResponse.forEach(async (property) => {
            const updateArea = await MaterialsModal.findByIdAndUpdate(property._id, { budget: parseInt(property.budget) })
        })


    }
    catch (err) {
        console.log(err)
    }
}


const getFilteredProperties = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const sortby = req.query.sortby || 'createdAt'; // Default to 'createdAt' if not provided
    const sortOrder = req.query.order || 'desc'; // Default to 'desc' if not provided
    const skipIndex = (page - 1) * limit;

    // Construct filter object based on provided filters
    const filters = {
        status: true
    };

    const {
        type,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        minBeds,
        maxBeds,
        minBath,
        maxBath,
        yearBuild,
        proximities,
        features,
        selectedConditions,
        checkedSubcategories,
        selectedCountries,
        selectedStates,
        selectedCities,
        selectedStreets,
    } = req.body;

    if (type) filters.type = type;
    if (minPrice) filters.budget = { $gte: parseInt(minPrice) };
    if (maxPrice) filters.budget = { ...filters.budget, $lte: parseInt(maxPrice) };
    if (minSize) filters.area = { $gte: parseInt(minSize) };
    if (maxSize) filters.area = { ...filters.area, $lte: parseInt(maxSize) };
    if (minBeds) filters.rooms = { $gte: parseInt(minBeds) };
    if (maxBeds) filters.rooms = { ...filters.rooms, $lte: parseInt(maxBeds) };
    if (minBath) filters.bathrooms = { $gte: parseInt(minBath) };
    if (maxBath) filters.bathrooms = { ...filters.bathrooms, $lte: parseInt(maxBath) };

    // for arrays 
    if (yearBuild.length > 0) filters.build = { $in: yearBuild };
    if (proximities.length > 0) filters.proximity = { $in: proximities };
    if (features.length > 0) filters.features = { $in: features };
    if (selectedConditions.length > 0) filters.condition = { $in: selectedConditions };
    if (checkedSubcategories.length > 0) filters.category = { $in: checkedSubcategories };

    // for locations 
    if (selectedCountries.length > 0) filters.country = { $in: selectedCountries };
    if (selectedStates.length > 0) filters.state = { $in: selectedStates };
    if (selectedCities.length > 0) filters.city = { $in: selectedCities };
    if (selectedStreets.length > 0) filters.street = { $in: selectedStreets };


    // console.log(filters)
    try {
        const totalItems = await PropertyModal.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const mongooseSortOrder = sortOrder === 'desc' ? -1 : 1;

        let response = await PropertyModal.find(filters)
            .skip(skipIndex)
            .limit(limit)
            .sort({ [sortby]: mongooseSortOrder }) // Sort properties data by the specified field and order
            .populate('userID');

        if (response.length > 0) {
            response = response.map(property => ({
                ...property.toObject(),
                user: {
                    username: property.userID.username,
                    email: property.userID.email,
                    profileImage: property.userID.profileImage,
                    phone: property.userID.phone
                },
                userID: property.userID._id
            }));

            const data = {
                documents: response,
                currentPage: page,
                totalPages: totalPages,
                totalProperties: totalItems,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            };

            sendResponse(req, res, true, "Properties found successfully", data);
        } else {
            sendResponse(req, res, false, "No Properties found", null);
        }
    } catch (err) {
        console.log(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
}

module.exports = {
    addProperty,
    updateProperty,
    updatePropertyFeature,
    updatePropertyFavourites,
    getProperties,
    getSingleProperty,
    getPropertiesByUserid,
    deleteProperty,
    getFilteredProperties,
    getFeaturedProperties
}

