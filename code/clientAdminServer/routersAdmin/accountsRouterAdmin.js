const accountsController = require('../controllersAdmin/accountsControllerAdmin')
const router = require('express').Router()

router.get('/getAllAccounts', accountsController.getAllAccounts)
router.get('/getAllManagementAccounts', accountsController.getAllManagementAccounts)
router.get('/getAllStaffAccounts', accountsController.getAllStaffAccounts)
router.post('/getAccountInfo', accountsController.getAccountInfo)

module.exports = router