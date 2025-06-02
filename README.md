Quick links:
<br>
<a href="https://ip.mediolano.app">Mediolano Dapp (Sepolia)</a>
<br>
<a href="https://mediolano.xyz">Website mediolano.xyz</a>
<br>
<a href="https://t.me/MediolanoStarknet">Telegram</a>
<br>
<a href="https://discord.gg/NhqdTvyA">Discord</a>
<br>
<a href="https://x.com/mediolanoapp">X / Twitter</a>
<br>

## 🚀 NEW: AVNU Paymaster Integration

**Experience frictionless transactions with gas fee abstraction!**

- ✅ **Sponsored Transactions**: Mint NFTs for FREE with Mediolano sponsorship
- ✅ **Gasless Payments**: Pay gas fees with USDC, USDT, or other tokens
- ✅ **Meta-Transactions**: Enhanced UX with account abstraction
- ✅ **Seamless Onboarding**: No ETH required for new users

**[Try the Paymaster Demo](/paymaster-demo)** | **[Integration Guide](docs/PAYMASTER_INTEGRATION.md)**

---

![Mediolano.app](https://mediolano.app/wp-content/uploads/2025/03/Mediolano-Dapp-20250310alpha.png)

> [!IMPORTANT]
> Mediolano dapp is in constant development and the current version runs on Starknet's Sepolia devnet. Use for testing purposes only. 

## Programmable IP for the Integrity Web

Mediolano provides seamless tokenization services for intellectual property, leveraging Starknet’s unparalleled high-speed, low-cost, and smart contract intelligence for digital assets to empower creators, collectors, and organizations to protect and monetize their IP assets effectively.

Registering intellectual property on Mediolano means your asset is automatically tokenized and protected in 181 countries, according to The Berne Convention for the Protection of Literary and Artistic Works, adopted in 1886. Mediolano assets generate Proof of Ownership to guarantee recognition of the authorship of IP without the need for registration with the World Intellectual Property Organization (WIPO).

Mediolano offers permissionless services with ZERO FEES for Programmable IP, such as artwork, videos, music, literary works, AI models, software, and other works of authorship. The copyright is immutable time stamped on Starknet public blockchain, and settled on Ethereum, providing Proof of Ownership valid for 50-70 years, in accord with the legal jurisdiction. Tokenizing intellectual property with smart contracts opens the door to countless opportunities, from integrations with communities and games to monetization with AI Agents.

Mediolano aims to serve as the intellectual property provider for the integrity web, a public good to empower programmable IP to anyone. By integrating standards, innovative technology and decentralization, Mediolano ensures interoperability, security and sovereignty. Our platform is tailored for the tokenization and management of intellectual property, enabling you to register, track, license and monetize IP effortlessly, unlocking new revenue streams.


### Key Features

- Programmable IP: Transform intelligence works into digital assets that can be managed, traded, and monetized. This includes everything from images, music, NFTs, papers, video and real-world assets.

- Immutable Ownership & Attribution: blockchain ensures clear sovereignty, verifiable ownership and attribution for every piece of IP, safeguarding your property.

- Enhanced Registration & Protection: Use templates and smart contracts to take charge of your IP assets in the digital realm with immutable and transparent ownership.

- High-Speed & Low-Cost: Leverage Starknet's unparalleled speed and cost-efficiency with ZERO FEES on Mediolano Protocol.

- **Gas Fee Abstraction**: Revolutionary AVNU Paymaster integration eliminates gas fee barriers for seamless user experience.

[![YouTube](http://i.ytimg.com/vi/uvskLmxmt7M/hqdefault.jpg)](https://www.youtube.com/watch?v=uvskLmxmt7M)

## 🎯 Paymaster Features

### 🎁 Sponsored Transactions
- **Zero gas fees** for eligible transactions
- **Free NFT minting** for new users
- **Sponsored marketplace** interactions
- **Revenue claiming** without gas costs

### ⛽ Gasless Payments
- Pay gas with **USDC, USDT, ETH, or STRK**
- **No ETH required** for transactions
- **Real-time price conversion**
- **Flexible token selection**

### 🔄 Meta-Transactions
- **Sign messages** instead of transactions
- **Enhanced security** with account abstraction
- **Improved UX** for complex operations
- **Batch transaction** support

### 🚀 Quick Start with Paymaster

```bash
# 1. Clone and install
git clone https://github.com/mediolano-app/mediolano-app.git
cd mediolano-app
npm install

# 2. Configure environment
cp .env.example .env.local
# Add your AVNU Paymaster API key

# 3. Run the app
npm run dev

# 4. Visit /paymaster-demo to try it out!
```


## Getting Started

## Running locally

Dapp requirements:
- Next.js 15
- React 19
- Node.js 18.18 or later.
- macOS, Windows (including WSL), and Linux are supported.

Clone the repository to your local machine:

```bash
git clone https://github.com/mediolano-app/mediolano-app.git
```
Install dependencies for Next.js 15 + React 19:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running via Docker

To run the containerized application, there is no dependencies requirement. 

Clone the repository, and run:

```bash
 docker build -t mediolano-app .     
```

To build the image. Then, start the container:

```bash
docker run -p 8080:8080 mediolano-app
```
