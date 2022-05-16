const analysisController = require('../controllersAdmin/analysisController')
const router = require('express').Router()

router.get('/countUser', analysisController.countUser)
router.get('/countTodayOrder', analysisController.countTodayOrder)
router.get('/countYesterdayOrder', analysisController.countYesterdayOrder)
router.get('/totalMoneyTodayOrder', analysisController.totalMoneyTodayOrder)
router.get('/totalMoneyYesterdayOrder', analysisController.totalMoneyYesterdayOrder)
router.get('/sellingProducts', analysisController.sellingProducts)

module.exports = router