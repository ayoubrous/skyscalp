const MaterialsModal = require('../modal/Materials');
const PropertyModal = require('../modal/Property');
const sendResponse = require("../utils/sendResponse")
const ServiceModal = require('../modal/Service')


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
        let response = await MaterialsModal.findOneAndUpdate({ _id: id }, req.body, { new: true, timestamps: true })
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
const getAllProducts = async (req, res) => {

    try {


        let response = await MaterialsModal.find()
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


            sendResponse(req, res, true, "Products found successfully", response);
        } else {
            sendResponse(req, res, false, "No Products found", null);
        }
    } catch (err) {
        console.log(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};

const getFeaturedProducts = async (req, res) => {

    try {
        let response = await MaterialsModal.find({ featured: true }).populate('userID');

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
            sendResponse(req, res, true, "Products found successfully", response);
        } else {
            sendResponse(req, res, false, "No Products found", null);
        }
    } catch (err) {
        console.log(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};

const getProductsByFilters = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const sortby = req.query.sortby || 'createdAt'; // Default to 'relevance' if not provided
    const sortOrder = req.query.order || 'desc'; // Default to 'desc' if not provided
    const skipIndex = (page - 1) * limit;

    const materialGroup = req.query.materialGroup || ''


    // Construct filter object based on provided filters
    const filters = {
        status: true
    };

    const {
        type,
        minPrice,
        maxPrice,
        guarantee,
        selectedBrands,
        selectedMachineryType,
        selectedMaterialType,
        yearBuild,
        selectedConditions,
        checkedSubcategories,
        selectedCountries,
        selectedStates,
        selectedCities,
        selectedStreets,
        selectedMaterials,
        materialItemType
    } = req.body;

    if (type) filters.type = type;
    if (minPrice) filters.budget = { $gte: parseInt(minPrice) };
    if (maxPrice) filters.budget = { ...filters.budget, $lte: parseInt(maxPrice) };
    if (guarantee) filters.guarantee = { ...filters.guarantee, $eq: guarantee };

    // for arrays
    // if (selectedMaterials.length > 0) filters.material = { $in: selectedMaterials };
    // if (materialItemType.length > 0) filters.type = { $in: materialItemType };
    // if (selectedBrands.length > 0) filters.brand = { $in: selectedBrands };
    // if (selectedMachineryType.length > 0) filters.machineryType = { $in: selectedMachineryType };
    // if (selectedMaterialType.length > 0) filters.materialType = { $in: selectedMaterialType };
    // if (yearBuild.length > 0) filters.build = { $in: yearBuild };
    // if (selectedConditions.length > 0) filters.condition = { $in: selectedConditions };

    // Check if the arrays exists 
    if (selectedMaterials && selectedMaterials.length > 0) filters.material = { $in: selectedMaterials };
    if (materialItemType && materialItemType.length > 0) filters.type = { $in: materialItemType };
    if (selectedBrands && selectedBrands.length > 0) filters.brand = { $in: selectedBrands };
    if (selectedMachineryType && selectedMachineryType.length > 0) filters.machineryType = { $in: selectedMachineryType };
    if (selectedMaterialType && selectedMaterialType.length > 0) filters.materialType = { $in: selectedMaterialType };
    if (yearBuild && yearBuild.length > 0) filters.build = { $in: yearBuild };
    if (selectedConditions && selectedConditions.length > 0) filters.condition = { $in: selectedConditions };

    // new inclusion
    if (checkedSubcategories.length > 0) {
        filters.$or = [
            { article: { $in: checkedSubcategories } },
            { category: { $in: checkedSubcategories } },
            { application: { $in: checkedSubcategories } }
        ];
    }

    // for locations
    if (selectedCountries.length > 0) filters.country = { $in: selectedCountries };
    if (selectedStates.length > 0) filters.state = { $in: selectedStates };
    if (selectedCities.length > 0) filters.city = { $in: selectedCities };
    if (selectedStreets.length > 0) filters.street = { $in: selectedStreets };

    try {
        // add material group into filters as well
        filters.materialGroup = materialGroup;

        const totalItems = await MaterialsModal.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const mongooseSortOrder = sortOrder === 'desc' ? -1 : 1;

        let response = await MaterialsModal.find(filters)
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortby = req.query.sortby || 'createdAt';
    const sortOrder = req.query.order || 'desc';
    const skipIndex = (page - 1) * limit;
    const materialGroup = req.query.materialGroup;


    try {
        const id = req.params.id;
        
        

        if (!id) {
            sendResponse(req, res, false, "ID not found", null)
        }


        const totalItems = await MaterialsModal.countDocuments({ userID: id, materialGroup });
        const totalPages = Math.ceil(totalItems / limit);

        const mongooseSortOrder = sortOrder === 'desc' ? -1 : 1;

        let response = await MaterialsModal.find({userID: id, materialGroup})
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

        // let result = await MaterialsModal.find({ userID: id }).sort({ createdAt: 1 })
        if (response) {
            sendResponse(req, res, true, "Products found successfully", data)
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
        let response = await MaterialsModal.findOneAndUpdate({ _id: id }, { featured: featured })
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



// api for updating a specific product favourites (product added to fav by users)
const updateProductFavourites = async (req, res) => {
    try {
        const productID = req.params.id
        const favouriteID = req.params.favouriteID
        const ref = req.params.ref
        const action = req.params.action;


        if (!productID && !favouriteID && !ref) {
            sendResponse(req, res, false, "Data not found", null)
        }

        let updateOperation;

        if (action === 'add') {
            updateOperation = { $addToSet: { toFavourites: favouriteID } };
        } else if (action === 'remove') {
            updateOperation = { $pull: { toFavourites: favouriteID } };
        }

        let response;
        if (ref === "properties") {
            response = await PropertyModal.findOneAndUpdate(
                { _id: productID },
                updateOperation,
                { new: true }
            );
        }
        else if (ref === "materials") {
            response = await MaterialsModal.findOneAndUpdate(
                { _id: productID },
                updateOperation,
                { new: true }
            );
        }
        else if (ref === "services") {
            response = await ServiceModal.findOneAndUpdate(
                { _id: productID },
                updateOperation,
                { new: true }
            );
        }


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
    getFeaturedProducts,
    getSingleProduct,
    getProductsByUserID,
    deleteProduct,
    getMachineryProducts,
    getConstructionProducts,
    getFurnitureProducts,
    updateProductFeature,
    updateProductFavourites,
    getProductsByFilters,
    getAllProducts
}