// lib/models/Wallet.ts
import mongoose, { Schema, models, model } from "mongoose";

const transactionSchema = new Schema({
  txHash: String,
  timeMs: Number,
  type: String,
  direction: String,
  tokenActions: [
    {
      address: String,
      symbol: String,
      amount: String,
      direction: String,
      usdValue: Number,
    },
  ],
  riskScore: { type: Number, default: 0 },
  riskFlags: [String],
});

const walletSchema = new Schema({
  address: { type: String, required: true, unique: true },
  totalValue: Number,
  transactions: [transactionSchema],
  riskAssessment: {
    overallRisk: String,
    riskFactors: [String],
    compromisedContracts: [String],
  },
  performance: {
    totalPnL: Number,
    dailyPnL: Number,
    weeklyPnL: Number,
    monthlyPnL: Number,
    bestPerformer: String,
    worstPerformer: String,
  },
  lastUpdated: { type: Date, default: Date.now },
});

export const Wallet = models.Wallet || model("Wallet", walletSchema);
