const ordersController = require('../controllersAdmin/ordersControllerAdmin')
const router = require('express').Router()

router.get('/getAllOrders', ordersController.getAllOrders)
router.get('/getAllOrdersUnprocessed', ordersController.getAllOrdersUnprocessed)
router.get('/getAllOrdersProcessed', ordersController.getAllOrdersProcessed)
router.get('/getAllOrdersTransported', ordersController.getAllOrdersTransported)
router.get('/getAllOrdersDelivery', ordersController.getAllOrdersDelivery)
router.get('/getAllOrdersSuccessDelivery', ordersController.getAllOrdersSuccessDelivery)
router.post('/getOrderInfo', ordersController.getOrderInfo)
router.post('/updateOrder', ordersController.updateOrder)

module.exports = router