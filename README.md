# 🚀 MERN Stack Portfolio with Admin Dashboard

A **dynamic full-stack portfolio** built with the MERN stack (MongoDB, Express, React, Node.js) featuring a complete admin dashboard for content management.

## ✨ Features

- 🎨 **Modern Premium UI** — Glassmorphism, gradient design, dark/light mode
- ⚡ **Animations** — Typed.js hero typing, tsParticles background, AOS scroll reveals
- 📦 **Dynamic Projects** — Loaded from MongoDB, manageable via admin dashboard
- 🔐 **Admin Dashboard** — JWT-protected admin panel with full CRUD
- 📬 **Contact Form** — Messages saved to DB and viewable in admin
- 📁 **Image Uploads** — Multer-based file upload for project images

---

## ⚙️ Prerequisites

- **Node.js** >= 18
- **MongoDB** (local on port 27017, or use MongoDB Atlas cloud)

---

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
# Root (backend)
npm install

# Frontend
cd client && npm install
```

### 2. Configure Environment

Edit `.env` in the project root:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
```

> **MongoDB Atlas?** Replace `MONGODB_URI` with your Atlas connection string:
> `mongodb+srv://user:password@cluster.mongodb.net/portfolio`

### 3. Start MongoDB

```bash
# Windows — Start MongoDB service
net start MongoDB

# Or run directly
mongod
```

### 4. Seed Database

```bash
npm run seed
```

This creates:
- **Admin user**: `admin@portfolio.com` / `Admin@123`
- Sample projects, skills, and portfolio info

### 5. Start Development Servers

**Option A — Start separately:**
```bash
# Terminal 1 — Backend
npm run dev

# Terminal 2 — Frontend
npm run client
```

**Option B — Start both together:**
```bash
npm run dev:all
```

### 6. Open in Browser

| URL | Description |
|-----|-------------|
| `http://localhost:5173` | Portfolio website |
| `http://localhost:5173/admin` | Admin login |

---

## 🔑 Admin Credentials

| Field | Value |
|-------|-------|
| Email | `admin@portfolio.com` |
| Password | `Admin@123` |

---

## 📁 Project Structure

```
portfolio/
├── server.js              # Express entry point
├── seed.js                # Database seeder
├── .env                   # Environment variables
├── config/
│   └── db.js              # MongoDB connection
├── models/
│   ├── User.js            # Admin user
│   ├── Project.js         # Portfolio projects
│   ├── Skill.js           # Skills with levels
│   ├── PortfolioInfo.js   # Hero/about content
│   └── Contact.js         # Contact messages
├── routes/                # Express routes
├── middleware/            # JWT auth + Multer upload
└── client/                # React + Vite frontend
    └── src/
        ├── components/    # Navbar, Hero, About, Skills, Projects, Contact, Footer
        ├── pages/
        │   ├── PortfolioPage.jsx
        │   └── admin/     # AdminLogin, Dashboard, Managers
        ├── context/       # AuthContext, ThemeContext
        └── api.js         # Axios API client
```

---

## 🌐 API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/login` | ❌ | Admin login |
| GET | `/api/projects` | ❌ | List projects |
| POST | `/api/projects` | ✅ | Create project |
| PUT | `/api/projects/:id` | ✅ | Update project |
| DELETE | `/api/projects/:id` | ✅ | Delete project |
| GET | `/api/skills` | ❌ | List skills |
| GET | `/api/portfolio` | ❌ | Portfolio info |
| PUT | `/api/portfolio` | ✅ | Update portfolio info |
| POST | `/api/contact` | ❌ | Send contact message |
| GET | `/api/contact` | ✅ | Admin: view messages |
| POST | `/api/upload` | ✅ | Upload image |

---

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, Typed.js, tsParticles, AOS, React Router, Axios, Lucide Icons

**Backend:** Node.js, Express, Mongoose, JWT, Bcryptjs, Multer

**Database:** MongoDB

---

© 2025 Sivaprakash — Full Stack Developer
