const uploadMultipleImagesController = require('../controllersAdmin/uploadImageController')
const updateSmartphoneController = require('../controllersAdmin/updateProductControlller/updateSmartphoneControllerAdmin')
const updateHeadphoneController = require('../controllersAdmin/updateProductControlller/updateHeadphoneControllerAdmin')
const updatePhonecaseController = require('../controllersAdmin/updateProductControlller/updatePhonecaseControllerAdmin')
const router = require('express').Router()

router.post('/updateSmartphone', uploadMultipleImagesController.uploadAvatarAndImages, updateSmartphoneController.updateSmartphone)
router.post('/updateHeadphone', uploadMultipleImagesController.uploadAvatarAndImages, updateHeadphoneController.updateHeadphone)
router.post('/updatePhonecase', uploadMultipleImagesController.uploadAvatarAndImages, updatePhonecaseController.updatePhonecase)

module.exports = router