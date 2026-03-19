"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload } from "@react-three/drei";
import { HologramAthleteV2 } from "./HologramAthleteV2";

export function Scene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Base Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#2A7FFF" />
          <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#00E6FF" />
          {/* Warm fill light */}
          <pointLight position={[0, 2, 3]} intensity={0.8} color="#FF6B6B" distance={8} />

          <HologramAthleteV2 />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
