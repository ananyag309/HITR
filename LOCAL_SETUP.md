# DevFlow - Local Development Quick Start

Welcome to DevFlow! This guide will get you up and running locally in just a few minutes.

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Dependencies
```bash
# Make the setup script executable and run it
chmod +x setup.sh
./setup.sh
```

### Step 2: Configure MongoDB Atlas
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/) and create a free account
2. Create a new cluster (Free tier is perfect)
3. Create a database user with username/password
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string from "Connect" → "Connect your application"

### Step 3: Update Environment Variables
Edit the `.env` file in the project root:
```env
# Replace with your actual MongoDB connection string
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.xxxxx.mongodb.net/devflow

# JWT secret is already generated for you!
JWT_SECRET=68d4b93bfe9ad682856bff38f5482430d08fd5adc30a76f9682a500039df42c3

# These are already configured for local development
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Step 4: Start Development Servers

**Option A: Automatic (Recommended)**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

**Option B: Manual (Two separate terminals)**

Terminal 1 - Backend:
```bash
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### Step 5: Open the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## ✅ Verification Checklist

- [ ] MongoDB Atlas cluster created and running
- [ ] Connection string updated in `.env`
- [ ] Backend server starts without errors
- [ ] Frontend loads at http://localhost:5173
- [ ] Can create a new account (signup works)
- [ ] Can login with created account
- [ ] Can create and view questions

## 🛠 Development Commands

```bash
# Install all dependencies
npm install

# Start backend only
npm run dev

# Start frontend only
cd frontend && npm run dev

# Build for production
npm run build

# Run with specific port
PORT=3000 npm run dev
```

## 🔧 Common Issues

### Backend won't start
- Check MongoDB connection string in `.env`
- Ensure MongoDB Atlas cluster is running
- Verify your IP is whitelisted in Atlas

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check `frontend/.env` has correct `VITE_API_URL`
- Verify CORS settings allow localhost:5173

### Authentication doesn't work
- Check JWT_SECRET is set in `.env`
- Ensure cookies are enabled in browser
- Clear browser cookies and try again

## 📁 Project Structure

```
DevFlow-main/
├── backend/          # Express.js API server
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API endpoints
│   ├── controllers/  # Business logic
│   └── middleware/   # Auth & validation
├── frontend/         # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── lib/         # Utilities & API config
│   │   └── hooks/       # Custom React hooks
└── .env             # Environment variables
```

## 🎯 Next Steps

1. **Explore the code**: Start with `backend/server.js` and `frontend/src/App.jsx`
2. **Test features**: Create questions, answers, and test voting
3. **Make changes**: Try modifying components or adding features
4. **Check the database**: Use MongoDB Compass to view your data

Happy coding! 🎉
