const productController = require('../controllers/productController.js')
const router = require('express').Router()

router.get('/getAllProducts', productController.getAllProducts)
router.get('/getPromotionalProducts', productController.getPromotionalProducts)
router.get('/getOneProduct/:idProduct', productController.getOneProduct)
router.get('/getImagesProduct/:idProduct', productController.getImagesProduct)

module.exports = router