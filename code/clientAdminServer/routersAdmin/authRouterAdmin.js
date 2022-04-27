const authController = require('../controllersAdmin/authControllerAdmin')
const router = require('express').Router()

router.post('/loginAdmin', authController.login)
// router.post('/logout', authController.logout)
router.get('/getLoginAdmin', authController.getLogin)
// router.post('/register', authController.register)
// router.post('/existEmail', authController.existEmail)

module.exports = router