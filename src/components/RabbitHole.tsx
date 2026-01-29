// src/components/RabbitHole.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface RabbitHoleProps {
  isOpen: boolean;
  phase?: 'appearing' | 'spinning' | 'falling' | 'complete';
  onComplete?: () => void;
}

export default function RabbitHole({ isOpen, phase = 'appearing', onComplete }: RabbitHoleProps) {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    if (phase === 'spinning') {
      const timer = setTimeout(() => setTextVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'complete' && onComplete) {
      const timer = setTimeout(onComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  // Precompute particles asynchronously in an effect to avoid impure calls during render
  const [particles, setParticles] = useState<
    Array<{ left: string; top: string; x1: number; x2: number; x3: number; duration: number; delay: number }>
    | null
  >(null);

  useEffect(() => {
    const t = setTimeout(() => {
      const arr = Array.from({ length: 20 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        x1: 0,
        x2: Math.random() * 100 - 50,
        x3: Math.random() * 100 - 50,
        duration: 2 + Math.random() * 2,
        delay: Math.random() * 2,
      }));
      setParticles(arr);
    }, 0);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
      {/* Fundo escuro gradiente */}
      <motion.div
        className="absolute inset-0 bg-linear-to-b from-black via-gray-900 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0.9 : 0 }}
        transition={{ duration: 1 }}
      />

      {/* Espiral principal */}
      <motion.div
        className="relative"
        initial={{ scale: 0, rotate: 0 }}
        animate={{
          scale: isOpen ? 1 : 0,
          rotate: phase === 'spinning' || phase === 'falling' ? 1080 : 0,
        }}
        transition={{
          scale: { duration: 1.5, ease: "backOut" },
          rotate: { 
            duration: phase === 'falling' ? 2 : 4,
            ease: phase === 'falling' ? "linear" : "easeInOut",
            repeat: phase === 'spinning' ? Infinity : 0
          }
        }}
      >
        <svg width="600" height="600" viewBox="0 0 600 600" className="drop-shadow-2xl">
          {/* Espiral externa */}
          <motion.path
            d="M300,300 C400,200 300,100 200,200 C100,300 200,400 300,300 C400,200 500,300 400,400 C300,500 200,400 300,300"
            stroke="url(#spiralGradient)"
            strokeWidth="4"
            fill="none"
            strokeDasharray="1500"
            strokeDashoffset="1500"
            animate={{
              strokeDashoffset: isOpen ? 0 : 1500,
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
            }}
          />

          {/* Espiral interna */}
          <motion.path
            d="M300,300 C350,250 300,200 250,250 C200,300 250,350 300,300 C350,250 400,300 350,350 C300,400 250,350 300,300"
            stroke="#FF0000"
            strokeWidth="2"
            fill="none"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            animate={{
              strokeDashoffset: isOpen ? 0 : 1000,
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              opacity: { duration: 2, repeat: Infinity }
            }}
          />

          {/* Centro do buraco - efeito de profundidade */}
          <motion.circle
            cx="300"
            cy="300"
            r="20"
            fill="black"
            animate={{
              scale: phase === 'falling' ? [1, 50, 100] : 1,
              opacity: phase === 'falling' ? [1, 0.5, 0] : 1,
            }}
            transition={{
              duration: 2,
              times: [0, 0.5, 1]
            }}
          />

          {/* Gradiente para a espiral */}
          <defs>
            <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF0000" />
              <stop offset="50%" stopColor="#FF4444" />
              <stop offset="100%" stopColor="#FF0000" />
            </linearGradient>
          </defs>
        </svg>

        {/* Texto animado */}
        <AnimatePresence>
          {textVisible && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="text-center"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-white text-3xl font-light tracking-widest mb-2">
                  follow the rabbit...
                </div>
                <motion.div
                  className="text-red-400 text-4xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  ...into the rabbit hole
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Efeito de partículas vermelhas */}
      {isOpen && (
        <div className="absolute inset-0 overflow-hidden">
          {particles && particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-500 rounded-full"
              style={{ left: p.left, top: p.top }}
              animate={{
                y: [0, -100, -200],
                x: [p.x1, p.x2, p.x3],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
            />
          ))}
        </div>
      )}

      {/* Efeito de distorção/túnel */}
      {phase === 'falling' && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 10%, black 70%)',
          }}
          animate={{
            scale: [1, 0.1],
            opacity: [1, 0],
          }}
          transition={{
            duration: 2,
            ease: "circIn",
          }}
        />
      )}
    </div>
  );
}