const productsController = require('../controllersAdmin/productsControllerAdmin')
const router = require('express').Router()

router.get('/getAllProducts', productsController.getAllProducts)
router.post('/getOneProduct', productsController.getOneProduct)

module.exports = router