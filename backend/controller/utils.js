
const PropertyModal = require('../modal/Property')
const AnalyticsModal = require('../modal/Analytics')
const sendResponse = require("../utils/sendResponse");
const MaterialsModal = require('../modal/Materials');


const getProductDetails = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return sendResponse(req, res, false, "Product ID not found", null);
        }

        let result;

        // Check in properties collection
        result = await PropertyModal.findOne({ _id: id });
        if (result) {
            return sendResponse(req, res, true, "Product found in properties collection", result);
        }

        // Check in materials collection
        result = await MaterialsModal.findOne({ _id: id });
        if (result) {
            return sendResponse(req, res, true, "Product found in construction collection", result);
        }

        return sendResponse(req, res, false, "Product not found in properties, construction, or machinery collections", null);
    } catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
        console.log(err);
    }
};

module.exports = {
    getProductDetails,
}


// const getPropertyDetails = async (req, res) => {
//     try {
//         const id = req.params.id;
//         if (!id) {
//             return sendResponse(req, res, false, "Property ID not found", null);
//         }

//         let result;

//         // Check in properties collection
//         result = await PropertyModal.findOne({ _id: id }).populate('userID');
//         if (result) {
//             result = {
//                 ...result.toObject(),
//                 user: {
//                     username: result.userID.username,
//                     email: result.userID.email,
//                     profileImage: result.userID.profileImage,
//                     phone: result.userID.phone,
//                 },
//                 userID: result.userID._id
//             };
//             return sendResponse(req, res, true, "Property found successfully", result);
//         }

//         // Check in construction collection
//         result = await ConstructionModal.findOne({ _id: id }).populate('userID');
//         if (result) {
//             result = {
//                 ...result.toObject(),
//                 user: {
//                     username: result.userID.username,
//                     email: result.userID.email,
//                     profileImage: result.userID.profileImage,
//                     phone: result.userID.phone,
//                 },
//                 userID: result.userID._id
//             };
//             return sendResponse(req, res, true, "Construction found successfully", result);
//         }

//         // Check in machinery collection
//         result = await MachineryModal.findOne({ _id: id }).populate('userID');
//         if (result) {
//             result = {
//                 ...result.toObject(),
//                 user: {
//                     username: result.userID.username,
//                     email: result.userID.email,
//                     profileImage: result.userID.profileImage,
//                     phone: result.userID.phone,
//                 },
//                 userID: result.userID._id
//             };
//             return sendResponse(req, res, true, "Machinery found successfully", result);
//         }

//         // If ID not found in any collection
//         return sendResponse(req, res, false, "No property, construction, or machinery found with the given ID", null);
//     } catch (err) {
//         sendResponse(req, res, false, "Error proceeding your request, try again", null);
//         console.log(err);
//     }
// };
