const express = require('express');

const paymentController = require('../controller/paymentController');

const router = express.Router();

router.post('/', paymentController.sendPayment);

module.exports = router;
