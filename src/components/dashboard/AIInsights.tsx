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
  // Parse insights safely with detailed logging
  const parseInsights = (insightsString: string) => {
    //console.log("🔍 Raw insights received:", insightsString);
    //console.log("🔍 Insights type:", typeof insightsString);

    if (!insightsString) {
      //console.log("❌ No insights provided");
      return { mainInsights: "No insights available", roast: "" };
    }

    try {
      // If insights is already an object, return it
      if (typeof insightsString === "object") {
        //console.log("✅ Insights already parsed:", insightsString);
        const insightsObj = insightsString as any;
        return {
          mainInsights: JSON.stringify(insightsString, null, 2),
          roast: insightsObj.Roast || "",
        };
      }

      // Try to parse as JSON
      const parsed = JSON.parse(insightsString);
      //console.log("✅ Successfully parsed insights:", parsed);

      // Format the insights for display
      const mainInsightsText = Object.entries(parsed)
        .filter(([key]) => key !== "Roast")
        .map(([key, value]) => `**${key}:**\n${value}`)
        .join("\n\n");

      return {
        mainInsights: mainInsightsText || "No insights available",
        roast: parsed.Roast || "",
      };
    } catch (error) {
      console.error("❌ Failed to parse insights JSON:", error);
      //console.log("🔍 Problematic insights string:", insightsString);

      // Try to clean up common JSON issues and parse again
      try {
        const cleaned = insightsString
          .replace(/\n/g, " ") // Remove newlines
          .replace(/\.\",/g, '",') // Fix malformed endings like ."
          .replace(/,\s*}/g, "}") // Remove trailing commas
          .replace(/,\s*]/g, "]") // Remove trailing commas in arrays
          .replace(/no0/g, "no") // Fix specific typo
          .replace(/insightsinsights/g, "insights") // Fix duplicated text
          .replace(/P&L\.to start/g, "P&L. To start") // Fix concatenated text
          .trim();

        //console.log("🔧 Attempting to parse cleaned JSON:", cleaned);
        const cleanedParsed = JSON.parse(cleaned);
        //console.log("✅ Successfully parsed cleaned insights:", cleanedParsed);

        const mainInsightsText = Object.entries(cleanedParsed)
          .filter(([key]) => key !== "Roast")
          .map(([key, value]) => `**${key}:**\n${value}`)
          .join("\n\n");

        return {
          mainInsights: mainInsightsText || "Insights parsed with cleaning",
          roast: cleanedParsed.Roast || "",
        };
      } catch (secondError) {
        console.error("❌ Failed to parse even after cleaning:", secondError);
        // Return raw content if parsing fails completely
        return {
          mainInsights: `Parsing failed. Raw content:\n${insightsString}`,
          roast: "",
        };
      }
    }
  };

  const { mainInsights, roast } = parseInsights(insights);

  const fetchRoast = async () => {
    if (!walletAddress) {
      console.error("❌ No wallet address provided for roast");
      return;
    }

    //console.log("🔥 Fetching roast for wallet:", walletAddress);
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

      //console.log("🌐 Roast API response status:", response.status);

      if (!response.ok) {
        throw new Error(`Failed to fetch roast: ${response.statusText}`);
      }

      const data = await response.json();
      //console.log("📦 Roast API response data:", data);

      // Parse the roast data
      const { roast: fetchedRoast } = parseInsights(data.insights);
      //console.log("🎭 Extracted roast content:", fetchedRoast);

      if (fetchedRoast) {
        setRoastContent(fetchedRoast);
        setShowRoast(true);
      } else {
        setRoastContent(
          "🔥 Your portfolio is more volatile than crypto twitter drama! But hey, at least you're consistent... consistently entertaining! 💎🙌"
        );
        setShowRoast(true);
      }
    } catch (error) {
      console.error("❌ Failed to fetch roast:", error);
      setRoastContent(
        "🔥 Error loading roast, but your trading decisions are probably roast-worthy anyway! 😅"
      );
      setShowRoast(true);
    } finally {
      setIsLoadingRoast(false);
    }
  };

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
          {mainInsights && mainInsights !== "No insights available" ? (
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
                  <div className="w-4 h-4 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
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
