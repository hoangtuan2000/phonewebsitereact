const cartController = require('../controllers/cartController')
const router = require('express').Router()

router.post('/addProductToCart', cartController.getIdCartUser, cartController.addProductToCart)

module.exports = router