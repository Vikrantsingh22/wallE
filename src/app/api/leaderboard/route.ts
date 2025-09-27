import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Wallet } from "@/lib/models/Wallet";

export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    // Get query parameters for sorting
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get("sortBy") || "totalPnL";
    const order = searchParams.get("order") || "desc";
    const limit = parseInt(searchParams.get("limit") || "50");

    // Define sort options based on the sortBy parameter
    let sortOptions: any = {};

    switch (sortBy) {
      case "totalPnL":
        sortOptions = { "performance.totalPnL": order === "desc" ? -1 : 1 };
        break;
      case "dailyPnL":
        sortOptions = { "performance.dailyPnL": order === "desc" ? -1 : 1 };
        break;
      case "weeklyPnL":
        sortOptions = { "performance.weeklyPnL": order === "desc" ? -1 : 1 };
        break;
      case "monthlyPnL":
        sortOptions = { "performance.monthlyPnL": order === "desc" ? -1 : 1 };
        break;
      case "totalValue":
        sortOptions = { totalValue: order === "desc" ? -1 : 1 };
        break;
      default:
        sortOptions = { "performance.totalPnL": -1 };
    }

    // Fetch wallets from database with sorting and limit
    const wallets = await Wallet.find({})
      .select({
        address: 1,
        totalValue: 1,
        performance: 1,
        riskAssessment: 1,
        lastUpdated: 1,
      })
      .sort(sortOptions)
      .limit(limit)
      .lean();

    // Transform data for frontend consumption
    const leaderboardData = wallets.map((wallet, index) => ({
      rank: index + 1,
      address: wallet.address,
      totalValue: wallet.totalValue || 0,
      performance: {
        totalPnL: wallet.performance?.totalPnL || 0,
        dailyPnL: wallet.performance?.dailyPnL || 0,
        weeklyPnL: wallet.performance?.weeklyPnL || 0,
        monthlyPnL: wallet.performance?.monthlyPnL || 0,
        bestPerformer: wallet.performance?.bestPerformer || "",
        worstPerformer: wallet.performance?.worstPerformer || "",
      },
      riskLevel: wallet.riskAssessment?.overallRisk || "UNKNOWN",
      lastUpdated: wallet.lastUpdated,
    }));

    return NextResponse.json({
      success: true,
      data: leaderboardData,
      count: leaderboardData.length,
      sortBy,
      order,
    });
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch leaderboard data",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
