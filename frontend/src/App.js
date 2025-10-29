import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Import komponen
import Home from './components/Home';
import Payment from './components/Payment';
import ProtectedContent from './components/ProtectedContent';
import PaymentHistory from './components/PaymentHistory';
import Balance from './components/Balance';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Harap install MetaMask atau wallet Web3 lainnya!');
    }
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              <span className="logo-icon">⚡</span>
              x402 App
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/payment" className="nav-link">Payment</Link>
              </li>
              <li className="nav-item">
                <Link to="/protected" className="nav-link">Premium Content</Link>
              </li>
              <li className="nav-item">
                <Link to="/history" className="nav-link">History</Link>
              </li>
              <li className="nav-item">
                <Link to="/balance" className="nav-link">Balance</Link>
              </li>
            </ul>
            <button 
              onClick={connectWallet} 
              className={`connect-button ${isConnected ? 'connected' : ''}`}
            >
              {isConnected 
                ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}` 
                : 'Connect Wallet'}
            </button>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/protected" element={<ProtectedContent />} />
            <Route path="/history" element={<PaymentHistory />} />
            <Route path="/balance" element={<Balance walletAddress={walletAddress} />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2025 x402 App - Powered by b402.ai</p>
        </footer>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;

