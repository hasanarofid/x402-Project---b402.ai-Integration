const axios = require('axios');
const { ethers } = require('ethers');

// Simulasi database untuk menyimpan transaksi
const transactions = new Map();

// Inisiasi pembayaran
exports.initiatePayment = async (req, res) => {
  try {
    const { amount, recipient, purpose } = req.body;

    if (!amount || !recipient) {
      return res.status(400).json({ 
        error: 'Amount dan recipient wajib diisi' 
      });
    }

    // Generate transaction ID
    const transactionId = ethers.id(
      `${Date.now()}-${recipient}-${amount}`
    ).substring(0, 16);

    // Buat payment request ke b402 facilitator
    const facilitatorUrl = process.env.B402_FACILITATOR_URL;
    
    const paymentRequest = {
      transactionId,
      amount,
      recipient,
      purpose: purpose || 'x402 Payment',
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    // Simpan ke database simulasi
    transactions.set(transactionId, paymentRequest);

    // Response dengan payment details
    res.status(200).json({
      success: true,
      message: 'Pembayaran berhasil diinisiasi',
      data: {
        transactionId,
        amount,
        recipient,
        facilitatorUrl,
        paymentUrl: `${facilitatorUrl}/pay/${transactionId}`,
        qrCode: `${facilitatorUrl}/qr/${transactionId}`,
        status: 'pending'
      }
    });

  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({ 
      error: 'Gagal menginisiasi pembayaran',
      details: error.message 
    });
  }
};

// Verifikasi pembayaran
exports.verifyPayment = async (req, res) => {
  try {
    const { transactionId, signature } = req.body;

    if (!transactionId) {
      return res.status(400).json({ 
        error: 'Transaction ID wajib diisi' 
      });
    }

    // Cek transaksi di database
    const transaction = transactions.get(transactionId);

    if (!transaction) {
      return res.status(404).json({ 
        error: 'Transaksi tidak ditemukan' 
      });
    }

    // Simulasi verifikasi pembayaran
    // Di implementasi nyata, ini akan memverifikasi on-chain
    const isValid = signature && signature.length > 0;

    if (isValid) {
      transaction.status = 'completed';
      transaction.signature = signature;
      transaction.completedAt = new Date().toISOString();
      transactions.set(transactionId, transaction);

      return res.status(200).json({
        success: true,
        message: 'Pembayaran berhasil diverifikasi',
        data: transaction
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Verifikasi pembayaran gagal',
        error: 'Signature tidak valid'
      });
    }

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ 
      error: 'Gagal memverifikasi pembayaran',
      details: error.message 
    });
  }
};

// Mendapatkan status pembayaran
exports.getPaymentStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = transactions.get(transactionId);

    if (!transaction) {
      return res.status(404).json({ 
        error: 'Transaksi tidak ditemukan' 
      });
    }

    res.status(200).json({
      success: true,
      data: transaction
    });

  } catch (error) {
    console.error('Error getting payment status:', error);
    res.status(500).json({ 
      error: 'Gagal mendapatkan status pembayaran',
      details: error.message 
    });
  }
};

// Mendapatkan riwayat pembayaran
exports.getPaymentHistory = async (req, res) => {
  try {
    const history = Array.from(transactions.values())
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });

  } catch (error) {
    console.error('Error getting payment history:', error);
    res.status(500).json({ 
      error: 'Gagal mendapatkan riwayat pembayaran',
      details: error.message 
    });
  }
};

