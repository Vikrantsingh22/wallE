export class RiskAnalysisService {
  scamContracts = new Set(["0x123...", "0x456..."]);
  highRiskContracts = new Set<string>();

  analyzeTransaction(transaction: any) {
    let riskScore = 0;
    let riskFlags: string[] = [];

    transaction?.tokenActions?.forEach((action: any) => {
      if (this.scamContracts.has(action.address)) {
        riskScore += 10;
        riskFlags.push("SCAM_CONTRACT");
      }
      if (this.highRiskContracts.has(action.address)) {
        riskScore += 5;
        riskFlags.push("HIGH_RISK_CONTRACT");
      }
      if (action.amount === "0" && action.direction === "Out") {
        riskScore += 3;
        riskFlags.push("ZERO_VALUE_TRANSFER");
      }
    });

    return { riskScore, riskFlags };
  }

  assessWalletRisk(transactions: any[]) {
    let totalRisk = 0;
    let allFlags = new Set<string>();

    transactions.forEach((tx) => {
      const { riskScore, riskFlags } = this.analyzeTransaction(tx);
      totalRisk += riskScore;
      riskFlags.forEach((f) => allFlags.add(f));
    });

    const avgRisk = totalRisk / transactions.length;
    let riskLevel = "LOW";
    if (avgRisk > 7) riskLevel = "HIGH";
    else if (avgRisk > 3) riskLevel = "MEDIUM";

    return {
      overallRisk: riskLevel,
      riskFactors: Array.from(allFlags),
      totalRiskScore: totalRisk,
    };
  }
}
