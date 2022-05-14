const getDatabaseController = require('../controllersAdmin/getDatabaseController')
const router = require('express').Router()

router.get('/getAllPositions', getDatabaseController.getAllPositions)
router.get('/getAllProvinces', getDatabaseController.getAllProvinces)
router.get('/getAllDistricts', getDatabaseController.getAllDistricts)
router.get('/getAllWards', getDatabaseController.getAllWards)
router.post('/getDistrictsProvince', getDatabaseController.getDistrictsProvince)
router.post('/getWardsDistrict', getDatabaseController.getWardsDistrict)
router.get('/getAllActiveStatus', getDatabaseController.getAllActiveStatus)

module.exports = router