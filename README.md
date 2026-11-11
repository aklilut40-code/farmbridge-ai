# FarmBridge AI

> ⚠️ **Project Status: Work in Progress (Not Finished)**  
> **Notice:** This project is in its early stages of active development. It is **not finished yet** and is expected to take **at least 5 months** of ongoing development to complete the full AI pipeline, expert portal, and field trials.

---

Connecting smallholder farmers with trusted agricultural knowledge, AI crop diagnostics, and verified human experts — with first-class support for **Amharic (አማርኛ)**, **Tigrinya (ትግርኛ)**, and **English**.

---

## 📅 5-Month Development Roadmap

| Phase | Timeline | Focus Area | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1** | Month 1 | Foundation, Multilingual UI, Auth & Database Architecture | **Completed** |
| **Phase 2** | Months 1–2 | Computer Vision Leaf & Crop Disease Detection Model | *In Progress* |
| **Phase 3** | Months 2–3 | Multilingual Voice Interface & Speech-to-Text (STT) for Farmers | *Planned* |
| **Phase 4** | Months 3–4 | Expert Agronomist Review Portal & Offline Sync Queue | *Planned* |
| **Phase 5** | Months 4–5+ | Field Testing, Model Fine-Tuning & Mobile PWA Deployment | *Planned* |

---

## 🌟 Current Implementation (What Works Today)

- **Multilingual Support**: Real-time language switching between Amharic, Tigrinya, and English with saved language preference.
- **Farmer Authentication**: Full registration and login system with encrypted credentials and JWT token sessions.
- **Farmer Dashboard**: Interactive workspace for requesting crop consultations, scanning plants, and viewing advisory cases.
- **Backend API**: Modular Node.js/Express architecture connected to MongoDB with health monitoring and robust error handling.
- **Unified Dev Workflow**: Single-command startup (`npm run dev`) that concurrently boots both the backend API and frontend Vite server with automatic browser launching and proxying.

---

## 🏗️ Project Architecture

```
farmbridge-ai/
├── client/                     # React + Vite Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components (SiteHeader, SiteFooter, Icon, Logo, LanguageSwitcher)
│   │   ├── context/            # AuthContext (JWT & session state)
│   │   ├── i18n/               # Translation dictionaries (English, Amharic, Tigrinya)
│   │   ├── pages/              # Landing, Login, Register, Dashboard, ComingNext
│   │   └── styles/             # Design tokens and CSS modules
│   ├── package.json
│   └── vite.config.js          # Port 5173, auto-open, proxy to :5000
│
├── server/                     # Node.js + Express + MongoDB Backend
│   ├── src/
│   │   ├── config/             # Environment validation and MongoDB connection
│   │   ├── middleware/         # JWT auth middleware, centralized error handler
│   │   ├── modules/
│   │   │   ├── auth/           # /api/v1/auth (register, login, me)
│   │   │   ├── health/         # /api/v1/health (system and DB status)
│   │   │   └── users/          # Mongoose User model (bcrypt password hashing)
│   │   ├── routes/             # Unified API route registry
│   │   ├── app.js              # Express app setup (CORS, Helmet, JSON parsing)
│   │   └── server.js           # Server entry point (port 5000, graceful shutdown)
│   ├── tests/                  # Vitest API unit and integration test suite
│   ├── package.json
│   └── .env.example            # Environment template
│
└── package.json                # Workspace script orchestrator (concurrently)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.18 or newer
- **npm** 9 or newer
- **MongoDB** running locally (`mongodb://127.0.0.1:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster connection URI.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aklilut40-code/farmbridge-ai.git
   cd farmbridge-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   npm run dev:client # or cd client && npm install
   cd server && npm install
   ```

3. Configure environment:
   ```bash
   cp server/.env.example server/.env
   # Edit server/.env if using MongoDB Atlas or custom ports
   ```

### Running the App

From the project root:

```bash
npm run dev
```

This starts:
- **Backend API Server**: `http://localhost:5000`
- **Frontend Web App**: `http://localhost:5173` (automatically opens in your browser)

### Running Tests

```bash
npm test
```

---

## 🔒 Important Notes

- **AI Translation Notice:** Amharic and Tigrinya strings are currently AI-assisted drafts. Native agricultural speakers must review technical crop terms before real-world deployment.
- **Environment Secrets:** Never commit `server/.env`. Use `.env.example` as a template for local development and CI/CD secret managers for deployment.
