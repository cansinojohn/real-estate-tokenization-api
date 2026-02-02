# Real Estate Tokenization API

A Node.js + Express backend service that tokenizes real estate assets into NFTs using Ethereum smart contracts.

This project demonstrates how traditional assets (properties) can be represented on-chain as ERC-721 tokens, enabling digital ownership, transferability, and blockchain verification.

---

## 🚀 Features

- Property management REST API
- MongoDB database integration
- ERC-721 NFT smart contract
- On-chain minting via ethers.js
- Sepolia testnet deployment
- Wallet-based ownership
- Clean backend architecture
- Backend safeguards to prevent duplicate NFT minting for the same asset

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Blockchain
- Solidity
- OpenZeppelin ERC-721
- ethers.js
- MetaMask
- Sepolia Testnet

### Tools
- Git/GitHub
- VS Code
- Remix IDE

---

## 📂 Project Structure

real-estate-tokenization-api
├─ src/
│  ├─ routes/
│  ├─ controllers/
│  ├─ services/
│  └─ abi/
├─ contracts/
├─ db.js
├─ package.json
├─ .env
└─ README.md

---

## ⚙️ Setup

### 1. Clone
git clone https://github.com/cansinojohn/real-estate-tokenization-api.git
cd real-estate-tokenization-api

### 2. Install
npm install

### 3. Create .env
PORT=4000
MONGO_URI=mongodb://localhost:27017/tokenization_db
RPC_URL=https://rpc.sepolia.org
PRIVATE_KEY=YOUR_PRIVATE_KEY
CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS

### 4. Run
npm run dev

Server runs at http://localhost:4000

---

## 🔗 API Endpoints

### Create property
POST /properties

### Get property
GET /properties/:id

### Tokenize property (mint NFT)
POST /properties/:id/tokenize

This mints an NFT on-chain and stores tokenId + txHash in MongoDB.

If the property is already tokenized, the API returns HTTP 409 Conflict
to prevent duplicate NFT minting.

---

## ⛓ Smart Contract

ERC-721 NFT contract deployed on Sepolia.

Functions:
- mint(address to, string uri)
- ownerOf(tokenId)
- tokenURI(tokenId)

---

## 🧠 What This Project Shows

- Backend ↔ Blockchain integration
- Smart contract calls from Node.js
- Wallet transaction signing
- Web3 + REST architecture
- Asset tokenization concepts

---

## 👤 Author

John Audrey L. Cansino  
GitHub: https://github.com/cansinojohn

---

## 📜 License

MIT
