"use client";

import { motion } from "framer-motion";
import {
  shortenAddress,
  getEtherscanUrl,
  isValidAddress,
} from "@/lib/utils/addressUtils";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Portfolio Value */}
      <motion.div
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-base md:text-lg font-semibold text-gray-300 mb-3 md:mb-4">
          Portfolio Value
        </h3>
        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
          {formatCurrency(totalValue)}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm md:text-base">24h P&L</span>
            <span
              className={`font-semibold text-sm md:text-base ${getPnLColor(
                performance.dailyPnL
              )}`}
            >
              {performance.dailyPnL > 0 ? "+" : ""}
              {formatCurrency(performance.dailyPnL)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm md:text-base">7d P&L</span>
            <span
              className={`font-semibold text-sm md:text-base ${getPnLColor(
                performance.weeklyPnL
              )}`}
            >
              {performance.weeklyPnL > 0 ? "+" : ""}
              {formatCurrency(performance.weeklyPnL)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm md:text-base">30d P&L</span>
            <span
              className={`font-semibold text-sm md:text-base ${getPnLColor(
                performance.monthlyPnL
              )}`}
            >
              {performance.monthlyPnL > 0 ? "+" : ""}
              {formatCurrency(performance.monthlyPnL)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Performance Summary */}
      <motion.div
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-base md:text-lg font-semibold text-gray-300 mb-3 md:mb-4">
          Performance
        </h3>
        <div className="space-y-3 md:space-y-4">
          <div>
            <div className="text-xl md:text-2xl font-bold mb-1">
              <span className={getPnLColor(performance.totalPnL)}>
                {performance.totalPnL > 0 ? "+" : ""}
                {formatCurrency(performance.totalPnL)}
              </span>
            </div>
            <div className="text-gray-400 text-xs md:text-sm">Total P&L</div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center min-h-[2rem]">
              <span className="text-gray-400 text-xs md:text-sm">
                Best Performer
              </span>
              <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
                {performance.bestPerformer &&
                isValidAddress(performance.bestPerformer) ? (
                  <>
                    <span className="text-green-400 font-medium text-xs md:text-sm font-mono">
                      {shortenAddress(performance.bestPerformer)}
                    </span>
                    <a
                      href={getEtherscanUrl(performance.bestPerformer)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0"
                      title="View on Etherscan"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </>
                ) : (
                  <span className="text-green-400 font-medium text-xs md:text-sm">
                    {performance.bestPerformer || "N/A"}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center min-h-[2rem]">
              <span className="text-gray-400 text-xs md:text-sm">
                Worst Performer
              </span>
              <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
                {performance.worstPerformer &&
                isValidAddress(performance.worstPerformer) ? (
                  <>
                    <span className="text-red-400 font-medium text-xs md:text-sm font-mono">
                      {shortenAddress(performance.worstPerformer)}
                    </span>
                    <a
                      href={getEtherscanUrl(performance.worstPerformer)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0"
                      title="View on Etherscan"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </>
                ) : (
                  <span className="text-red-400 font-medium text-xs md:text-sm">
                    {performance.worstPerformer || "N/A"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Risk Assessment */}
      <motion.div
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-base md:text-lg font-semibold text-gray-300 mb-3 md:mb-4">
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
