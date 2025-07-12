#!/bin/bash

echo "🔧 JWT Token Debug Script"
echo "========================"
echo ""

echo "🔍 Testing authentication..."
echo ""

echo "1. Testing if backend is responding:"
curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:5001/api/questions

echo ""
echo "2. Testing protected endpoint without auth:"
curl -s -w "Status: %{http_code}\n" http://localhost:5001/api/notifications/unread-count

echo ""
echo "3. Check browser console for:"
echo "   • Token preview in API logs"
echo "   • Token expiration details"
echo "   • Cookie contents"
echo ""

echo "🛠️ If authentication fails:"
echo "1. Clear all browser cookies"
echo "2. Sign up with a new account"
echo "3. Check if token is saved properly"
echo "4. Test API calls again"
echo ""

echo "💡 Quick fixes to try:"
echo "• Clear browser cookies: F12 → Application → Cookies → Clear All"
echo "• Restart both servers"
echo "• Try incognito/private browsing mode"
echo "• Check backend logs for JWT verification errors"
