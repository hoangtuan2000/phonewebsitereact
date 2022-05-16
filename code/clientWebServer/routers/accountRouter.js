const accountController = require('../controllers/accountController')
const router = require('express').Router()

router.post('/getAccountInfo', accountController.getAccountInfo)
router.post('/updateAccountInfo', accountController.existEmailUpdateAccount, accountController.updateAccountInfo)
router.post('/updateAccountPassword', accountController.updateAccountPassword)
router.post('/addAddressAccount', accountController.addAddressAccount)
router.get('/getAllAddressAccount', accountController.getAllAddressAccount)
router.post('/deleteAddressAccount', accountController.deleteAddressAccount)

module.exports = router