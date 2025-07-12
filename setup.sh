#!/bin/bash

echo "🚀 Setting up DevFlow Local Development Environment..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend && npm install && cd ..

# Install frontend dependencies  
echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..

echo ""
echo "🎉 Dependencies installed successfully!"
echo ""
echo "📋 Next Steps:"
echo "   1. Set up your MongoDB Atlas cluster"
echo "   2. Update the .env file with your MongoDB URI and JWT secret"
echo "   3. Run 'npm run dev' to start the backend server"
echo "   4. In another terminal, run 'cd frontend && npm run dev' to start the frontend"
echo ""
echo "📚 For detailed setup instructions, check the setup guide!"
