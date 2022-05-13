const uploadMultipleImagesController = require('../controllersAdmin/uploadImageController')
const updateProductController = require('../controllersAdmin/updateProductControllerAdmin')
const router = require('express').Router()

router.post('/updateSmartphone', uploadMultipleImagesController.uploadAvatarAndImages, updateProductController.updateSmartphone)
// router.post('/updateHeadphone', uploadMultipleImagesController.uploadAvatarAndImages, updateProductController.updateHeadphone)
// router.post('/updatePhonecase', uploadMultipleImagesController.uploadAvatarAndImages, updateProductController.updatePhonecase)

module.exports = router