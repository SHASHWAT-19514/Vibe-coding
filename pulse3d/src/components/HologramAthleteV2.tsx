"use client";

import { useRef, useMemo, useEffect } from "react";
import { Float, Sparkles, Html, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll, useMotionValueEvent } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: HumanFigureWrapper
// Stylized procedural 3D human athlete.
// ─────────────────────────────────────────────────────────────────────────────
function HumanFigureWrapper({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const holoMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#00E6FF",
    emissive: "#2A7FFF",
    emissiveIntensity: 1.2,
    transparent: true,
    opacity: 0.8,
    metalness: 0.9,
    roughness: 0.1,
    wireframe: true, // Holographic wireframe look
  }), []);

  useFrame((state) => {
    const progress = scrollRef.current;
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      // Synchronize with scroll (2 full turns)
      groupRef.current.rotation.y = progress * Math.PI * 4;

      // Fade/Pulse effects
      const fade = progress < 0.72 ? 1 : Math.max(0, 1 - (progress - 0.72) / 0.1);
      holoMat.opacity = fade * 0.7;
      holoMat.emissiveIntensity = 1.2 * fade + Math.sin(t * 3) * 0.3 * fade;
    }
  });

  const Part = ({ pos, args, type = "capsule" }: any) => (
    <mesh position={pos} material={holoMat}>
      {type === "capsule" ? <capsuleGeometry args={args} /> : <sphereGeometry args={args} />}
    </mesh>
  );

  return (
    <group ref={groupRef} position={[0, -1.8, 0]}>
      {/* Torso - Wider for muscular look */}
      <Part pos={[0, 2.2, 0]} args={[0.42, 1.2, 8, 16]} />

      {/* Muscles: Deltoids (Shoulders) */}
      <Part pos={[-0.6, 3.1, 0]} args={[0.25, 8, 8]} type="sphere" />
      <Part pos={[0.6, 3.1, 0]} args={[0.25, 8, 8]} type="sphere" />

      {/* Head */}
      <Part pos={[0, 3.56, 0]} args={[0.28, 16, 16]} type="sphere" />

      {/* Arms - More muscular definition */}
      <Part pos={[-0.7, 2.5, 0]} args={[0.16, 1.0, 4, 8]} />
      <Part pos={[0.7, 2.5, 0]} args={[0.16, 1.0, 4, 8]} />

      {/* Legs */}
      <Part pos={[-0.35, 0.8, 0]} args={[0.18, 1.6, 4, 8]} />
      <Part pos={[0.35, 0.8, 0]} args={[0.18, 1.6, 4, 8]} />
    </group>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// Existing SpikingShell, HeartSymbol, DNAHelix, etc. (kept for functionality)
// ─────────────────────────────────────────────────────────────────────────────
function SpikingShell({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const origPos = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (meshRef.current) {
      const arr = meshRef.current.geometry.attributes.position.array as Float32Array;
      origPos.current = new Float32Array(arr);
    }
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !origPos.current) return;
    const s = scrollRef.current;
    const t = state.clock.elapsedTime;
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    const spikeProg = THREE.MathUtils.clamp((s - 0.45) / 0.37, 0, 1);
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const orig = origPos.current;

    for (let i = 0; i < posAttr.count; i++) {
      const ox = orig[i * 3], oy = orig[i * 3 + 1], oz = orig[i * 3 + 2];
      const len = Math.sqrt(ox * ox + oy * oy + oz * oz) || 1;
      const nx = ox / len, ny = oy / len, nz = oz / len;
      const noise = Math.sin(i * 2.31 + t * 1.8) * 0.5 + 0.5;
      const spike = spikeProg * (1.8 + noise * 2.5);
      posAttr.setXYZ(i, ox + nx * spike, oy + ny * spike, oz + nz * spike);
    }
    posAttr.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
    mat.color.lerp(new THREE.Color(spikeProg > 0.3 ? "#FF4466" : "#00E6FF"), 0.04);
    // Synchronize rotation with scroll to match the model's orbit (2 full turns = PI * 4)
    meshRef.current.rotation.y = s * Math.PI * 4;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.08; // Subtle drift
  });

  return (
    <mesh ref={meshRef} position={[0, -0.1, 0]}>
      {/* icosahedron detail set to 1 for better triangular mesh structure */}
      <icosahedronGeometry args={[2.45, 1]} />
      <meshBasicMaterial color="#00E6FF" wireframe transparent opacity={0.55} />
    </mesh>
  );
}

function HeartSymbol({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const solidMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const heartGeo = useMemo(() => {
    const s = 0.9; const shape = new THREE.Shape();
    shape.moveTo(0, 0.25 * s);
    shape.bezierCurveTo(-0.25 * s, 0.72 * s, -1.05 * s, 0.72 * s, -1.05 * s, 0.1 * s);
    shape.bezierCurveTo(-1.05 * s, -0.38 * s, -0.55 * s, -0.78 * s, 0, -1.18 * s);
    shape.bezierCurveTo(0.55 * s, -0.78 * s, 1.05 * s, -0.38 * s, 1.05 * s, 0.1 * s);
    shape.bezierCurveTo(1.05 * s, 0.72 * s, 0.25 * s, 0.72 * s, 0, 0.25 * s);
    return new THREE.ExtrudeGeometry(shape, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.08, bevelSegments: 6 });
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !solidMatRef.current) return;
    const s = scrollRef.current;
    const appear = THREE.MathUtils.clamp((s - 0.78) / 0.14, 0, 1);
    const beat = 1 + Math.pow(Math.max(0, Math.sin(state.clock.elapsedTime * 4.8)), 8) * 0.12 * appear;
    groupRef.current.scale.setScalar(appear * beat * 0.72);
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.22;
    solidMatRef.current.opacity = appear;
  });

  return (
    <group ref={groupRef} position={[0, 0.6, 0]} scale={[0, 0, 0]}>
      <mesh geometry={heartGeo}>
        <meshStandardMaterial ref={solidMatRef} color="#CC0033" emissive="#FF0044" transparent opacity={0} />
      </mesh>
    </group>
  );
}

function DNAHelix() {
  const COUNT = 40; const groupRef = useRef<THREE.Group>(null);
  const pointsA = useMemo(() => Array.from({ length: COUNT }, (_, i) => {
    const t = (i / COUNT) * Math.PI * 4;
    return new THREE.Vector3(Math.sin(t) * 2.4, (i / COUNT) * 4.4 - 2.2, Math.cos(t) * 2.4);
  }), []);
  const pointsB = useMemo(() => Array.from({ length: COUNT }, (_, i) => {
    const t = (i / COUNT) * Math.PI * 4 + Math.PI;
    return new THREE.Vector3(Math.sin(t) * 2.4, (i / COUNT) * 4.4 - 2.2, Math.cos(t) * 2.4);
  }), []);
  useFrame((state) => { if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.22; });
  return (
    <group ref={groupRef}>
      {pointsA.map((pt, i) => <mesh key={`a-${i}`} position={pt}><sphereGeometry args={[0.04, 8, 8]} /><meshBasicMaterial color="#00FF9C" transparent opacity={0.8} /></mesh>)}
      {pointsB.map((pt, i) => <mesh key={`b-${i}`} position={pt}><sphereGeometry args={[0.04, 8, 8]} /><meshBasicMaterial color="#2A7FFF" transparent opacity={0.8} /></mesh>)}
    </group>
  );
}

function HeartbeatLine({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const lineRef = useRef<any>(null); const SEG = 80; const W = 5;
  function ecgY(x: number): number {
    const t = x % 1; if (t < 0.28) return 0; if (t < 0.34) return Math.sin(((t - 0.28) / 0.06) * Math.PI) * 0.28;
    if (t < 0.40) return 0; if (t < 0.42) return -Math.sin(((t - 0.40) / 0.02) * Math.PI) * 0.38;
    if (t < 0.46) return Math.sin(((t - 0.42) / 0.04) * Math.PI) * 1.3; if (t < 0.49) return -Math.sin(((t - 0.46) / 0.03) * Math.PI) * 0.28;
    if (t < 0.64) return Math.sin(((t - 0.49) / 0.15) * Math.PI) * 0.22; return 0;
  }
  const initPts = useMemo(() => Array.from({ length: SEG }, (_, i) => new THREE.Vector3((i / SEG) * W - W / 2, 0, 0)), []);
  useFrame((state) => {
    const s = scrollRef.current; const active = s > 0.3 && s < 0.62; if (!lineRef.current) return;
    const offset = (state.clock.elapsedTime * 0.42) % 1;
    const pts = Array.from({ length: SEG }, (_, i) => new THREE.Vector3((i / SEG) * W - W / 2, active ? ecgY(i / SEG + offset) * 0.85 : 0, 0));
    lineRef.current.geometry.setPositions(pts.flatMap(p => [p.x, p.y, p.z]));
    lineRef.current.material.opacity = active ? 0.9 : 0.15;
  });
  return <Line ref={lineRef} points={initPts} color="#00E6FF" lineWidth={1.5} transparent opacity={0.15} position={[0, -2.9, 0]} />;
}

const HUD_ITEMS = [
  { pos: [2.5, 1.2, 0] as [number, number, number], label: "VO₂ MAX", value: "94", unit: "%", color: "#00FF9C", zone: [0.1, 0.3] },
  { pos: [-2.7, 0.7, 0] as [number, number, number], label: "HEART RATE", value: "147", unit: "bpm", color: "#FF4444", zone: [0.30, 0.62] },
  { pos: [2.4, -0.9, 0] as [number, number, number], label: "MUSCLE LOAD", value: "82", unit: "%", color: "#FFB84C", zone: [0.12, 0.38] },
  { pos: [-2.5, -1.1, 0] as [number, number, number], label: "AI COACH", value: "99.7", unit: "IQ", color: "#2A7FFF", zone: [0.72, 0.96] },
  { pos: [0, 2.54, 0] as [number, number, number], label: "NEURAL SYNC", value: "∞", unit: "Hz", color: "#A78BFF", zone: [0.1, 0.9] },
];

function HUDPin({ item, scrollRef }: { item: typeof HUD_ITEMS[0]; scrollRef: React.MutableRefObject<number> }) {
  const gRef = useRef<THREE.Group>(null);
  const offsetRef = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    if (!gRef.current) return;
    const s = scrollRef.current;
    const [lo, hi] = item.zone;

    // Visibility (Simple Lerp)
    const vis = THREE.MathUtils.clamp((s - lo) / 0.06, 0, 1) * THREE.MathUtils.clamp((hi - s) / 0.06, 0, 1);
    gRef.current.scale.lerp(new THREE.Vector3(vis, vis, vis), 0.07);

    // "OUTWARD STRIKE" Animation
    // As the mesh spikes/fades (0.4+), push the HUD items further out until they exit the screen
    const strikeProg = THREE.MathUtils.clamp((s - 0.4) / 0.35, 0, 1);
    const outwardDist = strikeProg * 15; // Push out by up to 15 units to exit viewport

    // Calculate direction from center to item position
    const dir = new THREE.Vector3(...item.pos).normalize();
    offsetRef.current.copy(dir).multiplyScalar(outwardDist);

    gRef.current.position.set(
      item.pos[0] + offsetRef.current.x,
      item.pos[1] + offsetRef.current.y,
      item.pos[2] + offsetRef.current.z
    );
  });

  return (
    <group ref={gRef} scale={[0, 0, 0]} position={item.pos}>
      <Html center distanceFactor={8}>
        <div style={{
          background: "rgba(255, 255, 255, 0.04)",
          border: `1px solid ${item.color}66`,
          borderLeft: `4px solid ${item.color}`,
          borderRadius: "8px",
          padding: "8px 14px",
          fontFamily: "'Courier New', monospace",
          userSelect: "none",
          backdropFilter: "blur(12px)",
          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.2), 0 0 15px ${item.color}15`,
          minWidth: "120px",
          color: "#fff",
          transition: "opacity 0.2s ease"
        }}>
          <div style={{ fontSize: "10px", letterSpacing: "2.5px", color: item.color, opacity: 0.9, marginBottom: "3px", fontWeight: "bold" }}>{item.label}</div>
          <div style={{ fontSize: "24px", fontWeight: "bold", display: "flex", alignItems: "baseline" }}>
            {item.value}
            <span style={{ fontSize: "12px", color: item.color, marginLeft: "5px", opacity: 0.8 }}>{item.unit}</span>
          </div>
          <div style={{ marginTop: "6px", height: "1px", background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`, animation: "scanline 2s linear infinite" }} />
        </div>
      </Html>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT COMPONENT  —  HologramAthleteV2
// ─────────────────────────────────────────────────────────────────────────────
export function HologramAthleteV2() {
  const scrollVal = useRef(0);
  const { scrollYProgress } = useScroll();

  useFrame((state) => {
    scrollVal.current = scrollYProgress.get();
    // Re-render trigger or pass state to children if needed
  });

  return (
    <>
      <Html><style>{`@keyframes scanline { from { background-position: -200% center; } to { background-position: 200% center; } }`}</style></Html>

      <group position={[0, -0, 0]}>
        <DNAHelix />
        <HeartbeatLine scrollRef={scrollVal} />
        {HUD_ITEMS.map((item, i) => (
          <HUDPin key={i} item={item} scrollRef={scrollVal} />
        ))}

        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>

          {/* ── THE PURE 3D BODY (Inside the scene) ── */}
          <HumanFigureWrapper scrollRef={scrollVal} />

          {/* ── Effects that now SURROUND the model ── */}
          <SpikingShell scrollRef={scrollVal} />
          <HeartSymbol scrollRef={scrollVal} />

          <Sparkles count={120} scale={4} size={2} speed={0.3} color="#00E6FF" opacity={0.6} />
          <Sparkles count={60} scale={8} size={3} speed={0.1} color="#00FF9C" opacity={0.3} />
        </Float>
      </group>
    </>
  );
}
