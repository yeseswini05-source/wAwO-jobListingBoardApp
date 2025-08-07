import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState(0);

  useEffect(() => {
    const phases = [0, 1, 2, 3];
    let phaseIndex = 0;
    
    const interval = setInterval(() => {
      phaseIndex = (phaseIndex + 1) % phases.length;
      setCurrentPhase(phases[phaseIndex]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const particleVariants = {
    animate: {
      y: [-20, -60, -20],
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="ultimate-loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Animated Background */}
      <div className="loading-background">
        <motion.div 
          className="gradient-orb orb-1"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="gradient-orb orb-2"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Floating Particles */}
      <div className="floating-particles">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${10 + i * 7}%`,
              top: `${20 + (i % 3) * 20}%`
            }}
            variants={particleVariants}
            animate="animate"
            transition={{
              delay: i * 0.2,
              duration: 2 + (i % 3),
              repeat: Infinity
            }}
          />
        ))}
      </div>

      {/* Main Logo Container */}
      <div className="ultimate-logo-container">
        <motion.div
          className="logo-glow"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <svg width="320" height="120" viewBox="0 0 320 120" className="ultimate-logo-svg">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="50%" stopColor="#764ba2" />
              <stop offset="100%" stopColor="#f093fb" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/> 
              </feMerge>
            </filter>
          </defs>
          
          {/* W - Morphing Triangular Shape */}
          <motion.path
            d="M20,80 L35,30 L50,80 L65,30 L80,80"
            fill="none"
            stroke="url(#logoGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0, scale: 0.5 }}
            animate={{ 
              pathLength: 1, 
              opacity: 1, 
              scale: 1,
              rotateY: currentPhase === 0 ? [0, 360] : 0
            }}
            transition={{ 
              pathLength: { duration: 1.2, ease: "easeInOut" },
              opacity: { duration: 0.8, delay: 0.2 },
              scale: { duration: 1, delay: 0.1, ease: "backOut" },
              rotateY: { duration: 2, ease: "easeInOut" }
            }}
          />
          
          {/* A - Dynamic Triangle */}
          <motion.g>
            <motion.path
              d="M110,80 L125,30 L140,80 M118,60 L132,60"
              fill="none"
              stroke="url(#logoGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0, y: 20 }}
              animate={{ 
                pathLength: 1, 
                opacity: 1, 
                y: 0,
                scale: currentPhase === 1 ? [1, 1.2, 1] : 1
              }}
              transition={{ 
                pathLength: { duration: 1, delay: 0.4, ease: "easeInOut" },
                opacity: { duration: 0.6, delay: 0.6 },
                y: { duration: 0.8, delay: 0.5, ease: "easeOut" },
                scale: { duration: 1.5, ease: "easeInOut" }
              }}
            />
          </motion.g>
          
          {/* W - Second W */}
          <motion.path
            d="M170,80 L185,30 L200,80 L215,30 L230,80"
            fill="none"
            stroke="url(#logoGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0, x: 30 }}
            animate={{ 
              pathLength: 1, 
              opacity: 1, 
              x: 0,
              rotateZ: currentPhase === 2 ? [0, 180, 0] : 0
            }}
            transition={{ 
              pathLength: { duration: 1.2, delay: 0.8, ease: "easeInOut" },
              opacity: { duration: 0.8, delay: 1 },
              x: { duration: 1, delay: 0.9, ease: "easeOut" },
              rotateZ: { duration: 2, ease: "easeInOut" }
            }}
          />
          
          {/* O - Morphing Circle */}
          <motion.ellipse
            cx="275"
            cy="55"
            rx="20"
            ry="25"
            fill="none"
            stroke="url(#logoGradient)"
            strokeWidth="4"
            filter="url(#glow)"
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              rotate: currentPhase === 3 ? 360 : 0,
              rx: currentPhase === 3 ? [20, 30, 20] : 20,
              ry: currentPhase === 3 ? [25, 15, 25] : 25
            }}
            transition={{ 
              scale: { duration: 1, delay: 1.2, ease: "backOut" },
              opacity: { duration: 0.6, delay: 1.4 },
              rotate: { duration: 2, ease: "easeInOut" },
              rx: { duration: 1.5, ease: "easeInOut" },
              ry: { duration: 1.5, ease: "easeInOut" }
            }}
          />
        </svg>
        
        {/* Animated Tagline */}
        <motion.div
          className="ultimate-tagline"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2, duration: 1, ease: "easeOut" }}
        >
          <motion.span
            className="wanna-text"
            animate={{ 
              color: ["#667eea", "#764ba2", "#f093fb", "#667eea"],
              textShadow: [
                "0 0 10px rgba(102, 126, 234, 0.5)",
                "0 0 20px rgba(118, 75, 162, 0.5)",
                "0 0 15px rgba(240, 147, 251, 0.5)",
                "0 0 10px rgba(102, 126, 234, 0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            wanna{" "}
          </motion.span>
          <motion.span
            className="work-text"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              delay: 2.5, 
              duration: 2, 
              repeat: Infinity, 
              repeatDelay: 1,
              ease: "easeInOut" 
            }}
          >
            work
          </motion.span>
          <motion.span
            className="question-mark"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              delay: 3, 
              duration: 1.5, 
              repeat: Infinity, 
              repeatDelay: 2,
              ease: "easeInOut" 
            }}
          >
            ?
          </motion.span>
        </motion.div>
        
        {/* Loading Progress */}
        <motion.div
          className="loading-progress"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ delay: 1.5, duration: 2, ease: "easeInOut" }}
        >
          <motion.div
            className="progress-fill"
            animate={{
              x: ["-100%", "100%"]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;