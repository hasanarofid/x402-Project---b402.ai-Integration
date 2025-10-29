import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './PaymentHistory.css';

const API_URL = 'http://localhost:5000/api';

function PaymentHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/payment/history`);
      if (response.data.success) {
        setHistory(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
      toast.error('Gagal mengambil riwayat pembayaran!');
    } finally {
      setLoading(false);
    }
  };

  const viewDetails = (tx) => {
    setSelectedTx(tx);
  };

  const closeModal = () => {
    setSelectedTx(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('id-ID');
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <h1 className="history-title">📊 Riwayat Pembayaran</h1>
        <button onClick={fetchHistory} className="refresh-button" disabled={loading}>
          {loading ? '🔄 Loading...' : '🔄 Refresh'}
        </button>
      </div>

      {loading && history.length === 0 ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Memuat riwayat pembayaran...</p>
        </div>
      ) : history.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h2>Belum Ada Riwayat</h2>
          <p>Anda belum melakukan pembayaran apapun</p>
        </div>
      ) : (
        <div className="history-grid">
          {history.map((tx) => (
            <div key={tx.transactionId} className="history-card">
              <div className="card-header">
                <span className={`status-badge ${tx.status}`}>
                  {tx.status === 'completed' ? '✓' : '⏳'} {tx.status}
                </span>
                <span className="card-date">{formatDate(tx.timestamp)}</span>
              </div>
              
              <div className="card-body">
                <div className="card-info">
                  <span className="info-label">Transaction ID</span>
                  <code className="info-value">{tx.transactionId}</code>
                </div>
                
                <div className="card-info">
                  <span className="info-label">Amount</span>
                  <span className="info-value amount">{tx.amount} BNB</span>
                </div>
                
                <div className="card-info">
                  <span className="info-label">Recipient</span>
                  <code className="info-value truncate">{tx.recipient}</code>
                </div>
                
                {tx.purpose && (
                  <div className="card-info">
                    <span className="info-label">Purpose</span>
                    <span className="info-value">{tx.purpose}</span>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => viewDetails(tx)} 
                className="details-button"
              >
                View Details →
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedTx && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📋 Detail Transaksi</h2>
              <button onClick={closeModal} className="close-button">✕</button>
            </div>
            
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Transaction ID:</span>
                <code className="detail-value">{selectedTx.transactionId}</code>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`status-badge ${selectedTx.status}`}>
                  {selectedTx.status}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Amount:</span>
                <span className="detail-value amount">{selectedTx.amount} BNB</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Recipient:</span>
                <code className="detail-value">{selectedTx.recipient}</code>
              </div>
              
              {selectedTx.purpose && (
                <div className="detail-row">
                  <span className="detail-label">Purpose:</span>
                  <span className="detail-value">{selectedTx.purpose}</span>
                </div>
              )}
              
              <div className="detail-row">
                <span className="detail-label">Created At:</span>
                <span className="detail-value">{formatDate(selectedTx.timestamp)}</span>
              </div>
              
              {selectedTx.completedAt && (
                <div className="detail-row">
                  <span className="detail-label">Completed At:</span>
                  <span className="detail-value">{formatDate(selectedTx.completedAt)}</span>
                </div>
              )}
              
              {selectedTx.signature && (
                <div className="detail-row">
                  <span className="detail-label">Signature:</span>
                  <code className="detail-value signature">{selectedTx.signature}</code>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentHistory;

