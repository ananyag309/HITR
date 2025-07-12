#!/bin/bash

echo "📦 Installing Rich Text Editor Dependencies..."

cd frontend

# Install React Quill (rich text editor)
npm install react-quill quill

echo "✅ Dependencies installed!"
echo ""
echo "🔄 Please restart the frontend server:"
echo "  1. Press Ctrl+C in the frontend terminal"
echo "  2. Run: npm run dev"
