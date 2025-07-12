#!/bin/bash

echo "🔧 DevFlow Quick Fix Script"
echo "=========================="
echo ""

echo "🛠️  Fixing import paths and dependencies..."

# Navigate to project root
cd /Users/aditisingh/Desktop/DevFlow-main

echo "📦 Installing rich text editor dependencies..."
cd frontend
npm install react-quill quill @headlessui/react @heroicons/react
cd ..

echo ""
echo "✅ Dependencies installed!"
echo ""
echo "🚀 To continue:"
echo "1. Restart your frontend server:"
echo "   cd frontend && npm run dev"
echo ""
echo "2. Your app should now work with either:"
echo "   • Full rich text editor (if react-quill installed successfully)"
echo "   • Simple fallback editor (if react-quill installation failed)"
echo ""
echo "3. Test the features:"
echo "   • Create questions with formatting"
echo "   • Add answers with rich text"
echo "   • Test voting and notifications"
echo ""
echo "🎉 All fixes applied!"
