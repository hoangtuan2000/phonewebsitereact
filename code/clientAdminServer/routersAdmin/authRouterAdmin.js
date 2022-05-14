const authController = require('../controllersAdmin/authControllerAdmin')
const router = require('express').Router()

router.post('/loginAdmin', authController.loginAdmin)
router.post('/registerAdmin', authController.emailExist, authController.registerAdmin)
router.post('/updateAccountAdmin', authController.emailExistUpdateAccount, authController.updateAccountAdmin)
router.get('/getLoginAdmin', authController.getLoginAdmin)

module.exports = router