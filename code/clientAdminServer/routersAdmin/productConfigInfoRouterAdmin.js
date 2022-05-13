const productConfigInfoControllerAdmin = require('../controllersAdmin/productConfigInfoControllerAdmin')
const router = require('express').Router()

router.get('/getAllOrigin', productConfigInfoControllerAdmin.getAllOrigin)
router.get('/getAllMemory', productConfigInfoControllerAdmin.getAllMemory)
router.get('/getAllRam', productConfigInfoControllerAdmin.getAllRam)
router.get('/getAllTrademark', productConfigInfoControllerAdmin.getAllTrademark)
router.get('/getAllOperatingSystem', productConfigInfoControllerAdmin.getAllOperatingSystem)
router.get('/getAllDesign', productConfigInfoControllerAdmin.getAllDesign)
router.get('/getAllChip', productConfigInfoControllerAdmin.getAllChip)
router.get('/getAllSize', productConfigInfoControllerAdmin.getAllSize)
router.get('/getAllPromotion', productConfigInfoControllerAdmin.getAllPromotion)
router.get('/getAllMaterial', productConfigInfoControllerAdmin.getAllMaterial)
router.get('/getAllConnectionType', productConfigInfoControllerAdmin.getAllConnectionType)

module.exports = router