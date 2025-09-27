import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Wallet } from "@/lib/models/Wallet";
import { OneInchService } from "@/lib/services/oneInchService";
import { RiskAnalysisService } from "@/lib/services/riskAnalysis";
import { LLMService } from "@/lib/services/llmService";

const oneInch = new OneInchService();
const riskAnalysis = new RiskAnalysisService();
const llmService = new LLMService();

function calculatePerformance(tokenPerformance: any[]) {
  if (!tokenPerformance?.length) {
    //console.log("No token performance data available.");
    return {
      totalPnL: 0,
      dailyPnL: 0,
      weeklyPnL: 0,
      monthlyPnL: 0,
      bestPerformer: "N/A",
      worstPerformer: "N/A",
    };
  }
  const totalPnL = tokenPerformance.reduce(
    (sum, token) => sum + (token.abs_profit_fiat_period || 0),
    0
  );
  let totalNeg = 0;
  let totalPos = 0;

  for (let token of tokenPerformance) {
    if (token.abs_profit_fiat_period < 0) {
      totalNeg += token.abs_profit_fiat_period;
    } else {
      totalPos += token.abs_profit_fiat_period;
    }
  }
  //console.log(
  //   `Total Positive PnL: ${totalPos}, Total Negative PnL: ${totalNeg}`
  // );
  const bestToken = tokenPerformance.reduce((best, t) =>
    t.abs_profit_fiat_period > (best?.abs_profit_fiat_period || -Infinity)
      ? t
      : best
  );
  const worstToken = tokenPerformance.reduce((worst, t) =>
    t.abs_profit_fiat_period < (worst?.abs_profit_fiat_period || Infinity)
      ? t
      : worst
  );
  return {
    totalPnL,
    dailyPnL: totalPnL / 30,
    weeklyPnL: totalPnL / 4,
    monthlyPnL: totalPnL,
    bestPerformer: bestToken?.contract_address || "N/A",
    worstPerformer: worstToken?.contract_address || "N/A",
  };
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { address, includeRoast = false } = await req.json();

    if (!address) {
      return NextResponse.json(
        { error: "Wallet address required" },
        { status: 400 }
      );
    }

    let wallet = await Wallet.findOne({ address });
    const shouldUpdate =
      !wallet || Date.now() - wallet.lastUpdated.getTime() > 5 * 60 * 1000;

    if (shouldUpdate) {
      const [txHistory, portfolioValue, tokenPerformance] = await Promise.all([
        oneInch.getTransactionHistory(address),
        oneInch.getPortfolioValue(address),
        oneInch.getTokenPerformance(address),
      ]);

      // Safely extract data with fallbacks
      const transactions = txHistory?.items || [];
      const portfolioData = portfolioValue?.result || { total: 0 };
      const tokenData = tokenPerformance || [];

      const analyzedTransactions = transactions.map((tx: any) => {
        const { riskScore, riskFlags } = riskAnalysis.analyzeTransaction(tx);
        return { ...tx, riskScore, riskFlags };
      });

      const performance = calculatePerformance(tokenData);
      const walletRisk = riskAnalysis.assessWalletRisk(analyzedTransactions);

      const walletData = {
        address,
        totalValue: portfolioData.total || 0,
        transactions: analyzedTransactions,
        riskAssessment: walletRisk,
        performance,
        lastUpdated: new Date(),
      };

      wallet = await Wallet.findOneAndUpdate({ address }, walletData, {
        upsert: true,
        new: true,
      });
    }

    const insights = await llmService.generateInsights(
      wallet.toObject(),
      includeRoast
    );

    return NextResponse.json({
      wallet: wallet.toObject(),
      insights,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Analysis error:", err);
    return NextResponse.json(
      { error: "Failed to analyze wallet" },
      { status: 500 }
    );
  }
}
