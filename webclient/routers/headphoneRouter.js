const productController = require('../controllers/headphoneController')
const router = require('express').Router()

router.get('/getAllHeadphones', productController.getAllHeadphones)
router.get('/getPromotionalHeadphones', productController.getPromotionalHeadphones)
router.get('/getHighPriceHeadphones', productController.getHighPriceHeadphones)


module.exports = router