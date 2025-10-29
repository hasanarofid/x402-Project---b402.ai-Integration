# x402 API Documentation

Dokumentasi lengkap untuk API endpoints proyek x402.

## 🌐 Base URL

```
Development: http://localhost:5000
Production: https://api.x402.com
```

## 🔐 Authentication

### Bearer Token
```http
Authorization: Bearer {access_token}
```

### API Key (untuk b402 integration)
```http
X-API-Key: {b402_api_key}
```

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": "Detailed error information"
}
```

### HTTP 402 Payment Required
```json
{
  "statusCode": 402,
  "message": "Payment Required",
  "challenge": {
    "id": "challenge_123",
    "amount": "0.001",
    "token": "BNB",
    "recipient": "0x...",
    "expiresIn": 3600
  }
}
```

## 🏥 Health Check

### GET /health
Check server status.

**Response:**
```json
{
  "status": "OK",
  "message": "x402 Backend Server is running",
  "timestamp": "2025-01-27T10:30:00.000Z"
}
```

## 💳 Payment API

### POST /api/payment/initiate
Inisiasi pembayaran baru.

**Request Body:**
```json
{
  "amount": "0.001",
  "recipient": "0x1234567890123456789012345678901234567890",
  "purpose": "Premium Content Access"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Pembayaran berhasil diinisiasi",
  "data": {
    "transactionId": "tx_abc123",
    "amount": "0.001",
    "recipient": "0x1234567890123456789012345678901234567890",
    "facilitatorUrl": "https://facilitator.b402.ai",
    "paymentUrl": "https://facilitator.b402.ai/pay/tx_abc123",
    "qrCode": "https://facilitator.b402.ai/qr/tx_abc123",
    "status": "pending"
  }
}
```

### POST /api/payment/verify
Verifikasi pembayaran.

**Request Body:**
```json
{
  "transactionId": "tx_abc123",
  "signature": "0x1234567890abcdef..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Pembayaran berhasil diverifikasi",
  "data": {
    "transactionId": "tx_abc123",
    "amount": "0.001",
    "recipient": "0x1234567890123456789012345678901234567890",
    "status": "completed",
    "signature": "0x1234567890abcdef...",
    "completedAt": "2025-01-27T10:35:00.000Z"
  }
}
```

### GET /api/payment/status/:transactionId
Mendapatkan status pembayaran.

**Response:**
```json
{
  "success": true,
  "data": {
    "transactionId": "tx_abc123",
    "amount": "0.001",
    "recipient": "0x1234567890123456789012345678901234567890",
    "status": "completed",
    "timestamp": "2025-01-27T10:30:00.000Z",
    "completedAt": "2025-01-27T10:35:00.000Z"
  }
}
```

### GET /api/payment/history
Mendapatkan riwayat pembayaran.

**Query Parameters:**
- `limit` (optional): Jumlah maksimal transaksi (default: 50)
- `offset` (optional): Offset untuk pagination (default: 0)

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "transactionId": "tx_abc123",
      "amount": "0.001",
      "recipient": "0x1234567890123456789012345678901234567890",
      "status": "completed",
      "timestamp": "2025-01-27T10:30:00.000Z"
    }
  ]
}
```

## 🔒 x402 Protocol API

### GET /api/x402/challenge
Mendapatkan payment challenge (HTTP 402).

**Response:**
```http
HTTP/1.1 402 Payment Required
Content-Type: application/json

{
  "statusCode": 402,
  "message": "Payment Required",
  "challenge": {
    "id": "challenge_123",
    "amount": "0.001",
    "token": "BNB",
    "recipient": "0x1234567890123456789012345678901234567890",
    "facilitator": "https://facilitator.b402.ai",
    "timestamp": "2025-01-27T10:30:00.000Z",
    "expiresIn": 3600
  }
}
```

### POST /api/x402/submit-payment
Submit payment proof untuk mendapatkan access token.

**Request Body:**
```json
{
  "challengeId": "challenge_123",
  "txHash": "0x1234567890abcdef...",
  "signature": "0xabcdef1234567890...",
  "address": "0x1234567890123456789012345678901234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment proof berhasil disubmit",
  "data": {
    "challengeId": "challenge_123",
    "txHash": "0x1234567890abcdef...",
    "signature": "0xabcdef1234567890...",
    "address": "0x1234567890123456789012345678901234567890",
    "timestamp": "2025-01-27T10:30:00.000Z",
    "verified": true
  },
  "accessToken": "access_token_abc123"
}
```

### GET /api/x402/protected-content
Mengakses konten premium (memerlukan access token).

**Headers:**
```http
Authorization: Bearer access_token_abc123
```

**Response:**
```json
{
  "success": true,
  "message": "Akses berhasil",
  "content": {
    "title": "Konten Premium x402",
    "description": "Ini adalah konten yang dilindungi dengan protokol x402",
    "data": {
      "features": [
        "Pembayaran otomatis dengan AI",
        "Multi-chain settlement",
        "Smart contract integration",
        "HTTP 402 Payment Required"
      ],
      "timestamp": "2025-01-27T10:30:00.000Z"
    }
  }
}
```

### GET /api/x402/balance/:address
Mendapatkan balance wallet.

**Response:**
```json
{
  "success": true,
  "data": {
    "address": "0x1234567890123456789012345678901234567890",
    "balance": "1.234",
    "token": "BNB",
    "usdValue": "567.89",
    "lastUpdated": "2025-01-27T10:30:00.000Z"
  }
}
```

## 🚨 Error Codes

### HTTP Status Codes
- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `402` - Payment Required (x402 protocol)
- `404` - Not Found
- `500` - Internal Server Error

### Error Messages
```json
{
  "error": "Amount dan recipient wajib diisi",
  "details": "Validation error: missing required fields"
}
```

## 🔧 Rate Limiting

### Limits
- **Payment API**: 100 requests per minute
- **x402 API**: 50 requests per minute
- **Balance API**: 200 requests per minute

### Headers
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1643280000
```

## 📝 Examples

### cURL Examples

**Health Check:**
```bash
curl http://localhost:5000/health
```

**Initiate Payment:**
```bash
curl -X POST http://localhost:5000/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "amount": "0.001",
    "recipient": "0x1234567890123456789012345678901234567890",
    "purpose": "Premium Content Access"
  }'
```

**Get Payment Challenge:**
```bash
curl http://localhost:5000/api/x402/challenge
```

**Access Protected Content:**
```bash
curl http://localhost:5000/api/x402/protected-content \
  -H "Authorization: Bearer access_token_abc123"
```

### JavaScript Examples

**Initiate Payment:**
```javascript
const response = await fetch('http://localhost:5000/api/payment/initiate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: '0.001',
    recipient: '0x1234567890123456789012345678901234567890',
    purpose: 'Premium Content Access'
  })
});

const data = await response.json();
console.log(data);
```

**Get Balance:**
```javascript
const address = '0x1234567890123456789012345678901234567890';
const response = await fetch(`http://localhost:5000/api/x402/balance/${address}`);
const data = await response.json();
console.log(data);
```

## 🔄 Webhooks

### Payment Completed Webhook
```http
POST /webhooks/payment-completed
Content-Type: application/json

{
  "event": "payment.completed",
  "data": {
    "transactionId": "tx_abc123",
    "amount": "0.001",
    "recipient": "0x1234567890123456789012345678901234567890",
    "timestamp": "2025-01-27T10:35:00.000Z"
  }
}
```

## 📊 Monitoring

### Metrics Endpoints
- `GET /metrics` - Prometheus metrics
- `GET /status` - Detailed server status

### Health Check
```json
{
  "status": "OK",
  "uptime": 3600,
  "memory": {
    "used": "45.2MB",
    "free": "200.8MB"
  },
  "database": "connected",
  "b402_api": "connected"
}
```

---

**API Documentation v1.0 - x402 Project**
