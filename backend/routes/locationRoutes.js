const express   =   require('express')
const sendResponse = require('../utils/sendResponse')
const { addCountry, addState, addCity, addStreet, getCountries, getStatesByCountry, getCitiesByState, getStreetsByCity, getLocationsByTyping, getAllLocations } = require('../controller/locations')
const verifyToken = require('../middlewares/verifyToken')


const router    =   express.Router()


router.post('/addCountry', verifyToken, addCountry)
router.post('/addState', verifyToken, addState)
router.post('/addCity', verifyToken, addCity)
router.post('/addStreet', verifyToken, addStreet)

router.get('/getCountries', getCountries)
router.get('/getStatesByCountry', getStatesByCountry)
router.get('/getCitiesByState', getCitiesByState)
router.get('/getStreetsByCity', getStreetsByCity)

router.get('/getAllLocations', getAllLocations)

router.get('/getLocationAutoplaces', getLocationsByTyping)

module.exports = router
