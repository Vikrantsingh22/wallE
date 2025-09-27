export class LLMService {
  openaiKey = process.env.OPENAI_API_KEY!;

  async generateInsights(walletData: any, includeRoast = false) {
    const prompt = this.buildPrompt(walletData, includeRoast);

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.openaiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
      }),
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "No insights.";
  }

  buildPrompt(walletData: any, includeRoast: boolean) {
    const { totalValue, performance, riskAssessment, transactions } =
      walletData;
    let prompt = `Analyze this crypto wallet... Value: $${totalValue}, Risk: ${riskAssessment.overallRisk}, PnL: ${performance.totalPnL}`;
    if (includeRoast)
      prompt += `\nAlso roast their trading decisions humorously.`;
    return prompt;
  }
}
