// services/llmService.ts
import Groq from "groq-sdk";

export class LLMService {
  private groq: Groq;

  constructor() {
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY!,
    });
  }

  async generateInsights(
    walletData: {
      totalValue: number;
      performance: { totalPnL: number };
      riskAssessment: { overallRisk: string };
      transactions: any[];
    },
    includeRoast = false
  ) {
    const prompt = this.buildPrompt(walletData, includeRoast);

    // Call Groq SDK (non-streaming)
    const completion = await this.groq.chat.completions.create({
      model: "meta-llama/llama-4-maverick-17b-128e-instruct",
      messages: [{ role: "user", content: prompt }],
      max_completion_tokens: 1024,
      temperature: 1,
      top_p: 1,
    });

    return completion.choices?.[0]?.message?.content || "No insights.";
  }

  buildPrompt(walletData: any, includeRoast: boolean) {
    const { totalValue, performance, riskAssessment, transactions } =
      walletData;
    console.log(walletData);
    let prompt = `Analyze this crypto wallet data and provide insights:
    
Portfolio Value: $${totalValue}
P&L Performance: 
- Total: $${performance.totalPnL}
- Monthly: $${performance.monthlyPnL}
- Best Performer: ${performance.bestPerformer}
- Worst Performer: ${performance.worstPerformer}

Risk Assessment: ${riskAssessment.overallRisk}
Risk Factors: ${riskAssessment.riskFactors.join(", ")}

Recent Activity: ${transactions.length} transactions
NOTE: 
1. STRICTLY PROVIDE DATA IN JSON FORMAT AND DO NOT PROVIDE ANY PREAMBLE OR POSTAMBLE AND THE RESPONSE SHOULD STRICTLY STARTS OPENING BRACE "{" AND ENDING WITH CLOSING BRACE "}" WITH NO OTHER SYMBOLS BEFORE AND AFTER THEM.
2. ENSURE THAT ALL THE SECTIONS ARE DETAILED AND INFORMATIVE.

Provide the response in strict JSON format with the following sections:
{
  "Overall portfolio health assessment": string response,
  "Risk management recommendations": string response,
  "Performance insights": string response,
  "Suggested next steps": string response
}`;

    if (includeRoast) {
      prompt = `Analyze this crypto wallet data and provide insights:
    
Portfolio Value: $${totalValue}
P&L Performance: 
- Total: $${performance.totalPnL}
- Monthly: $${performance.monthlyPnL}
- Best Performer: ${performance.bestPerformer}
- Worst Performer: ${performance.worstPerformer}

Risk Assessment: ${riskAssessment.overallRisk}
Risk Factors: ${riskAssessment.riskFactors.join(", ")}

Recent Activity: ${transactions.length} transactions
NOTE: 
1. STRICTLY PROVIDE DATA IN JSON FORMAT AND DO NOT PROVIDE ANY PREAMBLE OR POSTAMBLE AND THE RESPONSE SHOULD STRICTLY STARTS OPENING BRACE "{" AND ENDING WITH CLOSING BRACE "}" WITH NO OTHER SYMBOLS BEFORE AND AFTER THEM.
2. ENSURE THAT ALL THE SECTIONS EXCEPT "Roast" ARE DETAILED AND INFORMATIVE.
3. THE "Roast" SECTION IN THE JSON SHOULD BE EXTREMELY BRUTAL, BUT KEEP IT LIGHT AND EDUCATIONAL.
Provide the response in strict JSON format with the following sections:
{
  "Overall portfolio health assessment": string response,
  "Risk management recommendations": string response,
  "Performance insights": string response,
  "Suggested next steps": string response,
  "Roast": string response
}
`;
    }

    return prompt;
  }
}
