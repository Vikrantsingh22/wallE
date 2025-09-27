"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface AIInsightsProps {
  insights: string;
  walletAddress?: string;
}

export default function AIInsights({
  insights,
  walletAddress,
}: AIInsightsProps) {
  const [showRoast, setShowRoast] = useState(false);
  const [roastContent, setRoastContent] = useState<string>("");
  const [isLoadingRoast, setIsLoadingRoast] = useState(false);

  const fetchRoast = async () => {
    if (!walletAddress) {
      console.error("No wallet address provided for roast");
      return;
    }

    setIsLoadingRoast(true);
    try {
      const response = await fetch("/api/wallet/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: walletAddress,
          includeRoast: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch roast: ${response.statusText}`);
      }

      const data = await response.json();

      // Extract roast content from insights
      const { roast } = parseInsights(data.insights || "");
      if (roast) {
        setRoastContent(roast);
        setShowRoast(true);
      } else {
        setRoastContent(
          "🔥 Your portfolio is more volatile than crypto twitter drama! But hey, at least you're consistent... consistently entertaining! 💎🙌"
        );
        setShowRoast(true);
      }
    } catch (error) {
      console.error("Failed to fetch roast:", error);
      setRoastContent(
        "🔥 Error loading roast, but your trading decisions are probably roast-worthy anyway! 😅"
      );
      setShowRoast(true);
    } finally {
      setIsLoadingRoast(false);
    }
  };

  // Parse insights to separate main content from roast if present
  const parseInsights = (text: string) => {
    const sections = text.split(/(?=🔥|ROAST:|Hot Take:)/i);
    const mainInsights = sections[0];
    const roastSection = sections.find(
      (section) =>
        section.toLowerCase().includes("🔥") ||
        section.toLowerCase().includes("roast") ||
        section.toLowerCase().includes("hot take")
    );

    return { mainInsights: mainInsights.trim(), roast: roastSection?.trim() };
  };

  const { mainInsights, roast } = parseInsights(insights || "");

  return (
    <div className="space-y-6">
      {/* Main AI Insights */}
      <motion.div
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-cyan-500 w-8 h-8 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
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
          <h3 className="text-lg font-semibold text-white">
            AI Insights & Recommendations
          </h3>
        </div>

        <div className="prose prose-gray max-w-none">
          {mainInsights ? (
            <div className="text-gray-300 leading-relaxed whitespace-pre-line">
              {mainInsights}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">No insights available</div>
              <p className="text-gray-500 text-sm">
                AI insights will appear here after wallet analysis
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Hot Roast Section */}
      <motion.div
        className="bg-gradient-to-r from-orange-900/20 to-red-900/20 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-lg">🔥</span>
            </div>
            <h3 className="text-lg font-semibold text-white">Hot Roast</h3>
          </div>

          {!showRoast && !roast && (
            <motion.button
              onClick={fetchRoast}
              disabled={isLoadingRoast}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoadingRoast ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Roasting...</span>
                </div>
              ) : (
                "Get Roasted 🔥"
              )}
            </motion.button>
          )}
        </div>

        <div className="bg-gray-900/50 rounded-xl p-4 border border-orange-500/20">
          {roast || showRoast ? (
            <div className="text-orange-200 leading-relaxed">
              {roast || roastContent}
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="text-orange-300/60 mb-2">
                Ready for some spicy feedback?
              </div>
              <p className="text-orange-400/40 text-sm">
                Our AI will roast your trading decisions with humor and sass!
              </p>
            </div>
          )}
        </div>

        <div className="mt-3 text-xs text-orange-300/60 text-center">
          ⚠️ This is meant to be fun and entertaining. Not financial advice!
        </div>
      </motion.div>
    </div>
  );
}
