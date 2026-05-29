import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import * as THREE from "three";

function Cloth() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geom = useMemo(() => new THREE.PlaneGeometry(6, 4, 60, 40), []);
  const original = useMemo(() => {
    const pos = geom.attributes.position.array as Float32Array;
    return new Float32Array(pos);
  }, [geom]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pos = geom.attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length; i += 3) {
      const x = original[i];
      const y = original[i + 1];
      const wave =
        Math.sin(x * 0.6 + t * 0.4) * 0.18 +
        Math.cos(y * 0.5 + t * 0.3) * 0.14 +
        Math.sin((x + y) * 0.4 + t * 0.25) * 0.1;
      pos[i + 2] = wave;
    }
    geom.attributes.position.needsUpdate = true;
    geom.computeVertexNormals();

    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(t * 0.05) * 0.04;
      meshRef.current.rotation.x = -0.15 + Math.sin(t * 0.07) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geom} rotation={[-0.15, 0, 0]}>
      <meshStandardMaterial
        color="#e8e4dd"
        side={THREE.DoubleSide}
        roughness={0.95}
        metalness={0}
        flatShading={false}
      />
    </mesh>
  );
}

export function ClothHero() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.innerWidth >= 768;
    if (fine && !reduce && wide) setEnabled(true);
  }, []);

  if (!enabled) {
    // Static elegant fallback: a soft diagonal fold in SVG.
    return (
      <svg
        aria-hidden
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="fold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5f3ee" />
            <stop offset="55%" stopColor="#e8e4dd" />
            <stop offset="100%" stopColor="#d8d2c5" />
          </linearGradient>
        </defs>
        <rect width="800" height="600" fill="url(#fold)" />
        <path d="M0,420 Q400,300 800,460 L800,600 L0,600 Z" fill="#e8e4dd" opacity="0.7" />
      </svg>
    );
  }

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      className="absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 5]} intensity={1.1} color="#fffaf0" />
        <directionalLight position={[-4, -2, 2]} intensity={0.35} color="#e8e4dd" />
        <Cloth />
      </Suspense>
    </Canvas>
  );
}
