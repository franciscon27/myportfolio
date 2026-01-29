// src/components/WhiteRabbit2D.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface WhiteRabbit2DProps {
  onClick?: () => void;
  interactive?: boolean;
}

export default function WhiteRabbit2D({ onClick, interactive = true }: WhiteRabbit2DProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={interactive ? { scale: 1.05 } : {}}
      whileTap={interactive ? { scale: 0.95 } : {}}
      animate={{
        y: [0, -5, 0],
        rotate: isHovered ? [0, 1, -1, 0] : 0,
      }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        },
        rotate: {
          duration: 0.5,
          ease: "easeInOut"
        }
      }}
    >
      <svg
        width="220"
        height="280"
        viewBox="0 0 220 280"
        className="drop-shadow-[0_0_30px_rgba(255,0,0,0.4)]"
      >
        {/* Defs para efeitos */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <radialGradient id="eyeGradient">
            <stop offset="0%" stopColor="#FF0000" stopOpacity="1" />
            <stop offset="100%" stopColor="#990000" stopOpacity="1" />
          </radialGradient>
          
          <linearGradient id="watchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
        </defs>
        
        {/* Corpo branco suave */}
        <ellipse 
          cx="110" 
          cy="170" 
          rx="48" 
          ry="68" 
          fill="white" 
          stroke="#f0f0f0" 
          strokeWidth="2"
        />
        
        {/* Cabeça */}
        <circle 
          cx="110" 
          cy="90" 
          r="38" 
          fill="white" 
          stroke="#f0f0f0" 
          strokeWidth="2"
        />
        
        {/* Orelhas animadas */}
        <motion.path
          d="M85,45 Q85,15 110,35 Q135,15 135,45"
          fill="white"
          stroke="#333"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={isHovered ? {
            d: [
              "M85,45 Q85,15 110,35 Q135,15 135,45",
              "M85,50 Q85,20 110,40 Q135,20 135,50",
              "M85,45 Q85,15 110,35 Q135,15 135,45"
            ]
          } : {}}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        
        {/* Olhos vermelhos brilhantes */}
        <g filter="url(#glow)">
          <circle cx="95" cy="85" r="7" fill="url(#eyeGradient)" />
          <circle cx="125" cy="85" r="7" fill="url(#eyeGradient)" />
        </g>
        
        {/* Brilho nos olhos */}
        <circle cx="93" cy="83" r="2" fill="white" />
        <circle cx="123" cy="83" r="2" fill="white" />
        
        {/* Nariz cor-de-rosa */}
        <ellipse cx="110" cy="105" rx="6" ry="4" fill="#FF6666" />
        
        {/* Bigodes */}
        <g stroke="#333" strokeWidth="1.2" strokeLinecap="round">
          <path d="M65,105 Q50,100 45,105" />
          <path d="M65,110 Q50,115 45,110" />
          <path d="M155,105 Q170,100 175,105" />
          <path d="M155,110 Q170,115 175,110" />
        </g>
        
        {/* Relógio de bolso animado */}
        <motion.g
          transform="translate(145, 130)"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: isHovered ? [1, 1.1, 1] : 1,
          }}
          transition={{
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            },
            scale: {
              duration: 0.3
            }
          }}
        >
          {/* Corrente */}
          <path 
            d="M25,0 Q30,-18 35,0" 
            stroke="#888" 
            strokeWidth="2.5" 
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Relógio */}
          <circle cx="25" cy="12" r="18" fill="url(#watchGradient)" stroke="#666" strokeWidth="2.5" />
          <circle cx="25" cy="12" r="16" fill="#000" />
          
          {/* Marcações do relógio */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
            const length = i % 3 === 0 ? 4 : 2;
            const x1 = 25 + Math.cos(angle * Math.PI / 180) * (16 - length);
            const y1 = 12 + Math.sin(angle * Math.PI / 180) * (16 - length);
            const x2 = 25 + Math.cos(angle * Math.PI / 180) * 16;
            const y2 = 12 + Math.sin(angle * Math.PI / 180) * 16;
            
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={i % 3 === 0 ? "#FF0000" : "#888"}
                strokeWidth={i % 3 === 0 ? "2" : "1"}
              />
            );
          })}
          
          {/* Ponteiros animados */}
          <motion.line
            x1="25" y1="12" x2="25" y2="2"
            stroke="#FF0000"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear"
            }}
            transform="rotate(0, 25, 12)"
          />
          
          <motion.line
            x1="25" y1="12" x2="33" y2="12"
            stroke="#FF0000"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3600,
              repeat: Infinity,
              ease: "linear"
            }}
            transform="rotate(0, 25, 12)"
          />
          
          {/* Centro do relógio */}
          <circle cx="25" cy="12" r="2" fill="#FF0000" />
        </motion.g>
        
        {/* Pata segurando relógio */}
        <ellipse cx="130" cy="155" rx="12" ry="18" fill="white" stroke="#f0f0f0" strokeWidth="2" />
        
        {/* Texto "click me" animado */}
        {interactive && (
          <motion.text
            x="110"
            y="250"
            textAnchor="middle"
            fill="#FF0000"
            fontSize="12"
            fontFamily="monospace"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 1 }}
          >
            • click me •
          </motion.text>
        )}
      </svg>
      
      {/* Efeito de brilho extra (opcional) */}
      {isHovered && interactive && (
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-full h-full bg-red-500/20 blur-xl rounded-full"></div>
        </motion.div>
      )}
    </motion.div>
  );
}