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
          <motion.h3 
            className="text-red-400 font-bold mb-4 text-xl flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.2 }}
          >
            Hot Roast 
            <motion.span 
              className="text-2xl"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              🔥
            </motion.span>
          </motion.h3>
          
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