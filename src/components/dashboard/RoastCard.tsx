"use client";

import { motion } from "framer-motion";
import { FireIcon, SparklesIcon } from "@heroicons/react/24/outline";

interface RoastCardProps {
  roast: string;
  delay?: number;
}

const RoastCard: React.FC<RoastCardProps> = ({ roast, delay = 0 }) => {
  if (!roast || roast.trim() === "") {
    return null;
  }

  return (
    <motion.div
      className="bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/5 border border-red-500/30 rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 100,
      }}
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-yellow-500/5 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-500/10 to-transparent rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>

      {/* Floating sparkles effect */}
      <div className="absolute top-4 right-4 text-yellow-400/60">
        <SparklesIcon className="w-5 h-5 animate-pulse" />
      </div>

      <div className="flex items-start space-x-4 relative z-10">
        <div className="text-red-400 flex-shrink-0 relative">
          <FireIcon className="w-7 h-7 animate-pulse group-hover:animate-bounce transition-all duration-300" />
          <div className="absolute inset-0 bg-red-400/20 rounded-full blur-md animate-pulse"></div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <motion.h3
              className="text-red-400 font-bold text-xl flex items-center gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.2 }}
            >
              Hot Roast
              <motion.span
                className="text-2xl"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                🔥
              </motion.span>
            </motion.h3>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.3 }}
            className="relative"
          >
            <p className="text-gray-200 leading-relaxed font-medium whitespace-pre-line text-base relative z-10">
              {roast}
            </p>

            {/* Subtle highlight effect behind text */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
          <div className="flex gap-3 mt-4">
            <motion.button
              onClick={() => {
                const tweetText = `Check out my wallet roast: "${roast.slice(
                  0,
                  200
                )}${roast.length > 200 ? "..." : ""}" 🔥\n\n#WallERoast`;
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  tweetText
                )}`;
                window.open(twitterUrl, "_blank");
              }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Twitter
            </motion.button>

            <motion.button
              onClick={() => {
                const castText = `Check out my wallet roast: "${roast.slice(
                  0,
                  200
                )}${roast.length > 200 ? "..." : ""}" 🔥\n\n#WallERoast #DeFi`;
                const farcasterUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(
                  castText
                )}`;
                window.open(farcasterUrl, "_blank");
              }}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              Farcaster
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: delay + 0.5, duration: 0.8 }}
      />
    </motion.div>
  );
};

export default RoastCard;
