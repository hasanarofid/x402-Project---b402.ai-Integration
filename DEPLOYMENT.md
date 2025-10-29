# Deployment Guide - x402 Project

Panduan lengkap untuk deployment proyek x402 ke berbagai platform.

## 🚀 Platform Deployment

### 1. Vercel (Frontend)

#### Setup
```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy frontend
cd frontend
vercel --prod
```

#### Konfigurasi
1. Set environment variables di Vercel dashboard
2. Update API URL ke production backend
3. Configure custom domain (opsional)

### 2. Railway (Backend)

#### Setup
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login ke Railway
railway login

# Deploy backend
cd backend
railway up
```

#### Konfigurasi
1. Set environment variables di Railway dashboard
2. Configure database (jika diperlukan)
3. Set production port

### 3. Heroku (Full Stack)

#### Backend
```bash
# Install Heroku CLI
# Login ke Heroku
heroku login

# Create app
heroku create x402-backend

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set B402_API_KEY=your_key

# Deploy
git push heroku main
```

#### Frontend
```bash
# Create static site
heroku create x402-frontend

# Build dan deploy
npm run build:frontend
# Upload build folder ke Heroku
```

### 4. DigitalOcean App Platform

#### Setup
1. Connect GitHub repository
2. Configure build settings:
   - **Backend**: `npm install && npm start`
   - **Frontend**: `npm install && npm run build`

#### Environment Variables
```env
NODE_ENV=production
B402_API_URL=https://www.b402.ai/api
B402_FACILITATOR_URL=https://facilitator.b402.ai
```

## 🐳 Docker Deployment

### Backend Dockerfile
```dockerfile
FROM node:16-alpine

WORKDIR /app

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY backend/ .

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "start"]
```

### Frontend Dockerfile
```dockerfile
FROM node:16-alpine as build

WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY frontend/ .

# Build app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy build files
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  backend:
    build:
      context: .
      dockerfile: backend/Dockerfile
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - B402_API_KEY=${B402_API_KEY}
    restart: unless-stopped

  frontend:
    build:
      context: .
      dockerfile: frontend/Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
```

## ☁️ Cloud Provider

### AWS

#### EC2 + S3
1. **Backend**: Deploy ke EC2 instance
2. **Frontend**: Upload ke S3 bucket
3. **Domain**: Configure CloudFront distribution

#### ECS Fargate
```yaml
# task-definition.json
{
  "family": "x402-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole"
}
```

### Google Cloud Platform

#### Cloud Run
```bash
# Deploy backend
gcloud run deploy x402-backend \
  --source backend/ \
  --platform managed \
  --region asia-southeast1

# Deploy frontend
gcloud run deploy x402-frontend \
  --source frontend/ \
  --platform managed \
  --region asia-southeast1
```

### Azure

#### App Service
```bash
# Deploy backend
az webapp up --name x402-backend --resource-group myResourceGroup

# Deploy frontend
az webapp up --name x402-frontend --resource-group myResourceGroup
```

## 🔧 Environment Configuration

### Production Environment
```env
# Backend
NODE_ENV=production
PORT=5000
B402_API_URL=https://www.b402.ai/api
B402_FACILITATOR_URL=https://facilitator.b402.ai
B402_API_KEY=prod_api_key
CHAIN_ID=56
RPC_URL=https://bsc-dataseed.binance.org/
PAYMENT_AMOUNT=0.001
PAYMENT_TOKEN=BNB

# Frontend
REACT_APP_API_URL=https://api.x402.com
REACT_APP_CHAIN_ID=56
REACT_APP_RPC_URL=https://bsc-dataseed.binance.org/
```

### Staging Environment
```env
# Backend
NODE_ENV=staging
PORT=5000
B402_API_URL=https://staging.b402.ai/api
B402_FACILITATOR_URL=https://staging.facilitator.b402.ai
B402_API_KEY=staging_api_key
CHAIN_ID=97
RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545/
```

## 📊 Monitoring & Logging

### Application Monitoring
- **New Relic** - APM monitoring
- **DataDog** - Infrastructure monitoring
- **Sentry** - Error tracking

### Logging
```javascript
// Winston logger setup
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Health Checks
```javascript
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});
```

## 🔒 Security

### SSL/TLS
- Gunakan Let's Encrypt untuk SSL certificate
- Configure HTTPS redirect
- Set security headers

### Environment Security
- Jangan commit file .env
- Gunakan secret management (AWS Secrets Manager, Azure Key Vault)
- Rotate API keys secara berkala

### CORS Configuration
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
```

## 📈 Performance Optimization

### Backend
- Enable gzip compression
- Use Redis untuk caching
- Implement rate limiting
- Database connection pooling

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- CDN untuk static assets

## 🚨 Troubleshooting

### Common Issues

1. **CORS Error**
   - Check CORS configuration
   - Verify frontend URL

2. **Environment Variables**
   - Check .env file
   - Verify production environment

3. **Database Connection**
   - Check connection string
   - Verify database credentials

4. **SSL Certificate**
   - Check certificate validity
   - Verify domain configuration

### Debug Commands
```bash
# Check logs
docker logs container_name

# Check environment
printenv | grep B402

# Test API
curl -v https://api.x402.com/health
```

## 📋 Checklist Deployment

- [ ] Environment variables configured
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Database connected
- [ ] Monitoring setup
- [ ] Backup strategy
- [ ] Security headers
- [ ] Performance optimization
- [ ] Error handling
- [ ] Documentation updated

---

**Selamat deployment! 🚀**
