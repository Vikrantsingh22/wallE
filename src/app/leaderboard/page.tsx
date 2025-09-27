"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

interface LeaderboardEntry {
  rank: number;
  address: string;
  totalValue: number;
  totalPnL: number;
  riskScore: number;
  transactions: number;
  lastActive: string;
}

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"totalValue" | "totalPnL" | "riskScore">(
    "totalValue"
  );

  useEffect(() => {
    // Simulate loading leaderboard data
    // In a real app, this would fetch from an API
    setTimeout(() => {
      const mockData: LeaderboardEntry[] = [
        {
          rank: 1,
          address: "0x742d35Cc69Ff726b71dA1E9C93fb6DC0Bb7b7E4F",
          totalValue: 125000,
          totalPnL: 15000,
          riskScore: 25,
          transactions: 847,
          lastActive: "2024-01-15",
        },
        {
          rank: 2,
          address: "0x8ba1f109551bD432803012645Hac136c7b7E8f1a",
          totalValue: 89000,
          totalPnL: 12500,
          riskScore: 35,
          transactions: 623,
          lastActive: "2024-01-14",
        },
        {
          rank: 3,
          address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
          totalValue: 67000,
          totalPnL: 8900,
          riskScore: 45,
          transactions: 445,
          lastActive: "2024-01-13",
        },
        {
          rank: 4,
          address: "0xA0b86a33E6441A8C143d3f57A6d4F8EB7b2C8e4A",
          totalValue: 45000,
          totalPnL: 5600,
          riskScore: 55,
          transactions: 234,
          lastActive: "2024-01-12",
        },
        {
          rank: 5,
          address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
          totalValue: 34000,
          totalPnL: 3400,
          riskScore: 65,
          transactions: 189,
          lastActive: "2024-01-11",
        },
      ];
      setLeaderboardData(mockData);
      setLoading(false);
    }, 1500);
  }, []);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatCurrency = (value: number) => {
    if (Math.abs(value) >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    if (Math.abs(value) >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  const getRiskColor = (score: number) => {
    if (score <= 30) return "text-green-400";
    if (score <= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const sortedData = [...leaderboardData].sort((a, b) => {
    switch (sortBy) {
      case "totalPnL":
        return b.totalPnL - a.totalPnL;
      case "riskScore":
        return a.riskScore - b.riskScore;
      default:
        return b.totalValue - a.totalValue;
    }
  });

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            DeFi Leaderboard
          </h1>
          <p className="text-gray-400 text-lg">
            Compete with the best DeFi traders and see how you rank
          </p>
        </motion.div>

        {/* Sort Controls */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button
            onClick={() => setSortBy("totalValue")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              sortBy === "totalValue"
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Portfolio Value
          </button>
          <button
            onClick={() => setSortBy("totalPnL")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              sortBy === "totalPnL"
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Total P&L
          </button>
          <button
            onClick={() => setSortBy("riskScore")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              sortBy === "riskScore"
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Risk Score
          </button>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading leaderboard...</p>
            </div>
          </div>
        ) : (
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Header Row */}
            <div className="grid grid-cols-7 gap-4 px-6 py-4 bg-gray-800/80 border-b border-gray-700 text-gray-300 font-semibold text-sm">
              <div>Rank</div>
              <div className="col-span-2">Wallet</div>
              <div>Portfolio</div>
              <div>P&L</div>
              <div>Risk</div>
              <div>Transactions</div>
            </div>

            {/* Leaderboard Entries */}
            <div className="divide-y divide-gray-700">
              {sortedData.map((entry, index) => (
                <motion.div
                  key={entry.address}
                  className="grid grid-cols-7 gap-4 px-6 py-4 hover:bg-gray-700/30 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="flex items-center">
                    <span className="text-2xl">{getRankIcon(entry.rank)}</span>
                  </div>

                  <div className="col-span-2">
                    <div className="font-mono text-purple-400 font-medium">
                      {formatAddress(entry.address)}
                    </div>
                    <div className="text-gray-500 text-sm">
                      Active {entry.lastActive}
                    </div>
                  </div>

                  <div className="text-white font-semibold">
                    {formatCurrency(entry.totalValue)}
                  </div>

                  <div
                    className={`font-semibold ${
                      entry.totalPnL >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {entry.totalPnL >= 0 ? "+" : ""}
                    {formatCurrency(entry.totalPnL)}
                  </div>

                  <div
                    className={`font-semibold ${getRiskColor(entry.riskScore)}`}
                  >
                    {entry.riskScore}%
                  </div>

                  <div className="text-gray-300">
                    {entry.transactions.toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Coming Soon Features */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Coming Soon</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
              <div className="text-3xl mb-3">🏆</div>
              <h4 className="font-semibold text-white mb-2">Competitions</h4>
              <p className="text-gray-400 text-sm">
                Weekly trading competitions with rewards
              </p>
            </div>

            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
              <div className="text-3xl mb-3">👥</div>
              <h4 className="font-semibold text-white mb-2">Social Features</h4>
              <p className="text-gray-400 text-sm">
                Follow traders and share strategies
              </p>
            </div>

            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
              <div className="text-3xl mb-3">🎖️</div>
              <h4 className="font-semibold text-white mb-2">Achievements</h4>
              <p className="text-gray-400 text-sm">
                Unlock badges and special titles
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
