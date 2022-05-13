const uploadMultipleImagesController = require('../controllersAdmin/uploadMultipleImages')
const addProductController = require('../controllersAdmin/addProductControllerAdmin')
const router = require('express').Router()

router.post('/addSmartphone', uploadMultipleImagesController.uploadMultipleImages, addProductController.addSmartphone)
router.post('/addHeadphone', uploadMultipleImagesController.uploadMultipleImages, addProductController.addHeadphone)
router.post('/addPhonecase', uploadMultipleImagesController.uploadMultipleImages, addProductController.addPhonecase)

// router.post('/addSmartphone', addProductController.addSmartphone)
// router.post('/addSmartphone',  addProductController.test)

module.exports = router