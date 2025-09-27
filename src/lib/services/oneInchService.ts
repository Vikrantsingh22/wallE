export class OneInchService {
  baseURL = "https://api.1inch.dev";
  apiKey = process.env.ONEINCH_API_KEY!;
  headers = {
    Authorization: `Bearer ${this.apiKey}`,
    accept: "application/json",
    "content-type": "application/json",
  };

  async getTransactionHistory(address: string, limit = 50) {
    const res = await fetch(
      `${this.baseURL}/history/v2.0/history/${address}/events`,
      {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          filter: { chain_ids: ["1"], limit },
        }),
      }
    );
    return res.json();
  }

  async getPortfolioValue(address: string) {
    const res = await fetch(
      `${this.baseURL}/portfolio/portfolio/v5.0/general/current_value?addresses=${address}&chain_id=1`,
      { headers: this.headers }
    );
    return res.json();
  }

  async getTokenPerformance(address: string) {
    const res = await fetch(
      `${this.baseURL}/portfolio/portfolio/v5.0/wallet/tokens?chain_id=1&address=${address}`,
      { headers: this.headers }
    );
    return res.json();
  }
}
