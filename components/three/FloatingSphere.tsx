"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere({
  mouse,
}: {
  mouse: React.MutableRefObject<[number, number]>;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.15;

    const [mx, my] = mouse.current;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      my * 0.3,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mx * 0.3 + t * 0.1,
      0.05
    );
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 128, 128]} />
      <MeshDistortMaterial
        color="#f0b429"
        distort={0.38}
        speed={1.8}
        roughness={0.1}
        metalness={0.6}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

function Ring() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.15;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 4, 0, 0]}>
      <torusGeometry args={[1.9, 0.018, 16, 100]} />
      <meshStandardMaterial color="#2dd4bf" transparent opacity={0.5} />
    </mesh>
  );
}

function InnerRing() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    ref.current.rotation.x = -state.clock.getElapsedTime() * 0.1;
  });
  return (
    <mesh ref={ref} rotation={[0, Math.PI / 3, Math.PI / 5]}>
      <torusGeometry args={[1.6, 0.012, 16, 100]} />
      <meshStandardMaterial color="#f0b429" transparent opacity={0.35} />
    </mesh>
  );
}

export function FloatingSphere() {
  const mouse = useRef<[number, number]>([0, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouse.current = [
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -(((e.clientY - rect.top) / rect.height) * 2 - 1),
    ];
  };

  return (
    <div
      className="w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouse.current = [0, 0]; }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#f0b429" />
        <pointLight position={[-5, -3, 2]} intensity={0.6} color="#2dd4bf" />
        <AnimatedSphere mouse={mouse} />
        <Ring />
        <InnerRing />
      </Canvas>
    </div>
  );
}
