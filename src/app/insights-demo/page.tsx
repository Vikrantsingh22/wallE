"use client";

import { useState } from "react";
import InsightsCards from "@/components/dashboard/InsightsCards";
import { motion } from "framer-motion";

const DEMO_INSIGHTS = {
  valid: JSON.stringify({
    "Overall portfolio health assessment": "Your portfolio shows a balanced approach with moderate risk exposure. The diversification across DeFi protocols indicates strategic thinking, though concentration in high-volatility assets suggests room for risk management improvements.",
    "Risk management recommendations": "Consider reducing exposure to experimental protocols and increasing allocation to established blue-chip tokens. Implement stop-loss strategies for high-risk positions and maintain 10-20% in stablecoins for market downturns.",
    "Performance insights": "Strong performance in the last quarter with 15.3% gains, primarily driven by your early positions in Layer 2 tokens. However, your worst performer (down 32%) in experimental DeFi protocols highlights the importance of position sizing.",
    "Suggested next steps": "1. Rebalance portfolio to reduce risk concentration. 2. Set up automated DCA strategies for accumulation. 3. Consider yield farming opportunities in established protocols. 4. Implement regular profit-taking strategies.",
    "Roast": "You're basically that friend who bought the top of every memecoin but somehow still makes money. Your portfolio looks like you threw darts at CoinGecko while blindfolded, yet you're outperforming most 'serious' traders. Keep doing whatever chaotic magic this is – just maybe add some stablecoins before the next bear market humbles you! 🎯🔥"
  }),
  
  malformed: `{
    "Overall portfolio health": This is not proper JSON syntax
    "Risk assessment": Missing quotes and commas everywhere
  }`,
  
  empty: "",
  
  nonJson: "This is just plain text that mentions portfolio and risk analysis but isn't JSON formatted at all."
};

export default function InsightsDemo() {
  const [selectedDemo, setSelectedDemo] = useState<keyof typeof DEMO_INSIGHTS>("valid");
  const [isLoading, setIsLoading] = useState(false);

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Enhanced Insights Cards Demo
          </h1>
          <p className="text-gray-400 text-lg">
            Testing the improved insights and roast cards with various data scenarios
          </p>
        </motion.div>

        {/* Demo Controls */}
        <motion.div
          className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold text-white mb-4">Demo Controls</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {Object.keys(DEMO_INSIGHTS).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedDemo(key as keyof typeof DEMO_INSIGHTS)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedDemo === key
                    ? "bg-purple-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)} Data
              </button>
            ))}
          </div>

          <button
            onClick={simulateLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Simulate Loading State
          </button>
        </motion.div>

        {/* Current Demo Data Display */}
        <motion.div
          className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-white mb-2">
            Current Demo Data ({selectedDemo}):
          </h3>
          <pre className="text-gray-300 text-sm bg-gray-900/50 p-3 rounded-lg overflow-x-auto">
            {DEMO_INSIGHTS[selectedDemo].substring(0, 200)}
            {DEMO_INSIGHTS[selectedDemo].length > 200 ? "..." : ""}
          </pre>
        </motion.div>

        {/* Enhanced Insights Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <InsightsCards
            insights={DEMO_INSIGHTS[selectedDemo]}
            isLoading={isLoading}
          />
        </motion.div>

        {/* Implementation Notes */}
        <motion.div
          className="bg-green-900/20 border border-green-500/30 rounded-xl p-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-green-400 font-semibold mb-4 text-xl">
            ✅ Implementation Highlights
          </h3>
          <ul className="text-green-300 space-y-2">
            <li>• <strong>Dynamic JSON Parsing:</strong> Robust handling of malformed or incomplete LLM responses</li>
            <li>• <strong>Enhanced Visual Design:</strong> Improved animations, hover effects, and color coding</li>
            <li>• <strong>Dedicated Roast Component:</strong> Separate component with special styling for roast content</li>
            <li>• <strong>Loading States:</strong> Skeleton loaders during data fetching</li>
            <li>• <strong>Error Handling:</strong> Graceful fallbacks for parsing failures</li>
            <li>• <strong>Development Tools:</strong> Error display in development mode for debugging</li>
            <li>• <strong>Responsive Design:</strong> Optimized for mobile and desktop viewing</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}