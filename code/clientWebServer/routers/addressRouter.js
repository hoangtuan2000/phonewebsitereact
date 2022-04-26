const addressController = require('../controllers/addressController')
const router = require('express').Router()

router.get('/getAllProvinces', addressController.getAllProvinces)
router.post('/getDistrictsProvince', addressController.getDistrictsProvince)
router.post('/getWardsDistrict', addressController.getWardsDistrict)
router.get('/getAddressUser', addressController.getAddressUser)

module.exports = router