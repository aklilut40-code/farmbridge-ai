# FarmBridge AI server (Task 2.1: skeleton)

## Run it
Requires Node.js 18.18 or newer and a MongoDB database (local MongoDB, or a free MongoDB Atlas cluster).

    cd server
    npm install
    cp .env.example .env      # Windows: copy .env.example .env
    # edit .env if your MongoDB address is different
    npm test                  # runs without MongoDB
    npm run dev               # needs MongoDB running

Then open http://localhost:5000/api/v1/health. Expected:

    {"status":"ok","service":"farmbridge-server","uptimeSeconds":3,"database":"connected"}

Never commit `.env`. It is already listed in the root `.gitignore`.
