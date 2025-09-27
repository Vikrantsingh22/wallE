# WallE - Social DeFi Platform

An impressive Next.js social DeFi platform that analyzes wallet data, provides AI insights, and includes competitive leaderboards. Built with modern web technologies and integrated with 1inch API for comprehensive DeFi analytics.

## 🚀 Features

### 🎯 Core Features
- **Wallet Analysis**: Comprehensive P&L tracking and performance insights
- **AI-Powered Insights**: Smart recommendations and playful roasts using LLM
- **Transaction History**: Detailed analysis of swaps, transfers, and DeFi activities
- **Risk Assessment**: Real-time risk scoring and safety recommendations
- **Social Leaderboards**: Compete with other DeFi traders

### 🎨 UI/UX Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animated Gradients**: Beautiful hero section with floating particles
- **Wallet Integration**: Seamless connection with RainbowKit and wagmi
- **Interactive Charts**: P&L visualization with Recharts
- **Dark Theme**: Modern dark UI optimized for crypto traders

### 🔧 Technical Features
- **Next.js 15**: Latest App Router with SSR and ISR capabilities
- **TypeScript**: Full type safety throughout the application
- **MongoDB**: Efficient data storage and caching
- **API Integration**: 1inch API for real-time DeFi data
- **Error Handling**: Robust error handling and fallback states

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Recharts** - Data visualization and charting

### Wallet Integration
- **wagmi** - React hooks for Ethereum
- **RainbowKit** - Beautiful wallet connection UI
- **viem** - TypeScript interface for Ethereum

### Backend & APIs
- **MongoDB** - Document database
- **Mongoose** - MongoDB object modeling
- **1inch API** - DeFi protocol aggregation
- **Groq API** - AI insights and LLM integration

### UI Components
- **Headless UI** - Unstyled, accessible UI components
- **Heroicons** - Beautiful hand-crafted SVG icons
- **Lucide React** - Additional icon library

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)
- 1inch API key from [1inch Developer Portal](https://portal.1inch.dev/)
- Groq API key for AI features
- WalletConnect Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd walle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # APIs
   ONEINCH_API_KEY=your_1inch_api_key
   GROQ_API_KEY=your_groq_api_key
   
   # Wallet Integration
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` (or the port shown in terminal)

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/wallet/analyze/       # Wallet analysis API endpoint
│   ├── dashboard/                # Dashboard page
│   ├── leaderboard/              # Leaderboard page
│   └── page.tsx                  # Landing page
├── components/                   # React components
│   ├── dashboard/                # Dashboard-specific components
│   │   ├── PortfolioOverview.tsx
│   │   ├── TransactionHistory.tsx
│   │   ├── AIInsights.tsx
│   │   └── PerformanceChart.tsx
│   ├── Navbar.tsx               # Navigation component
│   └── HeroSection.tsx          # Landing page hero
├── lib/                         # Utilities and services
│   ├── services/                # External API services
│   │   ├── oneInchService.ts    # 1inch API integration
│   │   ├── llmService.ts        # AI/LLM service
│   │   └── riskAnalysis.ts      # Risk assessment logic
│   ├── models/                  # Database models
│   │   └── Wallet.ts           # Wallet data model
│   ├── db.ts                    # Database connection
│   └── providers.tsx            # React providers (wagmi, RainbowKit)
```

## 🎮 Usage

### Analyzing a Wallet
1. **Connect Wallet**: Click "Connect Your Wallet" and choose your preferred wallet
2. **Enter Address**: Alternatively, paste any Ethereum address in the input field
3. **View Dashboard**: Explore comprehensive analytics including:
   - Portfolio value and P&L performance
   - Transaction history with risk scoring
   - AI-generated insights and recommendations
   - Interactive performance charts

### Getting AI Insights
- Navigate to the dashboard after wallet analysis
- View automatic insights in the AI Insights panel
- Click "Get Roasted 🔥" for entertaining commentary on your trading decisions

### Leaderboard Competition
- Visit `/leaderboard` to see top DeFi traders
- Sort by portfolio value, P&L, or risk score
- Compare your performance with other users

## 🔧 API Endpoints

### POST `/api/wallet/analyze`
Analyzes a wallet address and returns comprehensive data.

**Request Body:**
```json
{
  "address": "0x742d35Cc69Ff726b71dA1E9C93fb6DC0Bb7b7E4F",
  "includeRoast": false
}
```

**Response:**
```json
{
  "wallet": {
    "address": "0x...",
    "totalValue": 125000,
    "performance": { /* P&L data */ },
    "riskAssessment": { /* Risk analysis */ },
    "transactions": [ /* Transaction history */ ]
  },
  "insights": "AI-generated insights and recommendations..."
}
```

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy with zero configuration

### Manual Deployment
```bash
npm run build
npm start
```

## 🔒 Security & Privacy

- **API Keys**: All sensitive keys are stored in environment variables
- **Rate Limiting**: Built-in protection against API abuse
- **Input Sanitization**: All user inputs are validated and sanitized
- **Error Handling**: Graceful error handling without exposing sensitive data

## 🎯 Roadmap

### Phase 1 (Current)
- [x] Basic wallet analysis
- [x] AI insights and roasts
- [x] Responsive UI design
- [x] Wallet connection integration

### Phase 2 (Coming Soon)
- [ ] Real-time price feeds
- [ ] Advanced risk algorithms
- [ ] Social features (following, sharing)
- [ ] Trading competitions

### Phase 3 (Future)
- [ ] Mobile app
- [ ] Multi-chain support
- [ ] Advanced portfolio management
- [ ] DeFi strategy recommendations

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [1inch](https://1inch.io/) for comprehensive DeFi API
- [RainbowKit](https://www.rainbowkit.com/) for wallet connection UI
- [Recharts](https://recharts.org/) for beautiful data visualization
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

## 📞 Support

For support, email [your-email] or join our [Discord community].

---

Built with ❤️ for the DeFi community
