"use client";

import React, { useState } from "react";
import { Wallet, DollarSign, AlertTriangle, Shield } from "lucide-react";

const WalletInspector = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletData, setWalletData] = useState<any>(null);
  const [insights, setInsights] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [includeRoast, setIncludeRoast] = useState(false);
  const [error, setError] = useState("");

  const analyzeWallet = async () => {
    if (!walletAddress.trim()) {
      setError("Please enter a wallet address");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/wallet/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: walletAddress, includeRoast }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setWalletData(data.wallet);
      setInsights(data.insights);
    } catch (err) {
      setError("Failed to analyze wallet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Wallet className="w-8 h-8 text-indigo-600" /> Wallet Inspector
        </h1>

        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
          <input
            type="text"
            placeholder="Enter wallet address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeRoast}
              onChange={(e) => setIncludeRoast(e.target.checked)}
              id="roastToggle"
            />
            <label htmlFor="roastToggle" className="text-gray-700">
              Include Roast Mode 🔥
            </label>
          </div>

          <button
            onClick={analyzeWallet}
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition-colors"
          >
            {isLoading ? "Analyzing..." : "Analyze Wallet"}
          </button>

          {error && <p className="text-red-600">{error}</p>}
        </div>

        {walletData && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-2">Portfolio Overview</h2>
              <p>
                <DollarSign className="inline w-4 h-4 mr-1" /> Total Value:{" "}
                {formatCurrency(walletData.totalValue)}
              </p>
              <p>
                <Shield className="inline w-4 h-4 mr-1" /> Risk:{" "}
                {walletData.riskAssessment.overallRisk}
              </p>
              <p>
                <AlertTriangle className="inline w-4 h-4 mr-1" /> PnL:{" "}
                {formatCurrency(walletData.performance.totalPnL)}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-2">AI Insights</h2>
              <pre className="whitespace-pre-wrap text-gray-800">
                {insights}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletInspector;
