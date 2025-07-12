#!/bin/bash

echo "🔍 DevFlow Backend & Frontend Connectivity Test"
echo ""

# Test if backend is running
echo "Testing backend connectivity..."
if curl -s http://localhost:5001/api/questions > /dev/null 2>&1; then
    echo "✅ Backend is running and accessible at http://localhost:5001"
else
    echo "❌ Backend is not running or not accessible at http://localhost:5001"
    echo "   Make sure to run 'npm run dev' in the project root"
    exit 1
fi

# Test MongoDB connection by checking a backend endpoint
echo ""
echo "Testing database connectivity..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5001/api/questions)

if [ "$RESPONSE" = "200" ]; then
    echo "✅ Database connection successful"
elif [ "$RESPONSE" = "500" ]; then
    echo "❌ Database connection failed (500 error)"
    echo "   Check your MongoDB Atlas connection string in .env"
else
    echo "⚠️  Backend responding but got HTTP $RESPONSE"
fi

# Test if frontend environment is configured
echo ""
echo "Testing frontend configuration..."
if [ -f "frontend/.env" ]; then
    API_URL=$(grep VITE_API_URL frontend/.env | cut -d '=' -f2)
    echo "✅ Frontend API URL configured: $API_URL"
else
    echo "❌ Frontend .env file missing"
fi

echo ""
echo "📊 Summary:"
echo "   Backend should be at: http://localhost:5001"
echo "   Frontend should be at: http://localhost:5173"
echo "   API endpoint test: http://localhost:5001/api/questions"
echo ""
echo "If tests fail, check:"
echo "   1. Backend is running: npm run dev"
echo "   2. MongoDB URI is correct in .env"
echo "   3. No firewall blocking ports 5000/5173"
