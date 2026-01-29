// src/components/Rabbit3DScene.tsx
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sparkles, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import WhiteRabbit3D from './WhiteRabbit3D';

// Componente do Buraco Espiral
function RabbitHole({ isOpen = false, intensity = 1 }) {
  const holeRef = useRef<THREE.Mesh>(null);
  const spiralRef = useRef<THREE.Line>(null);

  // Memoizamos a linha/geom do espiral uma vez (não depende de isOpen/intensity)
  const spiralLine = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 200;
    const turns = 5;

    for (let i = 0; i <= segments; i++) {
      const progress = i / segments;
      const angle = progress * Math.PI * 2 * turns;
      const radius = 1 - progress;
      const x = Math.cos(angle) * radius * 3;
      const y = Math.sin(angle) * radius * 3;
      const z = -progress * 5;
      points.push(new THREE.Vector3(x, y, z));
    }

    const geom = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color: '#FF3333', linewidth: 2 });
    return new THREE.Line(geom, mat);
  }, []);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (holeRef.current && isOpen) {
      holeRef.current.rotation.z = time * 0.5;
      holeRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1 * intensity);
    }
    
    if (spiralRef.current && isOpen) {
      spiralRef.current.rotation.z = -time * 0.8;
    }
  });

  if (!isOpen) return null; 

  return (
    <group position={[0, -3, 0]}>
      {/* Buraco principal */}
      <mesh ref={holeRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.3, 32, 100, Math.PI * 2]} />
        <meshStandardMaterial 
          color="#FF0000" 
          emissive="#FF0000"
          emissiveIntensity={0.8 * intensity}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Espiral interior */}
      <primitive ref={spiralRef} object={spiralLine} />
      
      {/* Efeito de profundidade */}
      <mesh position={[0, 0, -2.5]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// Componente de Partículas
function RedParticles({ count = 1000 }) {
  const particlesRef = useRef<THREE.Points>(null);
  const [positions, setPositions] = useState<Float32Array | null>(null);
  const [colors, setColors] = useState<Float32Array | null>(null);

  // Gerar arrays com Math.random() dentro de um effect (fora do render) para manter pureza
  useEffect(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const redIntensity = 0.5 + Math.random() * 0.5;
      col[i * 3] = redIntensity; // R
      col[i * 3 + 1] = 0;        // G
      col[i * 3 + 2] = 0;        // B
    }

    const t = setTimeout(() => {
      setPositions(pos);
      setColors(col);
    }, 0);
    return () => clearTimeout(t);
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  if (!positions || !colors) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Componente de Texto Flutuante
function FloatingText({ phase }: { phase: string }) {
  const textRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  const getText = () => {
    switch (phase) {
      case 'idle': return 'follow the\nwhite rabbit';
      case 'looking': return 'checking\nthe time';
      case 'falling': return 'down the\nrabbit hole';
      default: return '';
    }
  };

  if (!getText()) return null;

  return (
    <group ref={textRef} position={[0, 2, 0]}>
      <Text
        fontSize={0.5}
        color="#FF0000"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
        font="/fonts/Inter-Bold.woff"
      >
        {getText()}
      </Text>
    </group>
  );
}

// Componente principal da cena
function SceneContent() {
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'looking' | 'falling'>('idle');
  const [holeIntensity, setHoleIntensity] = useState(0);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([5, 2, 5]);
  const router = useRouter();
  const animationTriggered = useRef(false);

  const handleCanvasClick = () => {
    if (animationTriggered.current) return;
    animationTriggered.current = true;
    
    // Sequência de animações
    setAnimationPhase('looking');
    
    // Animação da câmera
    const cameraAnimation = [
      { pos: [3, 1, 4] as [number, number, number], time: 1000 },
      { pos: [2, 0.5, 3] as [number, number, number], time: 2000 },
      { pos: [1, -1, 2] as [number, number, number], time: 3000 },
      { pos: [0, -3, 1] as [number, number, number], time: 4000 },
    ];
    
    cameraAnimation.forEach(({ pos, time }, index) => {
      setTimeout(() => {
        setCameraPosition(pos);
        if (index === 1) {
          setHoleIntensity(1);
        }
        if (index === 2) {
          setAnimationPhase('falling');
        }
        if (index === 3) {
          // Redireciona para portfolio
          setTimeout(() => router.push('/portfolio'), 1000);
        }
      }, time);
    });
  };

  return (
    <>
      {/* Luzes */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#FF0000" distance={20} decay={1} />
      <pointLight position={[-5, 5, -5]} intensity={0.6} color="#FF6666" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.8} castShadow />
      
      {/* Efeitos de ambiente */}
      <fog attach="fog" args={['#000', 5, 25]} />
      <Stars radius={50} depth={50} count={2000} factor={2} saturation={0} fade speed={0.5} />
      <Sparkles count={200} speed={0.3} opacity={0.6} color="#FF0000" size={1.5} scale={10} />
      
      {/* Coelho 3D */}
      <WhiteRabbit3D animationPhase={animationPhase} speed={animationPhase === 'falling' ? 2 : 1} />
      
      {/* Buraco do coelho */}
      <RabbitHole isOpen={holeIntensity > 0} intensity={holeIntensity} />
      
      {/* Partículas vermelhas */}
      <RedParticles count={800} />
      
      {/* Texto flutuante */}
      <FloatingText phase={animationPhase} />
      
      {/* Efeito de transição quando caindo */}
      {animationPhase === 'falling' && (
        <mesh position={[0, 0, -5]} rotation={[0, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshBasicMaterial color="#000000" transparent opacity={holeIntensity} />
        </mesh>
      )}
      
      {/* Controles da câmera (só no idle) */}
      {animationPhase === 'idle' && (
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={10}
          autoRotate
          autoRotateSpeed={0.5}
        />
      )}
      
      {/* Câmera animada */}
      <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
      
      {/* Efeito de clique invisível sobre toda a cena */}
      <mesh onClick={handleCanvasClick} scale={100}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#000000" transparent opacity={0} />
      </mesh>
    </>
  );
}

// Componente principal exportado
export default function Rabbit3DScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-mono">Loading Wonderland...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
        className="cursor-pointer"
      >
        <color attach="background" args={['#000000']} />
        <SceneContent />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none z-10">
        <p className="text-white/90 text-lg font-light tracking-wider mb-2">
          follow the white rabbit
        </p>
        <p className="text-red-500/70 text-sm font-mono animate-pulse">
          click anywhere to begin the journey
        </p>
      </div>
    </div>
  );
}