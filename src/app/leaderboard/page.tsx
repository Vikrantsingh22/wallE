"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

interface LeaderboardEntry {
  rank: number;
  address: string;
  totalValue: number;
  performance: {
    totalPnL: number;
    dailyPnL: number;
    weeklyPnL: number;
    monthlyPnL: number;
    bestPerformer: string;
    worstPerformer: string;
  };
  riskLevel: string;
  lastUpdated: string;
}

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<
    "totalValue" | "totalPnL" | "dailyPnL" | "weeklyPnL" | "monthlyPnL"
  >("totalPnL");

  const fetchLeaderboardData = async (sortBy: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/leaderboard?sortBy=${sortBy}&limit=50`
      );
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch leaderboard data");
      }

      setLeaderboardData(result.data);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load leaderboard"
      );
      // Fallback to empty array on error
      setLeaderboardData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData(sortBy);
  }, [sortBy]);

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

  const getRiskColor = (score: string) => {
    if (score == "LOW") return "text-green-400";
    if (score == "MEDIUM") return "text-yellow-400";
    return "text-red-400";
  };

  // Data is already sorted by the API, no need to sort again
  const sortedData = leaderboardData;

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
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
          <div className="flex gap-2">
            <button
              onClick={() => fetchLeaderboardData(sortBy)}
              disabled={loading}
              className="px-3 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span className={loading ? "animate-spin" : ""}>🔄</span>
              Refresh
            </button>
          </div>
          <button
            onClick={() => setSortBy("totalValue")}
            disabled={loading}
            className={`px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              sortBy === "totalValue"
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Portfolio Value
          </button>
          <button
            onClick={() => setSortBy("totalPnL")}
            disabled={loading}
            className={`px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              sortBy === "totalPnL"
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Total P&L
          </button>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading leaderboard...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="text-red-400 text-2xl mb-4">⚠️</div>
              <p className="text-red-400 mb-2">Failed to load leaderboard</p>
              <p className="text-gray-500 text-sm mb-4">{error}</p>
              <button
                onClick={() => fetchLeaderboardData(sortBy)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : leaderboardData.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="text-gray-400 text-2xl mb-4">📊</div>
              <p className="text-gray-400">No wallet data available</p>
              <p className="text-gray-500 text-sm">
                Check back later for leaderboard updates
              </p>
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
              <div>Total P&L</div>
              <div>Risk</div>
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
                      Updated {new Date(entry.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="text-white font-semibold">
                    {formatCurrency(entry.totalValue)}
                  </div>

                  <div
                    className={`font-semibold ${
                      entry.performance.totalPnL >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {entry.performance.totalPnL >= 0 ? "+" : ""}
                    {formatCurrency(entry.performance.totalPnL)}
                  </div>

                  <div
                    className={`font-semibold ${getRiskColor(entry.riskLevel)}`}
                  >
                    {entry.riskLevel}
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
