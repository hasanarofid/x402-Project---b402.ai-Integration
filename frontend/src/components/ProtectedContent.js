import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ProtectedContent.css';

const API_URL = 'http://localhost:5000/api';

function ProtectedContent() {
  const [accessToken, setAccessToken] = useState('');
  const [content, setContent] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(false);

  const getChallenge = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/x402/challenge`);
      setChallenge(response.data.challenge);
      toast.info('Payment challenge diterima!');
    } catch (error) {
      console.error('Error getting challenge:', error);
      toast.error('Gagal mendapatkan challenge!');
    } finally {
      setLoading(false);
    }
  };

  const submitPayment = async () => {
    if (!challenge) {
      toast.error('Dapatkan challenge terlebih dahulu!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/x402/submit-payment`, {
        challengeId: challenge.id,
        txHash: '0x' + Math.random().toString(16).substring(2),
        signature: 'mock-signature-' + Date.now(),
        address: '0x1234567890123456789012345678901234567890'
      });

      if (response.data.success) {
        setAccessToken(response.data.accessToken);
        toast.success('Payment berhasil disubmit!');
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      toast.error('Gagal submit payment!');
    } finally {
      setLoading(false);
    }
  };

  const getProtectedContent = async () => {
    if (!accessToken) {
      toast.error('Access token diperlukan!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/x402/protected-content`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.data.success) {
        setContent(response.data.content);
        toast.success('Konten berhasil diakses!');
      }
    } catch (error) {
      if (error.response?.status === 402) {
        toast.error('Pembayaran diperlukan untuk mengakses konten!');
      } else {
        toast.error('Gagal mengakses konten!');
      }
      console.error('Error getting content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="protected-container">
      <div className="protected-card">
        <h1 className="protected-title">🔒 Konten Premium</h1>
        <p className="protected-subtitle">
          Konten ini dilindungi dengan protokol x402. Lakukan pembayaran untuk mengakses.
        </p>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Dapatkan Payment Challenge</h3>
              <p>Klik tombol untuk mendapatkan payment challenge</p>
              <button 
                onClick={getChallenge} 
                className="step-button"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Get Challenge'}
              </button>
            </div>
          </div>

          {challenge && (
            <div className="challenge-info">
              <h3>💰 Payment Details</h3>
              <div className="challenge-item">
                <span>Challenge ID:</span>
                <code>{challenge.id}</code>
              </div>
              <div className="challenge-item">
                <span>Amount:</span>
                <code>{challenge.amount} {challenge.token}</code>
              </div>
              <div className="challenge-item">
                <span>Recipient:</span>
                <code className="truncate">{challenge.recipient}</code>
              </div>
              <div className="challenge-item">
                <span>Expires In:</span>
                <code>{challenge.expiresIn}s</code>
              </div>
            </div>
          )}

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Submit Payment Proof</h3>
              <p>Submit payment proof untuk mendapatkan access token</p>
              <button 
                onClick={submitPayment} 
                className="step-button"
                disabled={!challenge || loading}
              >
                {loading ? 'Submitting...' : 'Submit Payment'}
              </button>
            </div>
          </div>

          {accessToken && (
            <div className="token-info">
              <h3>🔑 Access Token</h3>
              <code className="token-code">{accessToken}</code>
              <p className="token-note">
                Token ini digunakan untuk mengakses konten premium
              </p>
            </div>
          )}

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Akses Konten Premium</h3>
              <p>Gunakan access token untuk mengakses konten</p>
              <button 
                onClick={getProtectedContent} 
                className="step-button primary"
                disabled={!accessToken || loading}
              >
                {loading ? 'Loading...' : 'Access Content'}
              </button>
            </div>
          </div>
        </div>

        {content && (
          <div className="content-display">
            <h2>✨ {content.title}</h2>
            <p className="content-description">{content.description}</p>
            <div className="content-data">
              <h3>Features:</h3>
              <ul>
                {content.data.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <p className="content-timestamp">
                Timestamp: {content.data.timestamp}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="x402-info">
        <h3>📘 Tentang HTTP 402</h3>
        <p>
          HTTP 402 "Payment Required" adalah status code yang dicadangkan untuk 
          sistem pembayaran digital di masa depan. Protokol x402 mengimplementasikan 
          standar ini untuk memungkinkan pembayaran otomatis pada web.
        </p>
      </div>
    </div>
  );
}

export default ProtectedContent;

