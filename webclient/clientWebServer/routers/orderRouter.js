const orderController = require('../controllers/orderController')
const router = require('express').Router()

router.post('/orderProductInCart', orderController.orderProductInCart)

module.exports = router