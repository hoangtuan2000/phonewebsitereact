const productsController = require('../controllersAdmin/productsControllerAdmin')
const router = require('express').Router()

router.get('/getAllProducts', productsController.getAllProducts)
router.post('/getBasicProductInfo', productsController.getBasicProductInfo)
router.post('/getDetailProductInfo', productsController.getDetailProductInfo)

module.exports = router