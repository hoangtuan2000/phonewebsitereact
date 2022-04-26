const cartController = require('../controllers/cartController')
const router = require('express').Router()

router.post('/addProductCart', cartController.getIdCartUser, cartController.addProductCart)
router.get('/getAllProductsCart', cartController.getIdCartUser, cartController.getAllProductsCart)
router.post('/deleteProductCart', cartController.getIdCartUser, cartController.deleteProductCart)
router.post('/changeNumberProductCart', cartController.getIdCartUser, cartController.changeNumberProductCart)

module.exports = router