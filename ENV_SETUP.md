# Environment Configuration Guide - x402 Project

Panduan lengkap untuk konfigurasi environment variables pada proyek x402.

## 📁 File Environment

### Backend
- `backend/env.development` - Konfigurasi development
- `backend/env.production` - Konfigurasi production
- `backend/.env.example` - Template konfigurasi

### Frontend
- `frontend/env.development` - Konfigurasi development
- `frontend/env.production` - Konfigurasi production
- `frontend/.env.example` - Template konfigurasi

## 🚀 Quick Setup

### 1. Development Environment
```bash
# Copy environment files
cp backend/env.development backend/.env
cp frontend/env.development frontend/.env

# Install dependencies
npm run install:all

# Start development servers
npm run dev
```

### 2. Production Environment
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

### 3. Using Setup Script
```bash
# Development setup
./scripts/setup-env.sh development

# Production setup
./scripts/setup-env.sh production
```

## 🔧 Backend Configuration

### Server Configuration
```env
PORT=5000                    # Server port
NODE_ENV=development         # Environment mode
HOST=localhost              # Server host
```

### b402.ai Integration
```env
B402_API_URL=https://www.b402.ai/api
B402_FACILITATOR_URL=https://facilitator.b402.ai
B402_API_KEY=your_api_key_here
B402_WEBHOOK_SECRET=your_webhook_secret
```

### Blockchain Configuration
```env
# Development (Testnet)
CHAIN_ID=97
RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545/

# Production (Mainnet)
CHAIN_ID=56
RPC_URL=https://bsc-dataseed.binance.org/
```

### Database Configuration
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=x402_db
DB_USER=x402_user
DB_PASSWORD=your_password
DB_URL=postgresql://user:password@localhost:5432/x402_db
```

### Security Configuration
```env
JWT_SECRET=your_jwt_secret_key
BCRYPT_ROUNDS=10
SESSION_SECRET=your_session_secret
```

## 🎨 Frontend Configuration

### API Configuration
```env
# Development
REACT_APP_API_URL=http://localhost:5000/api

# Production
REACT_APP_API_URL=https://api.x402.com/api
```

### Blockchain Configuration
```env
# Development (Testnet)
REACT_APP_CHAIN_ID=97
REACT_APP_RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545/

# Production (Mainnet)
REACT_APP_CHAIN_ID=56
REACT_APP_RPC_URL=https://bsc-dataseed.binance.org/
```

### UI Configuration
```env
REACT_APP_THEME=light
REACT_APP_LANGUAGE=id
REACT_APP_CURRENCY=USD
REACT_APP_TIMEZONE=Asia/Jakarta
```

### Feature Flags
```env
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_DEBUG=true
REACT_APP_ENABLE_MOCK_DATA=true
```

## 🔐 Security Best Practices

### 1. Environment Variables
- Jangan commit file `.env` ke repository
- Gunakan `.env.example` sebagai template
- Rotate API keys secara berkala
- Gunakan secret management untuk production

### 2. API Keys
```env
# Development - Gunakan test keys
B402_API_KEY=test_api_key_123
PRIVATE_KEY=0x1234567890abcdef...

# Production - Gunakan production keys
B402_API_KEY=prod_api_key_987
PRIVATE_KEY=0x9876543210fedcba...
```

### 3. Database Security
```env
# Development
DB_PASSWORD=dev_password_123

# Production - Gunakan password yang kuat
DB_PASSWORD=prod_secure_password_987
```

## 🌍 Environment-Specific Settings

### Development
- Debug mode enabled
- Mock data enabled
- Detailed logging
- Testnet blockchain
- Local database

### Production
- Debug mode disabled
- Real data only
- Minimal logging
- Mainnet blockchain
- Production database

## 📊 Monitoring Configuration

### Logging
```env
# Development
LOG_LEVEL=debug
LOG_FILE=logs/dev.log

# Production
LOG_LEVEL=info
LOG_FILE=logs/prod.log
```

### Metrics
```env
ENABLE_METRICS=true
METRICS_PORT=9090
```

### External Services
```env
# Analytics
REACT_APP_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
REACT_APP_SENTRY_DSN=https://sentry.io/project/x402

# Monitoring
REACT_APP_HOTJAR_ID=1234567
```

## 🚨 Troubleshooting

### Common Issues

1. **Environment file not found**
   ```bash
   # Check if .env exists
   ls -la backend/.env
   ls -la frontend/.env
   ```

2. **API connection failed**
   ```bash
   # Check API URL
   echo $REACT_APP_API_URL
   ```

3. **Database connection failed**
   ```bash
   # Check database configuration
   echo $DB_URL
   ```

4. **Blockchain connection failed**
   ```bash
   # Check RPC URL
   echo $RPC_URL
   ```

### Debug Commands
```bash
# Check environment variables
printenv | grep B402
printenv | grep REACT_APP

# Test API connection
curl $REACT_APP_API_URL/health

# Test database connection
psql $DB_URL -c "SELECT 1;"
```

## 📋 Environment Checklist

### Development Setup
- [ ] Environment files copied
- [ ] API keys configured
- [ ] Database connected
- [ ] Blockchain network set
- [ ] CORS configured
- [ ] Logging enabled

### Production Setup
- [ ] Environment files copied
- [ ] Production API keys
- [ ] Production database
- [ ] Mainnet blockchain
- [ ] SSL configured
- [ ] Monitoring enabled
- [ ] Security headers set

## 🔄 Environment Switching

### Switch to Development
```bash
cp backend/env.development backend/.env
cp frontend/env.development frontend/.env
npm run dev
```

### Switch to Production
```bash
cp backend/env.production backend/.env
cp frontend/env.production frontend/.env
npm run build:frontend
npm run start:backend
```

## 📚 Additional Resources

- [Node.js Environment Variables](https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs)
- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [Docker Environment Variables](https://docs.docker.com/compose/environment-variables/)
- [Kubernetes ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/)

---

**Environment Configuration v1.0 - x402 Project**
