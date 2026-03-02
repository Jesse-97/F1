import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const TrackMesh = () => {
  // Creating a simple 3D loop to represent a generic F1 circuit (like Monza)
  const points = [];
  for (let i = 0; i <= 20; i++) {
    const angle = (i / 20) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * 10, Math.sin(angle * 2) * 2, Math.sin(angle) * 10));
  }
  const curve = new THREE.CatmullRomCurve3(points);

  return (
    <mesh>
      <tubeGeometry args={[curve, 100, 0.15, 8, true]} />
      <MeshDistortMaterial 
        color="#e10600" 
        speed={2} 
        distort={0.1} 
        emissive="#e10600" 
        emissiveIntensity={2} 
      />
    </mesh>
  );
};

export const Track3D = () => (
  <div className="h-[400px] w-full bg-[#111] rounded-xl overflow-hidden border border-white/10">
    <Canvas camera={{ position: [0, 15, 20], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#e10600" />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <TrackMesh />
      </Float>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  </div>
);