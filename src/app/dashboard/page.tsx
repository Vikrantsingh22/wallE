"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PortfolioOverview from "@/components/dashboard/PortfolioOverview";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import InsightsCards from "@/components/dashboard/InsightsCards";
import { motion } from "framer-motion";

interface WalletData {
  address: string;
  totalValue: number;
  transactions: any[];
  riskAssessment: {
    overallRisk: string;
    riskFactors: string[];
  };
  performance: {
    totalPnL: number;
    dailyPnL: number;
    weeklyPnL: number;
    monthlyPnL: number;
    bestPerformer: string;
    worstPerformer: string;
  };
  lastUpdated: string;
}

function DashboardContent() {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [insights, setInsights] = useState<string>("");
  const [hotRoast, setHotRoast] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const searchParams = useSearchParams();
  const { address: connectedAddress } = useAccount();

  const walletAddress = searchParams.get("address") || connectedAddress;

  useEffect(() => {
    if (walletAddress) {
      analyzeWallet(walletAddress);
    }
  }, [walletAddress]);

  const analyzeWallet = async (address: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/wallet/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          includeRoast: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to analyze wallet: ${response.statusText}`);
      }

      const data = await response.json();
      setWalletData(data.wallet);

      // Parse insights to extract roast if present
      try {
        //console.log("Raw insights data:", data.insights);
        const parsedInsights = JSON.parse(data.insights || "{}");
        //console.log("Parsed insights:", parsedInsights);
        const { Roast, ...mainInsights } = parsedInsights;
        //console.log("Extracted roast:", Roast);
        //console.log("Main insights:", mainInsights);

        setInsights(JSON.stringify(mainInsights));
        setHotRoast(Roast || "");
      } catch {
        setInsights(data.insights || "");
        setHotRoast("");
      }
    } catch (err) {
      console.error("Error analyzing wallet:", err);
      setError(err instanceof Error ? err.message : "Failed to analyze wallet");
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!walletAddress) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              No Wallet Address
            </h1>
            <p className="text-gray-400 mb-8">
              Please connect your wallet or enter an address to view the
              dashboard.
            </p>
            <Link
              href="/"
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-8 pt-20">
        {/* Header */}
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Wallet Dashboard
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Analyzing:{" "}
            <span className="text-green-400 font-mono break-all">
              {formatAddress(walletAddress)}
            </span>
          </p>
        </motion.div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Analyzing wallet data...</p>
            </div>
          </div>
        )}

        {error && (
          <motion.div
            className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-red-400 font-semibold mb-2">Analysis Error</h3>
            <p className="text-red-300">{error}</p>
            <button
              onClick={() => analyzeWallet(walletAddress)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Retry Analysis
            </button>
          </motion.div>
        )}

        {walletData && (
          <div className="space-y-6 md:space-y-8">
            {/* Portfolio Overview */}
            <PortfolioOverview
              totalValue={walletData.totalValue}
              performance={walletData.performance}
              riskAssessment={walletData.riskAssessment}
            />

            {/* Performance Chart */}
            <PerformanceChart performance={walletData.performance} />

            {/* Insights Cards */}
            <InsightsCards
              insights={insights}
              hotRoast={hotRoast}
              isLoading={loading}
            />

            {/* Last Updated */}
            <motion.div
              className="text-center text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Last updated: {new Date(walletData.lastUpdated).toLocaleString()}
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}

// Loading component for Suspense fallback
function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}
