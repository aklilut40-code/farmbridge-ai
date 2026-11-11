# FarmBridge AI client (Step 1: design foundation and landing page)

## Run it
Requires Node.js 18 or newer.

    cd client
    npm install
    npm run dev

Open http://localhost:5173. To test on an Android phone on the same Wi-Fi, open the "Network" address
that Vite prints in the terminal.

    npm run build     # production build into client/dist

## What exists
- Public landing page in Amharic, Tigrinya and English (language choice is remembered).
- /login and /register show a placeholder; they are built and connected to the server in a later step.

## Important
- Amharic and Tigrinya text is an AI-written DRAFT. Native speakers must review every string in
  `src/i18n/am.js` and `src/i18n/ti.js` before real farmers see it.
- The landing page describes the planned product. Voice, AI answers and offline sync are not built yet.
