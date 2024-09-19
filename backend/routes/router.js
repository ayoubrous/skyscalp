const express = require('express')
const sendResponse = require('../utils/sendResponse')
const { register, login, addNewUser, verfiyAccount, getUserById, getUserByIdAndRole, getAllUsers, updateUserInfo, updateUserStaus, forgotPassword, verfiyAccountForPassword, updatePassword } = require('../controller/user')
const verifyToken = require('../middlewares/verifyToken')
const { addProperty, updateProperty, getProperties, getSingleProperty, deleteProperty, getPropertiesByUserid, updatePropertyFeature, updatePropertyFavourites, getFilteredProperties, getFeaturedProperties } = require('../controller/property')
const { getAnalytics, addAnalytics } = require('../controller/analytics')
const locationRoutes = require('./locationRoutes')
const { addToFavourites, removeFromFavourites, checkInFavourites, getFavourites } = require('../controller/favourites')
const { sendMessage, getUserMessages, getMessagesToAdmin } = require('../controller/messages')
const { getProductDetails } = require('../controller/utils')
const { addProduct, updateProduct, getProducts, getProductsByUserID, getSingleProduct, deleteProduct, getMachineryProducts, getConstructionProducts, getFurnitureProducts, updateProductFeature, updateProductFavourites, getProductsByFilters, getFeaturedProducts } = require('../controller/materials')
const { addArticle, updateArticle, getArticles, getSingleArticle, deleteArticle } = require('../controller/articles')
const { addService, updateService, getServices, getServicesByUserID, deleteService, getSingleService, getFilteredServices } = require('../controller/services')

const router = express.Router()

router.get('/', (req, res) => {
    sendResponse(req, res, 200, "Success", null)
})


// route to register api 
router.post('/api/register', register)
router.get('/api/verify', verfiyAccount)
router.get('/api/verifyForPassword', verfiyAccountForPassword)
router.post('/api/updatePassword', updatePassword)
router.post('/api/login', login)
router.post('/api/forgotPassword', forgotPassword)
router.get('/api/getUserById/:id', getUserById)
router.get('/api/getAllUsers', getAllUsers)
router.put('/api/updateUserInfo/:id', updateUserInfo)
router.get('/api/updateUserStatus/:id/:status', updateUserStaus)


router.get('/api/getProductDetails', getProductDetails)


// APIs for Property 
router.post('/api/addProperty', addProperty)
router.put('/api/updateProperty/:id', updateProperty)
router.get('/api/getProperties', getProperties)
router.get('/api/getFeaturedProperties', getFeaturedProperties)
router.post('/api/getPropertiesByFilters', getFilteredProperties)
router.get('/api/getUserProperties/:id', getPropertiesByUserid)
router.get('/api/getPropertyById/:id', getSingleProperty)
router.get('/api/updatePropertyFeaturedStatus/:id/:featured', updatePropertyFeature)
router.get('/api/updatePropertyFavourites/:id/:favouriteID/:action', updatePropertyFavourites)
router.delete('/api/deleteProperty/:id', deleteProperty)

// APIs for Materials 
router.post('/api/addProduct', addProduct)
router.put('/api/updateProduct/:id', updateProduct)
router.get('/api/getProducts', getProducts)
router.post('/api/getProductsByFilters', getProductsByFilters)
router.get('/api/getUserProducts/:id', getProductsByUserID)
router.get('/api/getProductById/:id', getSingleProduct)
router.delete('/api/deleteProduct/:id', deleteProduct)
router.get('/api/updateProductFeaturedStatus/:id/:featured', updateProductFeature)


router.get('/api/updateProductFavourites/:ref/:id/:favouriteID/:action', updateProductFavourites)

router.get('/api/getFeaturedProducts', getFeaturedProducts)


router.get('/api/getMachinery', getMachineryProducts)
router.get('/api/getConstruction', getConstructionProducts)
router.get('/api/getFurniture', getFurnitureProducts)


// APIs for Location
router.use('/api/location', locationRoutes)


// APIS for favourites 
router.post('/api/addToFavourites', addToFavourites)
router.post('/api/removeFromFavourites', removeFromFavourites)
router.post('/api/checkInFavourites', checkInFavourites)
router.get('/api/getFavourites/:id', getFavourites)



// APIS for messages 
router.post('/api/sendMessage', sendMessage)
router.get('/api/getMessagesByUserID', getUserMessages)
router.get('/api/getMessagesToAdmin', getMessagesToAdmin)



// APIs for Articles 
router.post('/api/addArticle', addArticle)
router.put('/api/updateArticle/:id', updateArticle)
router.get('/api/getArticles', getArticles)
router.get('/api/getArticleById/:id', getSingleArticle)
router.delete('/api/deleteArticle/:id', deleteArticle)


// API For analytics 
router.post('/api/addAnalytics', addAnalytics)
router.get('/api/getAnalytics', getAnalytics)

// APIs for Services 
router.post('/api/addService', addService)
router.put('/api/updateService/:id', updateService)
router.get('/api/getServiceById/:id', getSingleService)
router.post('/api/getServices', getServices)
router.post('/api/getFilteredServices', getFilteredServices)
router.get('/api/getUserServices/:id', getServicesByUserID)
router.delete('/api/deleteService/:id', deleteService)

module.exports = router