// src/components/AnimationController.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import WhiteRabbit2D from '@/components/WhiteRabbit2D';
import WhiteRabbit3D from '@/components/WhiteRabbit3D';
import RabbitHole from '@/components/RabbitHole';

type AnimationPhase = 
  | 'idle'              // Coelho 2D estático
  | 'clicked'           // Usuário clicou
  | 'transforming'      // 2D → 3D
  | 'looking-watch'     // Coelho olha relógio
  | 'hole-appearing'    // Buraco aparece
  | 'hole-spinning'     // Buraco gira
  | 'entering-hole'     // Coelho entra
  | 'falling'           // Caindo no buraco
  | 'transitioning';    // Transição para portfolio

export default function AnimationController() {
  const [phase, setPhase] = useState<AnimationPhase>('idle');
  const [showText, setShowText] = useState(true);
  const router = useRouter();

  // Background particles: generate once in an effect to avoid impure calls during render
  const [bgParticles, setBgParticles] = useState<Array<{left: string; top: string; duration: number; delay: number}> | null>(null);
  useEffect(() => {
    const t = setTimeout(() => {
      const arr = Array.from({ length: 30 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 3,
        delay: Math.random() * 5,
      }));
      setBgParticles(arr);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  // Sequência principal de animações
  useEffect(() => {
    console.log('[AnimationController] phase ->', phase); // debug
    const timers: NodeJS.Timeout[] = [];

    switch (phase) {
      case 'clicked':
        // Inicia transformação
        console.log('[AnimationController] scheduling transforming in 500ms');
        timers.push(setTimeout(() => {
          console.log('[AnimationController] timer: setting transforming');
          setPhase('transforming');
        }, 500));
        break;
      
      case 'transforming':
        // Transforma para 3D
        timers.push(setTimeout(() => setPhase('looking-watch'), 1000));
        break;
      
      case 'looking-watch':
        // Coelho olha relógio, então buraco aparece
        timers.push(setTimeout(() => {
          setShowText(false);
          setPhase('hole-appearing');
        }, 2000));
        break;
      
      case 'hole-appearing':
        // Buraco aparece e começa a girar
        timers.push(setTimeout(() => setPhase('hole-spinning'), 1500));
        break;
      
      case 'hole-spinning':
        // Coelho começa a entrar no buraco
        timers.push(setTimeout(() => setPhase('entering-hole'), 2000));
        break;
      
      case 'entering-hole':
        // Animação de queda
        timers.push(setTimeout(() => setPhase('falling'), 1000));
        break;
      
      case 'falling':
        // Transição final
        timers.push(setTimeout(() => {
          setPhase('transitioning');
          // Redireciona para portfolio
          setTimeout(() => router.push('/portfolio'), 1000);
        }, 2000));
        break;
    }

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [phase, router]);

  const handleRabbitClick = () => {
    if (phase === 'idle') {
      console.log('[AnimationController] rabbit clicked');
      setPhase('clicked');
    }
  };

  // Expose a dev-only helper so headless tests can trigger the click reliably
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__triggerRabbit = () => setPhase(current => current === 'idle' ? 'clicked' : current);
      // expose a getter for tests
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__getPhase = () => phase;
      // allow tests to force a specific phase (dev-only)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__forcePhase = (p: AnimationPhase) => setPhase(p);
      // allow tests to redirect immediately (dev-only)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__redirectToPortfolio = (url = '/portfolio') => router.push(url);
    }
  }, [setPhase, phase, router]);

  const handleHoleComplete = () => {
    if (phase === 'hole-appearing') {
      setPhase('hole-spinning');
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Coelho 2D - Fase inicial */}
      <AnimatePresence>
        {phase === 'idle' && (
          <motion.div
            key="rabbit-2d-container"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            transition={{ duration: 0.8, ease: "backOut" }}
          >
            <WhiteRabbit2D onClick={handleRabbitClick} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Texto principal */}
      <AnimatePresence>
        {showText && (
          <motion.div
            key="main-text"
            className="absolute bottom-20 left-0 right-0 text-center z-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block"
              animate={phase === 'idle' ? {
                scale: [1, 1.03, 1],
                transition: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }
              } : {}}
            >
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wider mb-4">
                follow the white rabbit...
              </h1>
              <p className="text-red-500/70 text-sm md:text-base font-mono tracking-wide">
                {phase === 'idle' 
                  ? 'click the rabbit to begin the journey' 
                  : phase === 'looking-watch' 
                    ? 'the rabbit checks its watch...' 
                    : 'down the rabbit hole we go...'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coelho 3D - Fases de transformação */}
      <AnimatePresence>
        {(phase === 'transforming' || phase === 'looking-watch' || phase === 'entering-hole') && (
          <motion.div
            key="rabbit-3d-container"
            className="absolute inset-0 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WhiteRabbit3D 
              animationPhase={
                phase === 'looking-watch' ? 'looking' :
                phase === 'entering-hole' ? 'enter-hole' :
                'idle'
              }
              speed={1}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buraco do Coelho */}
      <RabbitHole 
        isOpen={phase === 'hole-appearing' || phase === 'hole-spinning' || phase === 'entering-hole' || phase === 'falling'}
        phase={
          phase === 'hole-appearing' ? 'appearing' :
          phase === 'hole-spinning' ? 'spinning' :
          phase === 'falling' ? 'falling' : 'appearing'
        }
        onComplete={handleHoleComplete}
      />

      {/* Efeito de transição final */}
      <AnimatePresence>
        {phase === 'transitioning' && (
          <motion.div
            key="final-transition"
            className="absolute inset-0 z-50 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      {/* Efeitos de partículas de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bgParticles && bgParticles.map((p, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-px h-20 bg-linear-to-b from-transparent via-red-500/10 to-transparent"
            style={{ left: p.left, top: p.top }}
            animate={{ y: [0, -100], opacity: [0, 0.5, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }}
          />
        ))}
      </div>

      {/* Indicador de fase (apenas desenvolvimento) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 left-4 z-50 bg-black/70 text-white px-3 py-2 rounded text-sm font-mono border border-red-500/30">
          <div className="text-red-400">Phase: <span className="text-white">{phase}</span></div>
          <div className="text-xs text-gray-400 mt-1">Click rabbit to start</div>
        </div>
      )}
    </div>
  );
}