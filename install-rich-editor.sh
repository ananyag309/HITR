#!/bin/bash

echo "📝 Installing Rich Text Editor Dependencies..."

cd frontend

# Install React Quill (rich text editor)
npm install react-quill quill

# Install additional UI components for better UX
npm install @headlessui/react @heroicons/react

echo "✅ Dependencies installed!"
echo "Please restart the frontend server after this completes."
