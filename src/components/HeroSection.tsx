"use client";

import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [walletAddress, setWalletAddress] = useState("");
  const { isConnected, address } = useAccount();
  const router = useRouter();

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (walletAddress.trim()) {
      router.push(`/dashboard?address=${walletAddress.trim()}`);
    }
  };

  const handleConnectedWallet = () => {
    if (address) {
      router.push(`/dashboard?address=${address}`);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Financial Grade Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-600/10"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1), rgba(22, 163, 74, 0.1))",
              "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(22, 163, 74, 0.1), rgba(34, 197, 94, 0.1))",
              "linear-gradient(225deg, rgba(22, 163, 74, 0.1), rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))",
              "linear-gradient(315deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1), rgba(22, 163, 74, 0.1))",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating financial particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-500/20 rounded-full"
            initial={{
              x:
                typeof window !== "undefined"
                  ? Math.random() * window.innerWidth
                  : Math.random() * 1200,
              y:
                typeof window !== "undefined"
                  ? Math.random() * window.innerHeight
                  : Math.random() * 800,
            }}
            animate={{
              y: [null, -100, null],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-gray-200 to-green-200 bg-clip-text text-transparent mb-6">
            WallE
            <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              DeFi Analytics Redefined
            </span>
          </h1>

          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Turn your wallet into a DeFi game get insights, risk assessments
            leaderboards & spicy AI roasts.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Connect Wallet Button */}
            <div className="flex flex-col items-center space-y-4">
              {isConnected ? (
                <motion.button
                  onClick={handleConnectedWallet}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300 text-lg border border-green-500/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Analyze your connected wallet"
                >
                  Analyze Portfolio
                </motion.button>
              ) : (
                <div className="connect-button-wrapper">
                  <ConnectButton.Custom>
                    {({ openConnectModal }) => (
                      <motion.button
                        onClick={openConnectModal}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300 text-lg border border-green-500/20"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Connect your wallet to get started"
                      >
                        Connect Wallet
                      </motion.button>
                    )}
                  </ConnectButton.Custom>
                </div>
              )}
            </div>

            {/* OR Divider */}
            <div className="flex items-center space-x-4">
              <div className="h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent w-12"></div>
              <span className="text-green-400/70 font-medium">OR</span>
              <div className="h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent w-12"></div>
            </div>

            {/* Enter Address Form */}
            <form
              onSubmit={handleAddressSubmit}
              className="flex flex-col sm:flex-row gap-4 items-center"
            >
              <input
                type="text"
                placeholder="Enter wallet address (0x...)"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="bg-black/70 border border-gray-700 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 backdrop-blur-sm w-full sm:w-80 transition-all duration-300"
                aria-label="Enter Ethereum wallet address"
              />
              <motion.button
                type="submit"
                className="bg-black/80 border border-green-500/30 hover:border-green-500 hover:bg-green-600/10 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300 text-lg whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Analyze the entered wallet address"
              >
                Analyze Address
              </motion.button>
            </form>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center border border-green-400/20">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Portfolio Analytics
              </h3>
              <p className="text-gray-400">
                Professional P&L tracking and risk assessment
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center border border-emerald-400/20">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                AI-Powered Insights
              </h3>
              <p className="text-gray-400">
                Institutional-grade analysis and recommendations
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-green-700 w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center border border-green-500/20">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Performance Rankings
              </h3>
              <p className="text-gray-400">
                Benchmark against top DeFi traders
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
