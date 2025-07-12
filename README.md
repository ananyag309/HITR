# 🚀 StackIt – A Minimal Q&A Forum Platform.
Built by Team 4118 | Odoo Hackathon 2025

<p align="center">
  <img src="https://github.com/ananyag309/HITR/blob/462cb6fb2cb06bfa65cf0f70481adabe51ef7401/assests/5.jpeg" alt="StackIt" width="500"/>
</p>



---

## 🧠 Overview

*StackIt* is a minimal question-and-answer platform designed for collaborative learning and structured knowledge sharing.  
It focuses on simplicity, usability, and the core experience of asking and answering questions within a supportive community.

---

## 👥 Team 4118

Meet the amazing developers behind StackIt:

| Role | Name | GitHub | Expertise |
|------|------|--------|-----------|
| 👩‍💻 *Lead Developer* | Ananya Gupta | [GitHub](https://github.com/ananyag309) | Full-Stack Development, System Architecture |
| 🤖 *Backend Engineer* | Devanshi Jaiswal | [GitHub](https://github.com/Devanshi-cloud) | Node.js, Database Design, API Development |
| 📊 *Frontend Developer* | Aditi Singh | [GitHub](https://github.com/Aditi-Singh-15) | React.js, UI/UX, State Management |
| 💻 *Product Designer* | Aditi Jain | [GitHub](https://github.com/Aditijainnn) | Design Systems, User Experience, web dev |

---

---

## 📸 Demo (Coming Soon!)
> Screenshots / Demo Video Link

---

## ✨ Key Features

### 🔥 *Core Features*
- ✅ *Rich Question Posting* - Create detailed questions with formatting
- ✅ *Advanced Text Editor* - Bold, italic, links, images, code blocks
- ✅ *Smart Voting System* - Upvote/downvote questions and answers
- ✅ *Answer Acceptance* - Mark best answers as accepted solutions
- ✅ *Tag-Based Organization* - Categorize and filter by technology tags
- ✅ *Real-time Notifications* - Get notified of new answers and interactions
- ✅ *Guest Mode* - Browse questions without account (read-only)
- ✅ *Advanced Sorting* - Sort by newest, votes, answers, activity
- ✅ *Responsive Design* - Perfect on desktop, tablet, and mobile

### 🛡 *Security & Authentication*
- ✅ *JWT Authentication* - Secure token-based auth system
- ✅ *Protected Routes* - Restricted access for authenticated users
- ✅ *Input Validation* - Prevent XSS and injection attacks
- ✅ *Rate Limiting* - Prevent spam and abuse

---

## 👤 User Roles & Permissions

| Role | View Questions | Ask Questions | Answer Questions | Vote | Accept Answers | Moderate |
|------|---------------|---------------|------------------|------|----------------|----------|
| *👀 Guest* | ✅ Yes | ❌ No | ❌ No | ❌ No | ❌ No | ❌ No |
| *👤 Registered User* | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Own Questions | ❌ No |
| *🛡 Admin* | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |

### 🔐 Guest Mode Restrictions
- *Read-Only Access*: Guests can browse all questions and answers
- *Authentication Required*: Must sign in to post, answer, or vote
- *Seamless Signup*: Quick registration process to unlock full features

---

## 🛠 Core Features

### 1️⃣ Ask a Question
Users can submit new questions with:
- *Title* – Short and descriptive
- *Description* – Rich text formatting supported
- *Tags* – Multi-select (e.g., React, JWT)

  <img src="https://github.com/ananyag309/HITR/blob/512289e6ace2d65c652d1ed521d3491578d60ff6/assests/4.jpeg" alt="StackIt" width="500"/>

---

### 2️⃣ Rich Text Editor
Supports:
- *Formatting:* Bold, Italic, Strikethrough  
- *Lists:* Numbered & Bullet points  
- *Media:* Image upload, Emoji insertion  
- *Text Tools:* Hyperlinks, Text alignment (Left, Center, Right)

  

---

### 3️⃣ Answering Questions
- Users can post answers using the same rich text editor
- Only *logged-in users* can post answers
 <img src="https://github.com/ananyag309/HITR/blob/f785694e02b7388f9e94cd1b1a0e7de42dfc3e2a/assests/3.jpeg" alt="StackIt" width="500"/>
---

### 4️⃣ Voting & Accepting Answers
- Upvote/Downvote functionality for answers
- Question owners can *mark an answer as accepted*

<img src="https://github.com/ananyag309/HITR/blob/f785694e02b7388f9e94cd1b1a0e7de42dfc3e2a/assests/3.jpeg" alt="StackIt" width="500"/>

---

### 5️⃣ Tagging System
- All questions must have *at least one relevant tag*
- Tags help in filtering and content discovery
<img src="https://github.com/ananyag309/HITR/blob/f785694e02b7388f9e94cd1b1a0e7de42dfc3e2a/assests/2.jpeg" alt="StackIt" width="500"/>

---

### 6️⃣ 🔔 Notification System
- Bell icon in top navbar shows unread count
- Users get notified when:
  - Someone answers their question
  - Someone comments on their answer
  - They’re mentioned using @username
- Dropdown shows recent notifications on click

---
### Database - MongoDB

<p align="center">
  <img src="https://github.com/ananyag309/HITR/blob/main/assests/6.jpeg.png" width="45%" />
  <img src="https://github.com/ananyag309/HITR/blob/main/assests/7.jpeg.png" width="47%" />
</p>

---

## 🧱 Tech Stack

- *Frontend:* React, CSS
- *Backend:* JavaScript, 
- *Database:* API Calls, MongoDB
- *Auth & Security:* Setup

---

### 🔐 Environment Variables

Create **two** separate `.env` files—one for the **backend** and one for the **frontend**—so secrets never live in code.

<details>
<summary>📁 <code>backend/.env</code></summary>

```bash
# ───── Database Configuration ─────
MONGODB_URI= Your_MongoDB_URI

# ───── JWT Configuration ─────
JWT_SECRET= Enter_Your_JWT_Secret_KEY

# ───── Server Configuration ─────
PORT=5001            # API server port
NODE_ENV=development # change to “production” on deploy

# ───── CORS ─────
FRONTEND_URL=http://localhost:5173
```

</details>

<details>
<summary>📁 <code>frontend/.env</code></summary>

```bash
# Vite prefixes all public env vars with “VITE_”
VITE_API_URL=http://localhost:5001/api
```

</details>

> **Heads‑up:**
>
> * Never commit your `.env` files—add them to **.gitignore**.
> * Use a secret manager (e.g., Render, Vercel, GitHub Actions, or Docker secrets) in production.

---

### ⏱️ Quick Start

1. **Clone & install**

   ```bash
   git clone https://github.com/your‑org/devflow.git
   cd devflow
   npm install            # backend deps
   cd frontend && npm i   # frontend deps
   ```

2. **Add the two `.env` files** exactly as shown above.

3. **Run in development**

   ```bash
   # 🖥️ backend
   cd ../
   npm run dev            # nodemon on :5001

   # 🌐 frontend (in a new terminal)
   cd frontend
   npm run dev            # Vite on :5173
   ```

Both servers should now be live:

* **API** → [http://localhost:5001/api](http://localhost:5001/api)
* **React app** → [http://localhost:5173](http://localhost:5173)



## 🏆 Built with ❤ at Odoo Hackathon 2025
