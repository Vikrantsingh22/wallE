"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { motion } from "framer-motion";

interface PerformanceChartProps {
  performance: {
    totalPnL: number;
    dailyPnL: number;
    weeklyPnL: number;
    monthlyPnL: number;
    bestPerformer: string;
    worstPerformer: string;
  };
}

export default function PerformanceChart({
  performance,
}: PerformanceChartProps) {
  // Generate sample data for the chart (in a real app, this would come from API)
  const generateChartData = () => {
    const data = [];
    const now = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);

      // Generate realistic P&L progression
      const baseValue = performance.totalPnL;
      const randomVariation =
        (Math.random() - 0.5) * (Math.abs(baseValue) * 0.1);
      const value = baseValue * (1 - i / 30) + randomVariation;

      data.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        pnl: Math.round(value * 100) / 100,
        timestamp: date.getTime(),
      });
    }

    return data.sort((a, b) => a.timestamp - b.timestamp);
  };

  const chartData = generateChartData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300 text-sm">{label}</p>
          <p
            className={`font-semibold ${
              value >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            P&L: {value >= 0 ? "+" : ""}${value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  const isPositive = performance.totalPnL >= 0;

  return (
    <motion.div
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 space-y-2 sm:space-y-0">
        <h3 className="text-base md:text-lg font-semibold text-white">
          30-Day P&L Performance
        </h3>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div
              className={`text-xl md:text-2xl font-bold ${
                isPositive ? "text-green-400" : "text-red-400"
              }`}
            >
              {isPositive ? "+" : ""}${performance.totalPnL.toFixed(2)}
            </div>
            <div className="text-gray-400 text-xs md:text-sm">Total P&L</div>
          </div>
        </div>
      </div>

      <div className="h-48 md:h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isPositive ? "#10B981" : "#EF4444"}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={isPositive ? "#10B981" : "#EF4444"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              opacity={0.3}
            />
            <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="pnl"
              stroke={isPositive ? "#10B981" : "#EF4444"}
              strokeWidth={2}
              fill="url(#pnlGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Performance indicators */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gray-700">
        <div className="text-center">
          <div
            className={`text-sm md:text-lg font-bold ${
              performance.dailyPnL >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {performance.dailyPnL >= 0 ? "+" : ""}$
            {performance.dailyPnL.toFixed(2)}
          </div>
          <div className="text-gray-400 text-xs md:text-sm">24h</div>
        </div>
        <div className="text-center">
          <div
            className={`text-sm md:text-lg font-bold ${
              performance.weeklyPnL >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {performance.weeklyPnL >= 0 ? "+" : ""}$
            {performance.weeklyPnL.toFixed(2)}
          </div>
          <div className="text-gray-400 text-xs md:text-sm">7d</div>
        </div>
        <div className="text-center">
          <div
            className={`text-sm md:text-lg font-bold ${
              performance.monthlyPnL >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {performance.monthlyPnL >= 0 ? "+" : ""}$
            {performance.monthlyPnL.toFixed(2)}
          </div>
          <div className="text-gray-400 text-xs md:text-sm">30d</div>
        </div>
      </div>
    </motion.div>
  );
}
