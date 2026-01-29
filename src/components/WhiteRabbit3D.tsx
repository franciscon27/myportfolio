// src/components/WhiteRabbit3D.tsx
'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WhiteRabbit3DProps {
  animationPhase: 'idle' | 'looking' | 'enter-hole' | 'falling';
  speed?: number;
}

export default function WhiteRabbit3D({ animationPhase, speed = 1 }: WhiteRabbit3DProps) {
  const rabbitRef = useRef<THREE.Group>(null);
  const watchRef = useRef<THREE.Group>(null);
  const eyesRef = useRef<THREE.Group>(null);
  
  // Materiais reutilizáveis (memoizados)
  const whiteMaterial = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: '#FFFFFF', 
    roughness: 0.4,
    metalness: 0.1
  }), []);
  
  const redMaterial = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: '#FF0000', 
    emissive: '#FF0000',
    emissiveIntensity: 0.3
  }), []);
  
  const watchMaterial = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: '#1a1a1a',
    metalness: 0.9,
    roughness: 0.1
  }), []);

  useFrame((state) => {
    if (!rabbitRef.current || !watchRef.current || !eyesRef.current) return;
    
    const time = state.clock.getElapsedTime() * speed;
    
    switch (animationPhase) {
      case 'idle':
        // Animação suave de respiração
        rabbitRef.current.position.y = Math.sin(time * 0.5) * 0.05;
        rabbitRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
        watchRef.current.rotation.y = time * 0.2;
        eyesRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
        break;
        
      case 'looking':
        // Coelho olha para o relógio
        rabbitRef.current.rotation.y = Math.sin(time * 2) * 0.5;
        watchRef.current.position.y = Math.sin(time * 3) * 0.1 + 1.8;
        watchRef.current.rotation.y = time * 3;
        eyesRef.current.lookAt(watchRef.current.position);
        break;
        
      case 'enter-hole':
        // Começa a girar e descer
        rabbitRef.current.rotation.x += 0.05 * speed;
        rabbitRef.current.rotation.z += 0.02 * speed;
        rabbitRef.current.position.y -= 0.1 * speed;
        watchRef.current.rotation.y += 0.2 * speed;
        break;
        
      case 'falling':
        // Gira rápido caindo
        rabbitRef.current.rotation.x += 0.2 * speed;
        rabbitRef.current.rotation.z += 0.15 * speed;
        rabbitRef.current.position.y -= 0.5 * speed;
        watchRef.current.rotation.y += 0.5 * speed;
        break;
    }
  });

  // Limpeza de materiais
  useEffect(() => {
    return () => {
      whiteMaterial.dispose();
      redMaterial.dispose();
      watchMaterial.dispose();
    };
  }, [whiteMaterial, redMaterial, watchMaterial]);

  return (
    <group ref={rabbitRef}>
      {/* Corpo principal */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI]} />
        <primitive object={whiteMaterial} attach="material" />
      </mesh>
      
      {/* Barriga mais clara */}
      <mesh position={[0, -0.3, 0.6]} rotation={[0.3, 0, 0]}>
        <sphereGeometry args={[0.8, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#f8f8f8" roughness={0.6} />
      </mesh>
      
      {/* Cabeça */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.75, 32, 32]} />
        <primitive object={whiteMaterial} attach="material" />
      </mesh>
      
      {/* Focinho */}
      <mesh position={[0, 0.8, 0.9]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#FFCCCC" roughness={0.5} />
      </mesh>
      
      {/* Orelhas */}
      <mesh position={[-0.4, 1.6, 0]} rotation={[0.4, 0, 0.3]}>
        <cylinderGeometry args={[0.1, 0.15, 1.2, 8]} />
        <primitive object={whiteMaterial} attach="material" />
      </mesh>
      <mesh position={[0.4, 1.6, 0]} rotation={[0.4, 0, -0.3]}>
        <cylinderGeometry args={[0.1, 0.15, 1.2, 8]} />
        <primitive object={whiteMaterial} attach="material" />
      </mesh>
      
      {/* Interior das orelhas */}
      <mesh position={[-0.4, 1.6, 0.1]} rotation={[0.4, 0, 0.3]}>
        <cylinderGeometry args={[0.07, 0.1, 1, 8]} />
        <meshStandardMaterial color="#FFCCCC" roughness={0.6} />
      </mesh>
      <mesh position={[0.4, 1.6, 0.1]} rotation={[0.4, 0, -0.3]}>
        <cylinderGeometry args={[0.07, 0.1, 1, 8]} />
        <meshStandardMaterial color="#FFCCCC" roughness={0.6} />
      </mesh>
      
      {/* Grupo dos olhos para animação conjunta */}
      <group ref={eyesRef}>
        {/* Olho esquerdo */}
        <mesh position={[-0.3, 1, 0.7]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <primitive object={redMaterial} attach="material" />
          
          {/* Pupila */}
          <mesh position={[0, 0, 0.08]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color="#000" />
          </mesh>
          
          {/* Brilho */}
          <mesh position={[-0.03, 0.03, 0.12]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} />
          </mesh>
        </mesh>
        
        {/* Olho direito */}
        <mesh position={[0.3, 1, 0.7]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <primitive object={redMaterial} attach="material" />
          
          {/* Pupila */}
          <mesh position={[0, 0, 0.08]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color="#000" />
          </mesh>
          
          {/* Brilho */}
          <mesh position={[-0.03, 0.03, 0.12]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} />
          </mesh>
        </mesh>
      </group>
      
      {/* Patas traseiras */}
      <mesh position={[-0.5, -0.8, 0.5]} rotation={[0.5, 0, 0.2]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <primitive object={whiteMaterial} attach="material" />
      </mesh>
      <mesh position={[0.5, -0.8, 0.5]} rotation={[0.5, 0, -0.2]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <primitive object={whiteMaterial} attach="material" />
      </mesh>
      
      {/* Patas dianteiras */}
      <mesh position={[-0.7, -0.2, 0.7]} rotation={[0, 0, 0.3]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <primitive object={whiteMaterial} attach="material" />
      </mesh>
      <mesh position={[0.7, -0.2, 0.7]} rotation={[0, 0, -0.3]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <primitive object={whiteMaterial} attach="material" />
      </mesh>
      
      {/* Cauda */}
      <mesh position={[0, -0.5, -0.8]}>
        <sphereGeometry args={[0.2, 12, 12]} />
        <primitive object={whiteMaterial} attach="material" />
      </mesh>
      
      {/* Relógio de bolso */}
      <group ref={watchRef} position={[1.3, 1.8, 0]}>
        {/* Corrente */}
        <mesh position={[0, -0.8, 0]} rotation={[0.5, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
          <meshStandardMaterial color="#666" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Elo da corrente */}
        <mesh position={[0, -1.2, 0]}>
          <torusGeometry args={[0.1, 0.03, 8, 16]} />
          <meshStandardMaterial color="#888" metalness={0.9} />
        </mesh>
        
        {/* Relógio */}
        <mesh>
          <cylinderGeometry args={[0.45, 0.45, 0.2, 32]} />
          <primitive object={watchMaterial} attach="material" />
        </mesh>
        
        {/* Tampa traseira */}
        <mesh position={[0, 0, -0.11]}>
          <cylinderGeometry args={[0.43, 0.43, 0.02, 32]} />
          <meshStandardMaterial color="#333" metalness={0.7} />
        </mesh>
        
        {/* Mostrador */}
        <mesh position={[0, 0, 0.105]}>
          <cylinderGeometry args={[0.4, 0.4, 0.02, 32]} />
          <meshStandardMaterial color="#000" />
        </mesh>
        
        {/* Marcações */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const isHour = i % 3 === 0;
          const length = isHour ? 0.06 : 0.03;
          const width = isHour ? 0.02 : 0.01;
          const height = 0.01;
          const radius = 0.32;
          
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle * Math.PI / 180) * radius,
                Math.sin(angle * Math.PI / 180) * radius,
                0.11
              ]}
              rotation={[0, 0, angle * Math.PI / 180]}
            >
              <boxGeometry args={[width, length, height]} />
              <meshStandardMaterial color={isHour ? "#FF0000" : "#888"} emissive={isHour ? "#FF0000" : "#000"} emissiveIntensity={0.2} />
            </mesh>
          );
        })}
        
        {/* Ponteiro das horas */}
        <mesh position={[0, 0, 0.12]} rotation={[0, 0, Math.PI / 3]}>
          <boxGeometry args={[0.02, 0.25, 0.005]} />
          <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.3} />
        </mesh>
        
        {/* Ponteiro dos minutos */}
        <mesh position={[0, 0, 0.125]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.015, 0.35, 0.005]} />
          <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.2} />
        </mesh>
        
        {/* Centro do relógio */}
        <mesh position={[0, 0, 0.13]}>
          <cylinderGeometry args={[0.03, 0.03, 0.01, 16]} />
          <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.5} />
        </mesh>
        
        {/* Vidro do relógio */}
        <mesh position={[0, 0, 0.14]}>
          <cylinderGeometry args={[0.42, 0.42, 0.01, 32]} />
          <meshPhysicalMaterial 
            color="#FFFFFF" 
            transmission={0.9}
            thickness={0.1}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0}
          />
        </mesh>
      </group>
    </group>
  );
}