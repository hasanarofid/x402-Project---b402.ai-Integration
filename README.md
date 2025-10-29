# x402 Project - b402.ai Integration
# by @hasanarofid
![x402 Logo](https://img.shields.io/badge/x402-Protocol-blue)
![b402.ai](https://img.shields.io/badge/b402.ai-Backend-green)
![Facilitator](https://img.shields.io/badge/Facilitator-Frontend-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📖 Deskripsi

Proyek x402 adalah implementasi lengkap protokol pembayaran internet native yang dibangun dengan teknologi b402.ai dan facilitator.b402.ai. Aplikasi ini memungkinkan AI agents, websites, dan aplikasi untuk mengirim dan menerima pembayaran secara otomatis tanpa intervensi manusia.

## 🚀 Fitur Utama

- **🤖 AI-Powered Payments** - Pembayaran otomatis yang dikelola oleh AI agents
- **⛓️ Multi-Chain Settlement** - Dukungan untuk berbagai blockchain networks
- **🔒 Smart Contract Security** - Keamanan tingkat tinggi dengan smart contracts
- **⚡ HTTP 402 Protocol** - Implementasi standar HTTP 402 Payment Required
- **💳 Real-time Payment Processing** - Proses pembayaran real-time dengan verifikasi otomatis
- **📊 Payment History** - Riwayat pembayaran lengkap dengan detail transaksi
- **💰 Balance Checking** - Cek balance wallet multi-chain
- **🔐 Protected Content** - Konten premium dengan sistem pembayaran x402

## 🏗️ Arsitektur

```
crypto/
├── backend/                 # Backend API (Express.js)
│   ├── controllers/         # Business logic
│   ├── middleware/          # Custom middleware
│   ├── routes/             # API routes
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── frontend/               # Frontend App (React.js)
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js          # Main app component
│   │   └── index.js        # Entry point
│   └── package.json        # Frontend dependencies
└── package.json            # Root package.json
```

## 🛠️ Teknologi yang Digunakan

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Ethers.js** - Blockchain interaction
- **Axios** - HTTP client
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Ethers.js** - Web3 integration
- **React Toastify** - Notifications
- **CSS3** - Styling dengan gradient dan animations

### Blockchain & Payment
- **b402.ai** - Backend API untuk protokol x402
- **facilitator.b402.ai** - Frontend interface untuk pembayaran
- **BNB Chain** - Primary blockchain network
- **HTTP 402** - Payment Required status code

## 📦 Instalasi

### Prerequisites
- Node.js (v16 atau lebih baru)
- npm atau yarn
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd crypto
```

### 2. Install Dependencies
```bash
# Install semua dependencies (backend + frontend)
npm run install:all

# Atau install secara terpisah
cd backend && npm install
cd ../frontend && npm install
```

### 3. Setup Environment Variables
```bash
# Copy file environment example
cp backend/.env.example backend/.env

# Edit file .env dengan konfigurasi Anda
nano backend/.env
```

### 4. Konfigurasi Environment
Edit file `backend/.env`:
```env
PORT=5000
NODE_ENV=development

# b402 Configuration
B402_API_URL=https://www.b402.ai/api
B402_FACILITATOR_URL=https://facilitator.b402.ai
B402_API_KEY=your_api_key_here

# Blockchain Configuration
CHAIN_ID=56
RPC_URL=https://bsc-dataseed.binance.org/
PRIVATE_KEY=your_private_key_here

# Payment Configuration
PAYMENT_AMOUNT=0.001
PAYMENT_TOKEN=BNB
```

## 🚀 Menjalankan Aplikasi

### Development Mode
```bash
# Menjalankan backend dan frontend bersamaan
npm run dev

# Atau menjalankan secara terpisah
npm run dev:backend    # Backend di port 5000
npm run dev:frontend   # Frontend di port 3000
```

### Production Mode
```bash
# Build frontend
npm run build:frontend

# Start backend
npm run start:backend
```

## 📚 API Documentation

### Backend Endpoints

#### Health Check
```http
GET /health
```
Response:
```json
{
  "status": "OK",
  "message": "x402 Backend Server is running",
  "timestamp": "2025-01-27T10:30:00.000Z"
}
```

#### Payment Endpoints

**Inisiasi Pembayaran**
```http
POST /api/payment/initiate
Content-Type: application/json

{
  "amount": "0.001",
  "recipient": "0x...",
  "purpose": "Premium Content Access"
}
```

**Verifikasi Pembayaran**
```http
POST /api/payment/verify
Content-Type: application/json

{
  "transactionId": "tx_123456789",
  "signature": "0x..."
}
```

**Status Pembayaran**
```http
GET /api/payment/status/{transactionId}
```

**Riwayat Pembayaran**
```http
GET /api/payment/history
```

#### x402 Endpoints

**Payment Challenge**
```http
GET /api/x402/challenge
```
Response: HTTP 402 dengan payment details

**Submit Payment Proof**
```http
POST /api/x402/submit-payment
Content-Type: application/json

{
  "challengeId": "challenge_123",
  "txHash": "0x...",
  "signature": "0x...",
  "address": "0x..."
}
```

**Protected Content**
```http
GET /api/x402/protected-content
Authorization: Bearer {access_token}
```

**Balance Check**
```http
GET /api/x402/balance/{address}
```

## 🎯 Penggunaan

### 1. Membuat Pembayaran
1. Buka halaman "Payment"
2. Masukkan amount, recipient address, dan purpose
3. Klik "Inisiasi Pembayaran"
4. Ikuti instruksi untuk menyelesaikan pembayaran
5. Verifikasi pembayaran setelah selesai

### 2. Mengakses Konten Premium
1. Buka halaman "Premium Content"
2. Klik "Get Challenge" untuk mendapatkan payment challenge
3. Submit payment proof dengan transaction hash
4. Gunakan access token untuk mengakses konten

### 3. Cek Balance
1. Buka halaman "Balance"
2. Masukkan wallet address
3. Klik "Cek Balance" untuk melihat balance BNB

### 4. Lihat Riwayat
1. Buka halaman "History"
2. Lihat semua transaksi yang telah dilakukan
3. Klik "View Details" untuk detail lengkap

## 🔧 Konfigurasi

### Backend Configuration
- **Port**: 5000 (default)
- **CORS**: Enabled untuk frontend
- **Logging**: Console logging enabled
- **Error Handling**: Global error handler

### Frontend Configuration
- **Port**: 3000 (default)
- **API Base URL**: http://localhost:5000/api
- **Web3**: MetaMask integration
- **Notifications**: Toast notifications

## 🧪 Testing

### Manual Testing
1. Pastikan backend dan frontend berjalan
2. Test semua endpoint menggunakan Postman atau curl
3. Test UI flow di browser
4. Test wallet connection dengan MetaMask

### API Testing
```bash
# Test health endpoint
curl http://localhost:5000/health

# Test payment initiation
curl -X POST http://localhost:5000/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{"amount":"0.001","recipient":"0x123..."}'
```

## 🚀 Deployment

### Backend Deployment
1. Set environment variables di production
2. Install dependencies: `npm install --production`
3. Start server: `npm start`
4. Gunakan PM2 untuk process management

### Frontend Deployment
1. Build aplikasi: `npm run build`
2. Deploy folder `build/` ke static hosting
3. Konfigurasi environment variables untuk production API

### Docker Deployment
```dockerfile
# Backend Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork repository
2. Buat feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push ke branch: `git push origin feature/amazing-feature`
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🔗 Links

- **b402.ai**: https://www.b402.ai
- **Facilitator**: https://facilitator.b402.ai
- **x402 Documentation**: https://docs.b402.ai
- **BNB Chain**: https://www.bnbchain.org

## 📞 Support

Jika Anda mengalami masalah atau memiliki pertanyaan:

1. Cek [Issues](../../issues) untuk masalah yang sudah dilaporkan
2. Buat issue baru jika masalah belum ada
3. Hubungi tim development

## 🙏 Acknowledgments

- b402.ai team untuk protokol x402
- BNB Chain untuk blockchain infrastructure
- React team untuk framework yang luar biasa
- Express.js team untuk backend framework

---

**Dibuat dengan ❤️ untuk ekosistem blockchain dan AI**

```bash
# Copy environment files
cp backend/env.development backend/.env
cp frontend/env.development frontend/.env

# Install dependencies

npm run install:all

# Start development
npm run dev
```


```bash
# Copy environment files
cp backend/env.production backend/.env
cp frontend/env.production frontend/.env

# Install dependencies
npm run install:all

# Build and start
npm run build:frontend
npm run start:backend
```