#!/bin/bash

echo "🚀 Starting DevFlow Development Servers..."
echo ""

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "⚠️  Port $1 is already in use"
        return 1
    fi
    return 0
}

# Check if required ports are available
if ! check_port 5000; then
    echo "❌ Backend port 5000 is in use. Please free the port or change the PORT in .env"
    exit 1
fi

if ! check_port 5173; then
    echo "⚠️  Frontend port 5173 is in use. Vite will automatically use the next available port."
fi

echo "✅ Starting backend server on port 5000..."
echo "✅ Starting frontend server on port 5173..."
echo ""
echo "📝 Keep both terminals open to run the full application:"
echo "   • Backend API: http://localhost:5000"
echo "   • Frontend App: http://localhost:5173"
echo ""
echo "🛑 Press Ctrl+C in each terminal to stop the servers"
echo ""

# Start backend in background
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend in background
cd frontend
npm run dev &
FRONTEND_PID=$!

# Function to cleanup processes on script exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT

echo "⏳ Servers starting... (This may take a few moments)"
echo "   Press Ctrl+C to stop both servers"

# Wait for background processes
wait
