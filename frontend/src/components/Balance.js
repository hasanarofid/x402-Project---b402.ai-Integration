import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Balance.css';

const API_URL = 'http://localhost:5000/api';

function Balance({ walletAddress }) {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(walletAddress || '');

  useEffect(() => {
    if (walletAddress) {
      setAddress(walletAddress);
      fetchBalance(walletAddress);
    }
  }, [walletAddress]);

  const fetchBalance = async (addr) => {
    if (!addr) {
      toast.error('Alamat wallet tidak boleh kosong!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/x402/balance/${addr}`);
      if (response.data.success) {
        setBalance(response.data.data);
        toast.success('Balance berhasil dimuat!');
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
      toast.error('Gagal mengambil balance!');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBalance(address);
  };

  return (
    <div className="balance-container">
      <div className="balance-card">
        <h1 className="balance-title">💰 Cek Balance</h1>
        <p className="balance-subtitle">
          Cek balance wallet Anda di BNB Chain
        </p>

        <form onSubmit={handleSubmit} className="balance-form">
          <div className="form-group">
            <label htmlFor="address">Alamat Wallet</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x..."
              required
            />
          </div>

          <button 
            type="submit" 
            className="check-button"
            disabled={loading}
          >
            {loading ? 'Loading...' : '🔍 Cek Balance'}
          </button>
        </form>

        {balance && (
          <div className="balance-display">
            <div className="balance-main">
              <div className="balance-amount">
                <span className="balance-value">{balance.balance}</span>
                <span className="balance-token">{balance.token}</span>
              </div>
              <div className="balance-usd">
                ≈ ${balance.usdValue} USD
              </div>
            </div>

            <div className="balance-details">
              <div className="detail-item">
                <span className="detail-label">Alamat:</span>
                <code className="detail-value">{balance.address}</code>
              </div>
              <div className="detail-item">
                <span className="detail-label">Network:</span>
                <span className="detail-value">BNB Smart Chain</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Updated:</span>
                <span className="detail-value">
                  {new Date(balance.lastUpdated).toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <div className="balance-actions">
              <button className="action-button primary">
                📤 Send
              </button>
              <button className="action-button secondary">
                📥 Receive
              </button>
              <button 
                className="action-button tertiary"
                onClick={() => fetchBalance(address)}
              >
                🔄 Refresh
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="balance-info">
        <h3>ℹ️ Informasi</h3>
        <ul>
          <li>Balance ditampilkan untuk BNB Chain</li>
          <li>Nilai USD adalah estimasi berdasarkan harga pasar saat ini</li>
          <li>Koneksi ke wallet MetaMask untuk cek balance otomatis</li>
          <li>Support untuk multi-chain akan segera hadir</li>
        </ul>
      </div>

      <div className="wallet-stats">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">Live</div>
            <div className="stat-label">Status</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <div className="stat-value">&lt; 1s</div>
            <div className="stat-label">Response Time</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔒</div>
          <div className="stat-content">
            <div className="stat-value">Secure</div>
            <div className="stat-label">Connection</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Balance;

