const orderController = require('../controllers/orderController')
const router = require('express').Router()

router.post('/orderProductInCart', orderController.orderProductInCart)
router.post('/getProductInfoOrder', orderController.getProductInfoOrder)
router.post('/orderProduct', orderController.orderProduct)
router.post('/changeNumberProductOrder', orderController.changeNumberProductOrder)
router.post('/getOrderInfo', orderController.getOrderInfo)
router.post('/getAllOrderAccount', orderController.getAllOrderAccount)

module.exports = router