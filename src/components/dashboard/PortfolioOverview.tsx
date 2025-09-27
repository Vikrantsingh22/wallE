"use client";

import { motion } from "framer-motion";

interface PortfolioOverviewProps {
  totalValue: number;
  performance: {
    totalPnL: number;
    dailyPnL: number;
    weeklyPnL: number;
    monthlyPnL: number;
    bestPerformer: string;
    worstPerformer: string;
  };
  riskAssessment: {
    overallRisk: string;
    riskFactors: string[];
  };
}

export default function PortfolioOverview({
  totalValue,
  performance,
  riskAssessment,
}: PortfolioOverviewProps) {
  const formatCurrency = (value: number) => {
    if (value === 0) return "$0.00";
    if (Math.abs(value) >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    if (Math.abs(value) >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  const getPnLColor = (value: number) => {
    if (value > 0) return "text-green-400";
    if (value < 0) return "text-red-400";
    return "text-gray-400";
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "medium":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "high":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Portfolio Value */}
      <motion.div
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-gray-300 mb-4">
          Portfolio Value
        </h3>
        <div className="text-3xl font-bold text-white mb-2">
          {formatCurrency(totalValue)}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">24h P&L</span>
            <span
              className={`font-semibold ${getPnLColor(performance.dailyPnL)}`}
            >
              {performance.dailyPnL > 0 ? "+" : ""}
              {formatCurrency(performance.dailyPnL)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">7d P&L</span>
            <span
              className={`font-semibold ${getPnLColor(performance.weeklyPnL)}`}
            >
              {performance.weeklyPnL > 0 ? "+" : ""}
              {formatCurrency(performance.weeklyPnL)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">30d P&L</span>
            <span
              className={`font-semibold ${getPnLColor(performance.monthlyPnL)}`}
            >
              {performance.monthlyPnL > 0 ? "+" : ""}
              {formatCurrency(performance.monthlyPnL)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Performance Summary */}
      <motion.div
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold text-gray-300 mb-4">
          Performance
        </h3>
        <div className="space-y-4">
          <div>
            <div className="text-2xl font-bold mb-1">
              <span className={getPnLColor(performance.totalPnL)}>
                {performance.totalPnL > 0 ? "+" : ""}
                {formatCurrency(performance.totalPnL)}
              </span>
            </div>
            <div className="text-gray-400 text-sm">Total P&L</div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Best Performer</span>
              <span className="text-green-400 font-medium text-sm">
                {performance.bestPerformer || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Worst Performer</span>
              <span className="text-red-400 font-medium text-sm">
                {performance.worstPerformer || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Risk Assessment */}
      <motion.div
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-gray-300 mb-4">
          Risk Assessment
        </h3>
        <div className="mb-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getRiskColor(
              riskAssessment.overallRisk
            )}`}
          >
            {riskAssessment.overallRisk} Risk
          </span>
        </div>

        {riskAssessment.riskFactors &&
          riskAssessment.riskFactors.length > 0 && (
            <div>
              <h4 className="text-gray-400 text-sm mb-2">Risk Factors:</h4>
              <ul className="space-y-1">
                {riskAssessment.riskFactors.slice(0, 3).map((factor, index) => (
                  <li
                    key={index}
                    className="text-gray-300 text-sm flex items-start"
                  >
                    <span className="text-orange-400 mr-2">•</span>
                    {factor}
                  </li>
                ))}
              </ul>
              {riskAssessment.riskFactors.length > 3 && (
                <p className="text-gray-400 text-xs mt-2">
                  +{riskAssessment.riskFactors.length - 3} more factors
                </p>
              )}
            </div>
          )}
      </motion.div>
    </div>
  );
}
