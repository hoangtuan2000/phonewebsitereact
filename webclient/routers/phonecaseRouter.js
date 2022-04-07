const productController = require('../controllers/phonecaseController')
const router = require('express').Router()

router.get('/getAllPhonecases', productController.getAllPhonecases)
router.get('/getPromotionalPhonecases', productController.getPromotionalPhonecases)
router.get('/getHighPricePhonecases', productController.getHighPricePhonecases)

module.exports = router