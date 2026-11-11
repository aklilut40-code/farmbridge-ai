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

## 📋 What Remains to be Built (Pending Features & Roadmap)

Because the project is in its first month of a projected **5+ month development cycle**, the following major modules and capabilities are still to be implemented:

### 1. 🔍 AI Crop Disease & Leaf Photo Diagnostics (Months 1–2)
- [ ] **Trained Computer Vision Model**: Train and integrate deep learning models (MobileNetV3 / EfficientNet) tailored to local Ethiopian staple crops (Teff, Maize, Coffee, Tomato, Wheat, Sorghum).
- [ ] **Image Upload & Inference API**: Endpoint (`/api/v1/diagnose/image`) to process uploaded leaf/fruit photos and return disease probabilities and severity metrics.
- [ ] **Confidence Threshold Guardrails**: System to ensure uncertain diagnoses are labeled as preliminary and automatically escalated to agronomists.
- [ ] **Curated Treatment Guides**: Database of verified non-chemical and chemical treatments approved by agricultural ministries.

### 2. 🎙️ Multilingual Voice Interface for Low-Literacy Farmers (Months 2–3)
- [ ] **In-App Voice Recording**: Audio capture widget designed for farmers who cannot or prefer not to type.
- [ ] **Speech-to-Text (STT) Integration**: Speech transcription pipeline supporting spoken **Amharic** and **Tigrinya**.
- [ ] **Text-to-Speech (TTS) Read-Aloud**: Voice playback so farmers can listen to AI answers and agronomist guidance in their native language.
- [ ] **Voice Query API**: Endpoint (`/api/v1/advisory/voice`) to accept audio snippets and respond with both audio and text.

### 3. 👨‍🔬 Human Expert Agronomist Review Portal (Months 3–4)
- [ ] **Expert Dashboard**: Dedicated interface (`/expert/cases`) for verified agricultural extension workers to inspect farmer submissions.
- [ ] **Case Ticketing Workflow**: Status tracking (`Pending Review`, `In Progress`, `Expert Verified`, `Resolved`).
- [ ] **Two-Way Consultation Messaging**: Direct chat channel between the farmer and the assigned agronomist for follow-up questions.
- [ ] **Prescription / Advice Endorsement**: Official human approval of AI-suggested interventions before treatment application.

### 4. 📴 Offline-First Sync & Low-Connectivity Capabilities (Months 3–4)
- [ ] **Progressive Web App (PWA)**: Service workers and application manifest allowing the app to open and operate with zero internet connection.
- [ ] **IndexedDB Local Storage Queue**: Save offline reports, crop photos, and recorded notes locally on the farmer's device.
- [ ] **Background Synchronization**: Automatic batch upload of queued reports as soon as a 2G/3G/4G or Wi-Fi connection is detected.
- [ ] **SMS / USSD Gateway**: Basic text-message and USSD menu fallback for farmers using basic keypad feature phones.

### 5. 🌦️ Local Weather, Market Prices & Farming Calendar (Months 4–5)
- [ ] **Hyper-Local Weather Forecasts**: Weather API integration providing rainfall predictions, frost warnings, and dry-spell alerts by region.
- [ ] **Local Crop Market Prices**: Integration with regional market price boards so farmers know fair selling prices for their harvests.
- [ ] **Personalized Crop Calendar**: Automated alerts for ideal planting, weeding, fertilizing, and harvesting dates based on local climate data.

### 6. 🗣️ Native Speaker Linguistic Review & Verification (Ongoing)
- [ ] **Native Translation Audit**: Comprehensive verification of AI-drafted Amharic (`src/i18n/am.js`) and Tigrinya (`src/i18n/ti.js`) strings by native speakers.
- [ ] **Agricultural Terminology Alignment**: Standardizing local dialect terms for crop pests, diseases, fertilizers, and traditional farming techniques.

### 7. 🚀 Cooperative Field Trials & Production Deployment (Month 5+)
- [ ] **Pilot Cooperative Rollout**: Hands-on testing with farmer training centers (FTCs) and cooperative unions in rural Ethiopia.
- [ ] **Production Infrastructure**: Containerized deployment (Docker, Nginx, MongoDB Atlas replica set, CDN for static assets).
- [ ] **Security Audits & Access Controls**: Role-based access control (RBAC) hardening and end-to-end data encryption.

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
  stay tunned up to  the end
