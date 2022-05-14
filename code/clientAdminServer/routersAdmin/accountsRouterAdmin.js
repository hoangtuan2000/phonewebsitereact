const accountsController = require('../controllersAdmin/accountsControllerAdmin')
const router = require('express').Router()

router.get('/getAllAccounts', accountsController.getAllAccounts)
router.post('/getAccountInfo', accountsController.getAccountInfo)

module.exports = router