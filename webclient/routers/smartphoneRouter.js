const productController = require('../controllers/smartphoneController')
const router = require('express').Router()

router.get('/getAllSmartphones', productController.getAllSmartphones)
router.get('/getPromotionalSmartphones', productController.getPromotionalSmartphones)
router.get('/getHighPriceSmartphones', productController.getHighPriceSmartphones)

module.exports = router