// Middleware untuk memeriksa payment x402
exports.requirePayment = async (req, res, next) => {
  try {
    // Cek authorization header
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken) {
      // Jika tidak ada token, return 402 Payment Required
      return res.status(402).json({
        statusCode: 402,
        message: 'Payment Required',
        error: 'Pembayaran diperlukan untuk mengakses konten ini',
        paymentInfo: {
          amount: process.env.PAYMENT_AMOUNT || '0.001',
          token: process.env.PAYMENT_TOKEN || 'BNB',
          facilitator: process.env.B402_FACILITATOR_URL,
          getChallengeEndpoint: '/api/x402/challenge'
        }
      });
    }

    // Verifikasi token
    // Dalam implementasi nyata, verifikasi dengan blockchain
    const isValid = accessToken.length > 20;

    if (!isValid) {
      return res.status(401).json({
        error: 'Token tidak valid',
        message: 'Access token yang diberikan tidak valid atau sudah expired'
      });
    }

    // Token valid, lanjutkan ke handler
    next();

  } catch (error) {
    console.error('Error in x402 middleware:', error);
    res.status(500).json({ 
      error: 'Gagal memverifikasi payment',
      details: error.message 
    });
  }
};

// Middleware untuk logging
exports.logRequest = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
};

