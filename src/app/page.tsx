// src/app/page.tsx
'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Carregamento dinâmico para melhor performance do fluxo 2D→3D
const AnimationController = dynamic(
  () => import('@/components/AnimationController'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-mono">Loading Wonderland...</p>
        </div>
      </div>
    )
  }
);

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-2xl animate-pulse">Preparing wonderland...</div>
        </div>
      }>
        <AnimationController />
      </Suspense>
      
      {/* Instrução fixa no bottom */}
      <div className="fixed bottom-8 left-0 right-0 text-center pointer-events-none z-10">
        <p className="text-white/80 text-sm font-mono animate-pulse">
          click anywhere to follow the white rabbit
        </p>
      </div>
    </div>
  );
}