const express   =   require('express')
const sendResponse = require('../utils/sendResponse')
const { addCountry, addState, addCity, addStreet, getCountries, getStatesByCountry, getCitiesByState, getStreetsByCity, getLocationsByTyping, getAllLocations } = require('../controller/locations')


const router    =   express.Router()


router.post('/addCountry', addCountry)
router.post('/addState', addState)
router.post('/addCity', addCity)
router.post('/addStreet', addStreet)

router.get('/getCountries', getCountries)
router.get('/getStatesByCountry', getStatesByCountry)
router.get('/getCitiesByState', getCitiesByState)
router.get('/getStreetsByCity', getStreetsByCity)

router.get('/getAllLocations', getAllLocations)

router.get('/getLocationAutoplaces', getLocationsByTyping)

module.exports = router
