"use client";

import { motion } from "framer-motion";

interface Transaction {
  id: string;
  type: string;
  timestamp: number;
  from: string;
  to: string;
  value: string;
  token_symbol?: string;
  riskScore?: number;
  riskFlags?: string[];
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({
  transactions,
}: TransactionHistoryProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAddress = (address: string) => {
    if (!address) return "N/A";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "swap":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "transfer":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "receive":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const getRiskColor = (riskScore: number) => {
    if (riskScore >= 80) return "text-red-400";
    if (riskScore >= 50) return "text-yellow-400";
    return "text-green-400";
  };

  if (!transactions || transactions.length === 0) {
    return (
      <motion.div
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          Recent Transactions
        </h3>
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">No transactions found</div>
          <p className="text-gray-500 text-sm">
            Transaction history will appear here once available
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-white mb-6">
        Recent Transactions
      </h3>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {transactions.slice(0, 10).map((tx, index) => (
          <motion.div
            key={tx.id || index}
            className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTransactionTypeColor(
                  tx.type
                )}`}
              >
                {tx.type}
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium">
                    {formatAddress(tx.from)} → {formatAddress(tx.to)}
                  </span>
                  {tx.token_symbol && (
                    <span className="text-gray-400 text-sm">
                      ({tx.token_symbol})
                    </span>
                  )}
                </div>
                <div className="text-gray-400 text-sm">
                  {formatDate(tx.timestamp)}
                </div>

                {tx.riskFlags && tx.riskFlags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {tx.riskFlags.slice(0, 2).map((flag, flagIndex) => (
                      <span
                        key={flagIndex}
                        className="text-xs px-2 py-0.5 bg-orange-500/10 text-orange-400 rounded border border-orange-500/20"
                      >
                        {flag}
                      </span>
                    ))}
                    {tx.riskFlags.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{tx.riskFlags.length - 2} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="text-right">
              <div className="text-white font-medium">
                {tx.value && parseFloat(tx.value) > 0
                  ? `${parseFloat(tx.value).toFixed(4)} ETH`
                  : "N/A"}
              </div>
              {tx.riskScore !== undefined && (
                <div className={`text-sm ${getRiskColor(tx.riskScore)}`}>
                  Risk: {tx.riskScore}%
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {transactions.length > 10 && (
        <div className="mt-4 text-center">
          <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
            View All Transactions ({transactions.length})
          </button>
        </div>
      )}
    </motion.div>
  );
}
