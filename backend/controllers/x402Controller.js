const { ethers } = require('ethers');

// Simulasi database untuk payment proofs
const paymentProofs = new Map();

// Mendapatkan konten yang dilindungi
exports.getProtectedContent = async (req, res) => {
  try {
    // Jika sampai sini, berarti payment sudah terverifikasi
    res.status(200).json({
      success: true,
      message: 'Akses berhasil',
      content: {
        title: 'Konten Premium x402',
        description: 'Ini adalah konten yang dilindungi dengan protokol x402',
        data: {
          features: [
            'Pembayaran otomatis dengan AI',
            'Multi-chain settlement',
            'Smart contract integration',
            'HTTP 402 Payment Required'
          ],
          timestamp: new Date().toISOString()
        }
      }
    });
  } catch (error) {
    console.error('Error getting protected content:', error);
    res.status(500).json({ 
      error: 'Gagal mendapatkan konten',
      details: error.message 
    });
  }
};

// Mendapatkan payment challenge
exports.getPaymentChallenge = async (req, res) => {
  try {
    // Generate challenge untuk payment
    const challenge = ethers.id(`challenge-${Date.now()}`);
    const amount = process.env.PAYMENT_AMOUNT || '0.001';
    const recipient = process.env.RECIPIENT_ADDRESS || '0x0000000000000000000000000000000000000000';

    res.status(402).json({
      statusCode: 402,
      message: 'Payment Required',
      challenge: {
        id: challenge.substring(0, 16),
        amount,
        token: process.env.PAYMENT_TOKEN || 'BNB',
        recipient,
        facilitator: process.env.B402_FACILITATOR_URL,
        timestamp: new Date().toISOString(),
        expiresIn: 3600 // 1 jam
      }
    });
  } catch (error) {
    console.error('Error generating challenge:', error);
    res.status(500).json({ 
      error: 'Gagal membuat challenge',
      details: error.message 
    });
  }
};

// Submit payment proof
exports.submitPaymentProof = async (req, res) => {
  try {
    const { challengeId, txHash, signature, address } = req.body;

    if (!challengeId || !txHash) {
      return res.status(400).json({ 
        error: 'Challenge ID dan transaction hash wajib diisi' 
      });
    }

    // Simpan payment proof
    const proof = {
      challengeId,
      txHash,
      signature,
      address,
      timestamp: new Date().toISOString(),
      verified: true // Dalam implementasi nyata, verify on-chain
    };

    paymentProofs.set(challengeId, proof);

    res.status(200).json({
      success: true,
      message: 'Payment proof berhasil disubmit',
      data: proof,
      accessToken: ethers.id(`token-${challengeId}`).substring(0, 32)
    });

  } catch (error) {
    console.error('Error submitting payment proof:', error);
    res.status(500).json({ 
      error: 'Gagal submit payment proof',
      details: error.message 
    });
  }
};

// Mendapatkan balance
exports.getBalance = async (req, res) => {
  try {
    const { address } = req.params;

    if (!address) {
      return res.status(400).json({ 
        error: 'Address wajib diisi' 
      });
    }

    // Simulasi get balance
    // Dalam implementasi nyata, query dari blockchain
    const balance = {
      address,
      balance: '1.234',
      token: 'BNB',
      usdValue: '567.89',
      lastUpdated: new Date().toISOString()
    };

    res.status(200).json({
      success: true,
      data: balance
    });

  } catch (error) {
    console.error('Error getting balance:', error);
    res.status(500).json({ 
      error: 'Gagal mendapatkan balance',
      details: error.message 
    });
  }
};

