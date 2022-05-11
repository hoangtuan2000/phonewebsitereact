const uploadMultipleImagesController = require('../controllersAdmin/uploadMultipleImages')
const addProductController = require('../controllersAdmin/addProductControllerAdmin')
const router = require('express').Router()

router.post('/addSmartphone', uploadMultipleImagesController.uploadImage, addProductController.addSmartphone)

// router.post('/addSmartphone', addProductController.addSmartphone)
// router.post('/addSmartphone',  addProductController.test)

module.exports = router