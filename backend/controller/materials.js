const MaterialsModal = require('../modal/Materials')
const sendResponse = require("../utils/sendResponse")


const addProduct = async (req, res) => {
    try {
        if (!req.body) {
            sendResponse(req, res, false, "Data not found", null)
        }
        // console.log(req.body)
        const data = { ...req.body, featured: false };
        let material = new MaterialsModal(data)
        let result = await material.save()
        if (result) {
            sendResponse(req, res, true, "Product published successfully", result)
        }
        else {
            sendResponse(req, res, false, "Error creating Product, try again", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            sendResponse(req, res, false, "ID not found", null)
        }
        if (!req.body) {
            sendResponse(req, res, false, "Data not found", null)
        }

        // let property = new PropertyModal(req.body)
        let response = await MaterialsModal.findOneAndUpdate({ _id: id }, req.body)
        if (response) {
            sendResponse(req, res, true, "Product updated successfully", null)
        }
        else {
            sendResponse(req, res, false, "Error updating Product, try again", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const getProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const sortby = req.query.sortby || 'createdAt'; // Default to 'relevance' if not provided
    const sortOrder = req.query.order || 'desc'; // Default to 'desc' if not provided
    const skipIndex = (page - 1) * limit;

    try {
        const totalItems = await MaterialsModal.countDocuments();
        const totalPages = Math.ceil(totalItems / limit);

        const mongooseSortOrder = sortOrder === 'desc' ? -1 : 1;

        let response = await MaterialsModal.find()
            .skip(skipIndex)
            .limit(limit)
            .sort({ [sortby]: mongooseSortOrder }) // Sort properties data by the specified field and order
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

            sendResponse(req, res, true, "Products found successfully", data);
        } else {
            sendResponse(req, res, false, "No Products found", null);
        }
    } catch (err) {
        console.log(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};


const getMachineryProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const sortby = req.query.sortby || 'createdAt'; // Default to 'relevance' if not provided
    const sortOrder = req.query.order || 'desc'; // Default to 'desc' if not provided
    const skipIndex = (page - 1) * limit;

    try {
        const totalItems = await MaterialsModal.countDocuments({ materialGroup: "machinery" });
        const totalPages = Math.ceil(totalItems / limit);

        const mongooseSortOrder = sortOrder === 'desc' ? -1 : 1;

        let response = await MaterialsModal.find({ materialGroup: "machinery" })
            .skip(skipIndex)
            .limit(limit)
            .sort({ [sortby]: mongooseSortOrder }) // Sort properties data by the specified field and order
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

            sendResponse(req, res, true, "Products found successfully", data);
        } else {
            sendResponse(req, res, false, "No Products found", null);
        }
    } catch (err) {
        console.log(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};

const getConstructionProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const sortby = req.query.sortby || 'createdAt'; // Default to 'relevance' if not provided
    const sortOrder = req.query.order || 'desc'; // Default to 'desc' if not provided
    const skipIndex = (page - 1) * limit;

    try {
        const totalItems = await MaterialsModal.countDocuments({ materialGroup: "construction" });
        const totalPages = Math.ceil(totalItems / limit);

        const mongooseSortOrder = sortOrder === 'desc' ? -1 : 1;

        let response = await MaterialsModal.find({ materialGroup: "construction" })
            .skip(skipIndex)
            .limit(limit)
            .sort({ [sortby]: mongooseSortOrder }) // Sort properties data by the specified field and order
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

            sendResponse(req, res, true, "Products found successfully", data);
        } else {
            sendResponse(req, res, false, "No Products found", null);
        }
    } catch (err) {
        console.log(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};


const getFurnitureProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const sortby = req.query.sortby || 'createdAt'; // Default to 'relevance' if not provided
    const sortOrder = req.query.order || 'desc'; // Default to 'desc' if not provided
    const skipIndex = (page - 1) * limit;

    try {
        const totalItems = await MaterialsModal.countDocuments({ materialGroup: "furniture" });
        const totalPages = Math.ceil(totalItems / limit);

        const mongooseSortOrder = sortOrder === 'desc' ? -1 : 1;

        let response = await MaterialsModal.find({ materialGroup: "furniture" })
            .skip(skipIndex)
            .limit(limit)
            .sort({ [sortby]: mongooseSortOrder }) // Sort properties data by the specified field and order
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

            sendResponse(req, res, true, "Products found successfully", data);
        } else {
            sendResponse(req, res, false, "No Products found", null);
        }
    } catch (err) {
        console.log(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};


const getSingleProduct = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {

            sendResponse(req, res, false, "ID not found", null)
        }
        let result = await MaterialsModal.findOne({ _id: id }).populate('userID')
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
            sendResponse(req, res, true, "Product found successfully", result)
        }
        else {
            sendResponse(req, res, false, "No Product found", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const getProductsByUserID = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            sendResponse(req, res, false, "ID not found", null)
        }
        let result = await MaterialsModal.find({ userID: id }).sort({ createdAt: 1 })
        if (result) {
            sendResponse(req, res, true, "Products found successfully", result)
        }
        else {
            sendResponse(req, res, false, "No Products found", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            sendResponse(req, res, false, "Product ID not found", null)
        }
        let result = await MaterialsModal.findOneAndDelete({ _id: id })
        if (result) {
            sendResponse(req, res, true, "Product deleted successfully", result)
        }
        else {
            sendResponse(req, res, false, "Error deleting Product ", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}



const updateProductFeature = async (req, res) => {
    try {
        const id = req.params.id
        const featured = req.params.featured
        if (!id && !featured) {
            sendResponse(req, res, false, "ID not found", null)
        }

        // let property = new PropertyModal(req.body)
        let response = await MaterialsModal.findOneAndUpdate({ _id: id }, {featured: featured})
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



const updateProductFavourites = async (req, res) => {
    try {
        const productID = req.params.id
        const favouriteID = req.params.favouriteID
        const action = req.params.action;
        if (!productID && !favouriteID) {
            sendResponse(req, res, false, "ID not found", null)
        }

        let updateOperation;

        if (action === 'add') {
            updateOperation = { $addToSet: { toFavourites: favouriteID } };
        } else if (action === 'remove') {
            updateOperation = { $pull: { toFavourites: favouriteID } };
        }

        let response = await MaterialsModal.findOneAndUpdate(
            { _id: productID },
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
module.exports = {
    addProduct,
    updateProduct,
    getProducts,
    getSingleProduct,
    getProductsByUserID,
    deleteProduct,
    getMachineryProducts,
    getConstructionProducts,
    getFurnitureProducts,
    updateProductFeature,
    updateProductFavourites
}