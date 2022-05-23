const router = require('express').Router();
const ropsten = require('../Controller/ropsten.js')
const bsc = require('../controller/bsc.js')

router.post('/ropsten/transaction', ropsten.transaction)
router.post('/ropsten/balance', ropsten.balance)

router.post('/bsc/transaction', bsc.transaction)
router.post('/bsc/balance', bsc.balance)


module.exports = router;
