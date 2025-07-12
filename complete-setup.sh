#!/bin/bash

echo "🚀 DevFlow - Complete Setup with New Features"
echo "============================================="
echo ""

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."
if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js $(node --version)"
echo "✅ npm $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo "→ Installing root dependencies..."
npm install

echo "→ Installing frontend dependencies..."
cd frontend
npm install

# Install rich text editor
echo "→ Installing rich text editor..."
npm install react-quill quill

echo "→ Installing UI components..."
npm install @headlessui/react @heroicons/react

cd ..

echo "→ Installing backend dependencies..."
cd backend
npm install
cd ..

echo ""
echo "✅ All dependencies installed successfully!"
echo ""

# Show next steps
echo "🎯 Next Steps:"
echo "1. Set up MongoDB Atlas (if not done already)"
echo "2. Update .env file with your MongoDB URI"
echo "3. Start backend server: npm run dev"
echo "4. Start frontend server: cd frontend && npm run dev"
echo ""

echo "🌟 New Features Available:"
echo "• Rich Text Editor for questions and answers"
echo "• Multi-select tag system with suggestions"
echo "• Answer voting and acceptance system"
echo "• Real-time notification system"
echo "• Enhanced question display with voting"
echo ""

echo "🔗 URLs:"
echo "• Frontend: http://localhost:5173"
echo "• Backend: http://localhost:5001"
echo ""

echo "📚 Documentation:"
echo "• Check LOCAL_SETUP.md for detailed setup"
echo "• See implementation guide artifact for technical details"
echo ""

echo "🎉 Setup complete! Happy coding!"
