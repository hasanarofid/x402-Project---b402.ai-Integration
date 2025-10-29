#!/bin/bash

# ===========================================
# x402 Project - Environment Setup Script
# ===========================================

echo "🚀 Setting up x402 project environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    NODE_VERSION=$(node --version)
    print_success "Node.js version: $NODE_VERSION"
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    NPM_VERSION=$(npm --version)
    print_success "npm version: $NPM_VERSION"
}

# Setup backend environment
setup_backend_env() {
    print_status "Setting up backend environment..."
    
    cd backend
    
    # Copy environment files if they don't exist
    if [ ! -f .env ]; then
        if [ "$1" = "production" ]; then
            cp .env.production .env
            print_success "Created .env from .env.production"
        else
            cp .env.development .env
            print_success "Created .env from .env.development"
        fi
    else
        print_warning ".env already exists, skipping..."
    fi
    
    # Install dependencies
    print_status "Installing backend dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        print_success "Backend dependencies installed successfully"
    else
        print_error "Failed to install backend dependencies"
        exit 1
    fi
    
    cd ..
}

# Setup frontend environment
setup_frontend_env() {
    print_status "Setting up frontend environment..."
    
    cd frontend
    
    # Copy environment files if they don't exist
    if [ ! -f .env ]; then
        if [ "$1" = "production" ]; then
            cp .env.production .env
            print_success "Created .env from .env.production"
        else
            cp .env.development .env
            print_success "Created .env from .env.development"
        fi
    else
        print_warning ".env already exists, skipping..."
    fi
    
    # Install dependencies
    print_status "Installing frontend dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        print_success "Frontend dependencies installed successfully"
    else
        print_error "Failed to install frontend dependencies"
        exit 1
    fi
    
    cd ..
}

# Create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    
    # Backend directories
    mkdir -p backend/logs
    mkdir -p backend/uploads
    mkdir -p backend/temp
    
    # Frontend directories
    mkdir -p frontend/build
    mkdir -p frontend/public/assets
    
    print_success "Directories created successfully"
}

# Setup git hooks
setup_git_hooks() {
    print_status "Setting up git hooks..."
    
    # Create pre-commit hook
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "Running pre-commit checks..."

# Check if .env files are not committed
if git diff --cached --name-only | grep -q "\.env$"; then
    echo "Error: .env files should not be committed!"
    exit 1
fi

echo "Pre-commit checks passed!"
EOF
    
    chmod +x .git/hooks/pre-commit
    print_success "Git hooks setup completed"
}

# Main setup function
main() {
    echo "==========================================="
    echo "  x402 Project Environment Setup"
    echo "==========================================="
    echo ""
    
    # Check prerequisites
    check_node
    check_npm
    
    # Create directories
    create_directories
    
    # Setup environments
    setup_backend_env $1
    setup_frontend_env $1
    
    # Setup git hooks
    setup_git_hooks
    
    echo ""
    echo "==========================================="
    print_success "Environment setup completed!"
    echo "==========================================="
    echo ""
    echo "Next steps:"
    echo "1. Update .env files with your actual values"
    echo "2. Run 'npm run dev' to start development servers"
    echo "3. Visit http://localhost:3000 for frontend"
    echo "4. Visit http://localhost:5000 for backend API"
    echo ""
    echo "For production deployment:"
    echo "1. Update .env files with production values"
    echo "2. Run 'npm run build:frontend' to build frontend"
    echo "3. Run 'npm run start:backend' to start backend"
    echo ""
}

# Check command line arguments
if [ "$1" = "production" ]; then
    print_warning "Setting up for PRODUCTION environment"
    main "production"
elif [ "$1" = "development" ]; then
    print_status "Setting up for DEVELOPMENT environment"
    main "development"
else
    print_status "Setting up for DEVELOPMENT environment (default)"
    main "development"
fi
