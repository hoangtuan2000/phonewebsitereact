const authController = require('../controllers/authController')
const router = require('express').Router()

router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/getlogin', authController.getLogin)
router.post('/register', authController.register)

module.exports = router