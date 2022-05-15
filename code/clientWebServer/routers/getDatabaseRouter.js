const getDatabaseController = require('../controllers/getDatabaseController')
const router = require('express').Router()

router.get('/getAllOrdersStatus', getDatabaseController.getAllOrdersStatus)

module.exports = router