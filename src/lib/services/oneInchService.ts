import axios from "axios";
export class OneInchService {
  baseURL = "https://api.1inch.dev";
  apiKey = process.env.ONEINCH_API_KEY!;
  headers: Record<string, string>;

  constructor() {
    if (!this.apiKey) {
      console.warn(
        "ONEINCH_API_KEY environment variable is not set. API calls may fail."
      );
    }

    this.headers = {
      Authorization: `Bearer ${this.apiKey}`,
      accept: "application/json",
      "content-type": "application/json",
    };
  }

  async getTransactionHistory(address: string, limit = 50) {
    try {
      const res = await axios.post(
        `${this.baseURL}/history/v2.0/history/${address}/events`,
        {
          headers: this.headers,
          data: {
            filter: { chain_ids: ["1"], limit },
          },
        }
      );

      const data = res.data;
      console.log("Transaction History Data:", JSON.stringify(data));
      return data || { items: [] }; // Return empty items array if no data
    } catch (error) {
      console.error("getTransactionHistory error:", error);
      return { items: [] }; // Return fallback data
    }
  }

  async getPortfolioValue(address: string) {
    try {
      const res = await axios.get(
        `${this.baseURL}/portfolio/portfolio/v5.0/general/current_value?addresses=${address}&chain_id=1`,
        { headers: this.headers }
      );

      const data = res.data;
      console.log("Portfolio Value Data:", JSON.stringify(data));
      return data || { result: { total: 0 } }; // Return fallback data
    } catch (error) {
      console.error("getPortfolioValue error:", error);
      return { result: { total: 0 } }; // Return fallback data
    }
  }

  async getTokenPerformance(address: string) {
    try {
      const res = await axios.get(
        `${this.baseURL}/portfolio/portfolio/v5.0/wallet/tokens?chain_id=1&address=${address}`,
        { headers: this.headers }
      );

      const data = res.data;
      console.log("Token Performance Data:", JSON.stringify(data));
      return data || { result: [] }; // Return fallback data
    } catch (error) {
      console.error("getTokenPerformance error:", error);
      return { result: [] }; // Return fallback data
    }
  }
}
