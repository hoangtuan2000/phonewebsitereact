const productsController = require('../controllersAdmin/productsControllerAdmin')
const router = require('express').Router()

router.get('/getAllProducts', productsController.getAllProducts)
router.get('/getAllSmartphones', productsController.getAllSmartphones)
router.get('/getAllHeadphones', productsController.getAllHeadphones)
router.get('/getAllPhonecases', productsController.getAllPhonecases)
router.post('/getBasicProductInfo', productsController.getBasicProductInfo)
router.post('/getDetailProductInfo', productsController.getDetailProductInfo)

module.exports = router