const uploadMultipleImagesController = require('../controllersAdmin/uploadImageController')
const updateSmartphoneController = require('../controllersAdmin/updateProductControlller/updateSmartphoneControllerAdmin')
const router = require('express').Router()

router.post('/updateSmartphone', uploadMultipleImagesController.uploadAvatarAndImages, updateSmartphoneController.updateSmartphone)

module.exports = router