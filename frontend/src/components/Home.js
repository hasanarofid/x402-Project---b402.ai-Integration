import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">
          Selamat Datang di <span className="highlight">x402</span>
        </h1>
        <p className="hero-subtitle">
          Protokol Pembayaran Internet Native untuk AI & Blockchain
        </p>
        <p className="hero-description">
          x402 adalah protokol pembayaran terbuka yang memungkinkan AI agents, 
          websites, dan aplikasi untuk mengirim dan menerima pembayaran secara 
          otomatis tanpa intervensi manusia.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🤖</div>
          <h3>AI-Powered Payments</h3>
          <p>Pembayaran otomatis yang dikelola oleh AI agents</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⛓️</div>
          <h3>Multi-Chain Settlement</h3>
          <p>Dukungan untuk berbagai blockchain networks</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Smart Contract Security</h3>
          <p>Keamanan tingkat tinggi dengan smart contracts</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>HTTP 402 Protocol</h3>
          <p>Implementasi standar HTTP 402 Payment Required</p>
        </div>
      </div>

      <div className="info-section">
        <h2>Tentang b402.ai & Facilitator</h2>
        <div className="info-cards">
          <div className="info-card">
            <h3>🌐 b402.ai</h3>
            <p>
              Backend API yang menyediakan infrastruktur untuk protokol x402,
              dengan dukungan untuk BNB Chain dan berbagai blockchain lainnya.
            </p>
            <a 
              href="https://www.b402.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="info-link"
            >
              Kunjungi b402.ai →
            </a>
          </div>

          <div className="info-card">
            <h3>🚀 Facilitator</h3>
            <p>
              Frontend interface yang mempermudah integrasi dan interaksi
              dengan protokol x402 untuk pembayaran yang seamless.
            </p>
            <a 
              href="https://facilitator.b402.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="info-link"
            >
              Kunjungi Facilitator →
            </a>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Siap Memulai?</h2>
        <p>Mulai gunakan x402 untuk aplikasi Anda hari ini</p>
        <div className="cta-buttons">
          <button className="cta-button primary">
            Buat Pembayaran
          </button>
          <button className="cta-button secondary">
            Lihat Dokumentasi
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

