const addressController = require('../controllers/addressController')
const router = require('express').Router()

router.get('/getAllProvinces', addressController.getAllProvinces)
router.get('/getAllDistricts', addressController.getAllDistricts)
router.get('/getAllWards', addressController.getAllWards)
router.post('/getDistrictsProvince', addressController.getDistrictsProvince)
router.post('/getWardsDistrict', addressController.getWardsDistrict)
router.get('/getAddressUser', addressController.getAddressUser)

module.exports = router