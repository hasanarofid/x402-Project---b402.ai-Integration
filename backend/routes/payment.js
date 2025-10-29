const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Endpoint untuk inisiasi pembayaran
router.post('/initiate', paymentController.initiatePayment);

// Endpoint untuk verifikasi pembayaran
router.post('/verify', paymentController.verifyPayment);

// Endpoint untuk mendapatkan status pembayaran
router.get('/status/:transactionId', paymentController.getPaymentStatus);

// Endpoint untuk mendapatkan riwayat pembayaran
router.get('/history', paymentController.getPaymentHistory);

module.exports = router;

