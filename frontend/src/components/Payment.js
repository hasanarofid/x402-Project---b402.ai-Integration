import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Payment.css';

const API_URL = 'http://localhost:5000/api';

function Payment() {
  const [formData, setFormData] = useState({
    amount: '',
    recipient: '',
    purpose: ''
  });
  const [loading, setLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.recipient) {
      toast.error('Amount dan recipient wajib diisi!');
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/payment/initiate`, formData);
      
      if (response.data.success) {
        setPaymentResult(response.data.data);
        toast.success('Pembayaran berhasil diinisiasi!');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Gagal menginisiasi pembayaran!');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPayment = async () => {
    if (!paymentResult?.transactionId) return;

    setLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/payment/verify`, {
        transactionId: paymentResult.transactionId,
        signature: 'mock-signature-' + Date.now()
      });
      
      if (response.data.success) {
        toast.success('Pembayaran berhasil diverifikasi!');
        setPaymentResult(response.data.data);
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      toast.error('Gagal memverifikasi pembayaran!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h1 className="payment-title">💳 Buat Pembayaran x402</h1>
        <p className="payment-subtitle">
          Gunakan protokol x402 untuk melakukan pembayaran
        </p>

        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="amount">Jumlah (BNB)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              step="0.001"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.001"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="recipient">Alamat Penerima</label>
            <input
              type="text"
              id="recipient"
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
              placeholder="0x..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="purpose">Tujuan Pembayaran (Opsional)</label>
            <input
              type="text"
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              placeholder="Contoh: Premium Content Access"
            />
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Inisiasi Pembayaran'}
          </button>
        </form>

        {paymentResult && (
          <div className="payment-result">
            <h2>📋 Detail Pembayaran</h2>
            <div className="result-item">
              <span className="result-label">Transaction ID:</span>
              <span className="result-value">{paymentResult.transactionId}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Amount:</span>
              <span className="result-value">{paymentResult.amount} BNB</span>
            </div>
            <div className="result-item">
              <span className="result-label">Recipient:</span>
              <span className="result-value truncate">{paymentResult.recipient}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Status:</span>
              <span className={`status-badge ${paymentResult.status}`}>
                {paymentResult.status}
              </span>
            </div>
            <div className="result-item">
              <span className="result-label">Payment URL:</span>
              <a 
                href={paymentResult.paymentUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="payment-link"
              >
                {paymentResult.paymentUrl}
              </a>
            </div>

            {paymentResult.status === 'pending' && (
              <button 
                onClick={handleVerifyPayment}
                className="verify-button"
                disabled={loading}
              >
                {loading ? 'Memverifikasi...' : 'Verifikasi Pembayaran'}
              </button>
            )}
          </div>
        )}
      </div>

      <div className="info-box">
        <h3>ℹ️ Informasi</h3>
        <ul>
          <li>Gunakan BNB Chain untuk transaksi</li>
          <li>Minimum pembayaran: 0.001 BNB</li>
          <li>Payment akan diproses melalui b402 Facilitator</li>
          <li>Verifikasi otomatis melalui smart contract</li>
        </ul>
      </div>
    </div>
  );
}

export default Payment;

