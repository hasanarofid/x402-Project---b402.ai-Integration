# x402 Frontend App

Frontend React application untuk proyek x402 dengan integrasi b402.ai dan facilitator.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 📁 Struktur Project

```
frontend/
├── public/             # Static files
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/     # React components
│   │   ├── Home.js
│   │   ├── Payment.js
│   │   ├── ProtectedContent.js
│   │   ├── PaymentHistory.js
│   │   └── Balance.js
│   ├── App.js          # Main app component
│   ├── App.css         # Main styles
│   ├── index.js        # Entry point
│   └── index.css       # Global styles
├── package.json        # Dependencies
└── .gitignore
```

## 🎨 Komponen

### Home
Landing page dengan informasi tentang x402 dan fitur-fitur utama.

### Payment
Form untuk membuat pembayaran menggunakan protokol x402.

### ProtectedContent
Implementasi HTTP 402 untuk konten premium yang memerlukan pembayaran.

### PaymentHistory
Menampilkan riwayat pembayaran dengan detail transaksi.

### Balance
Cek balance wallet di BNB Chain.

## 🔧 Konfigurasi

### API Configuration
```javascript
const API_URL = 'http://localhost:5000/api';
```

### Web3 Integration
- MetaMask wallet connection
- BNB Chain support
- Ethers.js integration

## 🎯 Features

- **Responsive Design** - Mobile-friendly interface
- **Real-time Updates** - Live payment status
- **Web3 Integration** - Wallet connection
- **Toast Notifications** - User feedback
- **Modern UI** - Gradient backgrounds dan animations

## 🧪 Testing

```bash
# Run tests
npm test

# Test di browser
# Buka http://localhost:3000
```

## 📦 Dependencies

- **react** - UI library
- **react-dom** - DOM rendering
- **react-router-dom** - Client-side routing
- **axios** - HTTP client
- **ethers** - Web3 integration
- **react-toastify** - Notifications

## 🚀 Deployment

```bash
# Build production
npm run build

# Deploy folder build/ ke static hosting
```

## 🎨 Styling

- CSS3 dengan gradient backgrounds
- Responsive design
- Smooth animations
- Modern glassmorphism effects
