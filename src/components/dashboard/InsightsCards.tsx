"use client";

import { motion } from "framer-motion";
import {
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import RoastCard from "./RoastCard";
import { InsightsParser } from "@/lib/utils/insightsParser";

interface InsightsCardsProps {
  insights: string;
  hotRoast?: string;
  isLoading?: boolean;
}

const InsightsCards: React.FC<InsightsCardsProps> = ({
  insights,
  hotRoast,
  isLoading = false,
}) => {
  // Parse insights using the enhanced parser
  const parseResult = InsightsParser.parseInsights(insights);
  const parsedInsights = parseResult.insights;
  const parsingErrors = parseResult.errors;
  
  // Use roast from parser if hotRoast is not provided
  const effectiveRoast = hotRoast || parseResult.roast;

  // Map insight keys to icons and colors with enhanced configuration
  const getInsightConfig = (key: string) => {
    const configs: Record<
      string,
      { 
        icon: React.ComponentType<any>; 
        color: string; 
        bgColor: string;
        title?: string;
      }
    > = {
      "Overall portfolio health assessment": {
        icon: ChartBarIcon,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/20",
        title: "Portfolio Health",
      },
      "Risk management recommendations": {
        icon: ShieldCheckIcon,
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10 border-yellow-500/20",
        title: "Risk Management",
      },
      "Performance insights": {
        icon: ArrowTrendingUpIcon,
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/20",
        title: "Performance Analysis",
      },
      "Suggested next steps": {
        icon: LightBulbIcon,
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 border-purple-500/20",
        title: "Recommendations",
      },
      "Analysis Result": {
        icon: ExclamationTriangleIcon,
        color: "text-orange-400",
        bgColor: "bg-orange-500/10 border-orange-500/20",
        title: "Analysis",
      },
      "Analysis Summary": {
        icon: ExclamationCircleIcon,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/20",
        title: "Summary",
      },
    };

    // Try to find exact match first
    if (configs[key]) {
      return configs[key];
    }

    // Try to find partial match for similar keys
    const lowercaseKey = key.toLowerCase();
    for (const [configKey, config] of Object.entries(configs)) {
      if (lowercaseKey.includes(configKey.toLowerCase().split(' ')[0])) {
        return { ...config, title: formatTitle(key) };
      }
    }

    // Default fallback
    return {
      icon: ChartBarIcon,
      color: "text-gray-400",
      bgColor: "bg-gray-500/10 border-gray-500/20",
      title: formatTitle(key),
    };
  };

  const formatTitle = (key: string) => {
    return key.charAt(0).toUpperCase() + key.slice(1);
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <motion.div
      className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start space-x-4">
        <div className="w-6 h-6 bg-gray-700 rounded animate-pulse flex-shrink-0"></div>
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-gray-700 rounded animate-pulse w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse w-4/6"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Loading State */}
      {isLoading && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Portfolio Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <LoadingSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        </div>
      )}

      {/* Main Insights Cards */}
      {!isLoading && (Object.keys(parsedInsights).length > 0 || hotRoast) && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Portfolio Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main Insights */}
            {Object.entries(parsedInsights).map(([key, value], index) => {
              const config = getInsightConfig(key);
              const IconComponent = config.icon;

              return (
                <motion.div
                  key={key}
                  className={`${config.bgColor} border rounded-xl p-6 hover:scale-[1.02] transition-transform duration-200`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`${config.color} flex-shrink-0`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`${config.color} font-semibold mb-3 text-lg`}>
                        {config.title || formatTitle(key)}
                      </h3>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Hot Roast Card - using dedicated component */}
            {effectiveRoast && (
              <div className="md:col-span-2">
                <RoastCard 
                  roast={effectiveRoast} 
                  delay={Object.keys(parsedInsights).length * 0.1} 
                />
              </div>
            )}
          </div>

          {/* Parsing Errors (if any) - only show in development */}
          {parsingErrors.length > 0 && process.env.NODE_ENV === 'development' && (
            <motion.div
              className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-yellow-400 font-semibold mb-2 text-sm">
                Parsing Issues (Development Only)
              </h4>
              <ul className="text-yellow-300 text-xs space-y-1">
                {parsingErrors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && Object.keys(parsedInsights).length === 0 && !effectiveRoast && (
        <motion.div
          className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ChartBarIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-gray-400 font-semibold mb-2">
            No Insights Available
          </h3>
          <p className="text-gray-500">
            Connect a wallet and analyze it to see AI-powered insights and roasts.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default InsightsCards;
