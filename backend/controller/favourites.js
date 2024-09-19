const FavouritesModal = require('../modal/Favourites');
const MaterialsModal = require('../modal/Materials');
const PropertyModal = require('../modal/Property');
const sendResponse = require("../utils/sendResponse")

const addToFavourites = async (req, res) => {
    try {
        if (!req.body || !req.body.userID || !req.body.productID) {
            return sendResponse(req, res, false, "Invalid data provided", null);
        }

        // Check if the document with the same userID and productID already exists
        const existingFavourite = await FavouritesModal.findOne({
            userID: req.body.userID,
            productID: req.body.productID
        });

        if (existingFavourite) {
            return sendResponse(req, res, false, "Product already in favourites", existingFavourite);
        }

        // If not found, add the product to favourites
        let favourite = new FavouritesModal(req.body);
        let result = await favourite.save();
        if (result) {
            sendResponse(req, res, true, "Product added to favourites", result);
        } else {
            sendResponse(req, res, false, "Error adding to favourites, try again", null);
        }

    } catch (err) {
        console.error(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};

const removeFromFavourites = async (req, res) => {
    try {
        if (!req.body || !req.body.userID || !req.body.productID) {
            sendResponse(req, res, false, "Invalid data provided", null);
        }

        const existingFavourite = await FavouritesModal.findOneAndDelete({
            userID: req.body.userID,
            productID: req.body.productID
        });

        if (existingFavourite) {
            sendResponse(req, res, true, "Product removed from favourites", existingFavourite);
        } else {
            sendResponse(req, res, false, "Product not found in favourites", null);
        }

    } catch (err) {
        console.error(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};
const checkInFavourites = async (req, res) => {
    try {
        if (!req.body || !req.body.userID || !req.body.productID) {
            sendResponse(req, res, false, "Invalid data provided", null);
        }

        const existingFavourite = await FavouritesModal.findOne({
            userID: req.body.userID,
            productID: req.body.productID
        });


        if (existingFavourite) {
            sendResponse(req, res, true, "Product found in favourites", existingFavourite);
        } else {
            sendResponse(req, res, false, "Product not found in favourites", null);
        }

    } catch (err) {
        console.error(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};


const getFavourites = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return sendResponse(req, res, false, "Property ID not found", null);
        }
        let results = await FavouritesModal.find({userID: id});


        
        if (results.length > 0) {
            return sendResponse(req, res, true, "Favourites found successfully", results);
        } else {
            return sendResponse(req, res, false, "No Favourites found", null);
        }
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};
// const getFavourites = async (req, res) => {
//     try {
//         const id = req.params.id; // Assuming userId is obtained from params
//         if (!id) {
//             return sendResponse(req, res, false, "User ID not found", null);
//         }
        
//         // Get favourites for the user
//         const userFavourites = await FavouritesModal.find({ userID: id });

//         if (userFavourites.length > 0) {
//             let results = [];
            
//             // Iterate through each favourite to find product details
//             for (const favourite of userFavourites) {
//                 const productID = favourite.productID;

//                 // Find product details in either PropertyModal or MaterialsModal
//                 const propertyDetails = await PropertyModal.findOne({ _id: productID });
//                 const materialsDetails = await MaterialsModal.findOne({ _id: productID });

//                 // Check if either property or materials details are found
//                 if (propertyDetails || materialsDetails) {
//                     // Pushing favourite with productDetails to results
//                     results.push({
//                         favourite: favourite.toObject(), // Adding favourite details
//                         productDetails: propertyDetails ? propertyDetails.toObject() : materialsDetails.toObject()
//                     });
//                 }
//             }

//             if (results.length > 0) {
//                 return sendResponse(req, res, true, "Favourites found successfully", results);
//             } else {
//                 return sendResponse(req, res, false, "No matching product details found for favourites", null);
//             }
//         } else {
//             return sendResponse(req, res, false, "No favourites found for the user", null);
//         }
//     } catch (err) {
//         console.log(err);
//         return sendResponse(req, res, false, "Error proceeding your request, try again", null);
//     }
// };

module.exports = {
    addToFavourites,
    removeFromFavourites,
    checkInFavourites,
    getFavourites
}
