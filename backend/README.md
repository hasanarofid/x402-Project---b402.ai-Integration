# x402 Backend API

Backend API untuk proyek x402 dengan integrasi b402.ai dan protokol pembayaran HTTP 402.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env dengan konfigurasi Anda

# Run development server
npm run dev

# Run production server
npm start
```

## 📁 Struktur Project

```
backend/
├── controllers/         # Business logic
│   ├── paymentController.js
│   └── x402Controller.js
├── middleware/          # Custom middleware
│   └── x402Middleware.js
├── routes/             # API routes
│   ├── payment.js
│   └── x402.js
├── server.js           # Main server file
├── package.json        # Dependencies
└── .env.example        # Environment template
```

## 🔧 API Endpoints

### Health Check
- `GET /health` - Server status

### Payment API
- `POST /api/payment/initiate` - Inisiasi pembayaran
- `POST /api/payment/verify` - Verifikasi pembayaran
- `GET /api/payment/status/:id` - Status pembayaran
- `GET /api/payment/history` - Riwayat pembayaran

### x402 API
- `GET /api/x402/challenge` - Payment challenge (HTTP 402)
- `POST /api/x402/submit-payment` - Submit payment proof
- `GET /api/x402/protected-content` - Konten premium
- `GET /api/x402/balance/:address` - Cek balance

## ⚙️ Environment Variables

```env
PORT=5000
NODE_ENV=development
B402_API_URL=https://www.b402.ai/api
B402_FACILITATOR_URL=https://facilitator.b402.ai
B402_API_KEY=your_api_key
CHAIN_ID=56
RPC_URL=https://bsc-dataseed.binance.org/
PRIVATE_KEY=your_private_key
PAYMENT_AMOUNT=0.001
PAYMENT_TOKEN=BNB
```

## 🧪 Testing

```bash
# Test dengan curl
curl http://localhost:5000/health

# Test payment initiation
curl -X POST http://localhost:5000/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{"amount":"0.001","recipient":"0x123..."}'
```

## 📦 Dependencies

- **express** - Web framework
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **axios** - HTTP client
- **ethers** - Blockchain interaction
- **body-parser** - Request parsing
