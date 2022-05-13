const uploadMultipleImagesController = require('../controllersAdmin/uploadImageController')
const addProductController = require('../controllersAdmin/addProductControllerAdmin')
const router = require('express').Router()

router.post('/addSmartphone', uploadMultipleImagesController.uploadMultipleImages, addProductController.addSmartphone)
router.post('/addHeadphone', uploadMultipleImagesController.uploadMultipleImages, addProductController.addHeadphone)
router.post('/addPhonecase', uploadMultipleImagesController.uploadMultipleImages, addProductController.addPhonecase)

module.exports = router