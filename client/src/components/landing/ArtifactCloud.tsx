"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface ArtifactData {
    id: number;
    name: string;
    type: string;
    score: number;
    commits?: number;
    layers?: number;
    words?: number;
    geometry: "box" | "sphere" | "icosahedron" | "octahedron" | "torus";
    color: string;
    position: [number, number, number];
}

const ARTIFACTS: ArtifactData[] = [
    {
        id: 1,
        name: "Neural Dashboard",
        type: "Frontend",
        score: 847,
        commits: 234,
        geometry: "icosahedron",
        color: "#CCFF00",
        position: [-2.5, 1.5, 0],
    },
    {
        id: 2,
        name: "Brand Identity v3",
        type: "Design",
        score: 623,
        layers: 89,
        geometry: "octahedron",
        color: "#8A2BE2",
        position: [2, 2, -1],
    },
    {
        id: 3,
        name: "Payment Engine",
        type: "Backend",
        score: 1205,
        commits: 567,
        geometry: "box",
        color: "#FF00FF",
        position: [0, -1.5, 1],
    },
    {
        id: 4,
        name: "Pitch Deck Final",
        type: "Business",
        score: 392,
        words: 15420,
        geometry: "sphere",
        color: "#CCFF00",
        position: [-1.5, -0.5, -2],
    },
    {
        id: 5,
        name: "Mobile App v2",
        type: "Frontend",
        score: 934,
        commits: 312,
        geometry: "torus",
        color: "#8A2BE2",
        position: [3, -0.8, 0.5],
    },
    {
        id: 6,
        name: "AI Model Training",
        type: "ML/AI",
        score: 1567,
        commits: 89,
        geometry: "icosahedron",
        color: "#FF00FF",
        position: [-3, 0.5, 1.5],
    },
    {
        id: 7,
        name: "Recipe Platform",
        type: "Full-Stack",
        score: 718,
        commits: 445,
        geometry: "octahedron",
        color: "#CCFF00",
        position: [1, 1, 2],
    },
    {
        id: 8,
        name: "3D Portfolio",
        type: "Creative",
        score: 523,
        layers: 45,
        geometry: "box",
        color: "#8A2BE2",
        position: [-0.5, 2.5, -0.5],
    },
];

function ArtifactNode({ artifact }: { artifact: ArtifactData }) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [hovered, setHovered] = useState(false);

    const color = useMemo(() => new THREE.Color(artifact.color), [artifact.color]);
    const emissiveIntensity = hovered ? 0.8 : 0.15;

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.3;
            meshRef.current.rotation.y += delta * 0.2;
        }
    });

    const geometry = useMemo(() => {
        switch (artifact.geometry) {
            case "box":
                return <boxGeometry args={[0.6, 0.6, 0.6]} />;
            case "sphere":
                return <sphereGeometry args={[0.4, 32, 32]} />;
            case "icosahedron":
                return <icosahedronGeometry args={[0.45, 0]} />;
            case "octahedron":
                return <octahedronGeometry args={[0.45, 0]} />;
            case "torus":
                return <torusGeometry args={[0.35, 0.15, 16, 32]} />;
            default:
                return <icosahedronGeometry args={[0.45, 0]} />;
        }
    }, [artifact.geometry]);

    return (
        <Float
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={1}
            floatingRange={[-0.2, 0.2]}
        >
            <group position={artifact.position}>
                <mesh
                    ref={meshRef}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    scale={hovered ? 1.3 : 1}
                >
                    {geometry}
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={emissiveIntensity}
                        roughness={0.3}
                        metalness={0.7}
                        wireframe={!hovered}
                        transparent
                        opacity={hovered ? 1 : 0.7}
                    />
                </mesh>

                {/* Glow ring */}
                {hovered && (
                    <mesh scale={1.6}>
                        <ringGeometry args={[0.5, 0.55, 32]} />
                        <meshBasicMaterial
                            color={color}
                            transparent
                            opacity={0.3}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                )}

                {/* Tooltip */}
                {hovered && (
                    <Html
                        center
                        distanceFactor={8}
                        position={[0, 1.2, 0]}
                        style={{ pointerEvents: "none" }}
                    >
                        <div className="bg-obsidian/90 backdrop-blur-md border border-white/10 rounded-bento-sm px-4 py-3 min-w-[180px] shadow-xl">
                            <p className="font-clash font-bold text-white text-sm">
                                {artifact.name}
                            </p>
                            <p className="font-mono text-[10px] text-white/40 tracking-wider uppercase mt-0.5">
                                {artifact.type}
                            </p>
                            <div className="flex items-center gap-3 mt-2 pt-2 border-t border-white/[0.06]">
                                <div>
                                    <span
                                        className="font-clash font-bold text-sm"
                                        style={{ color: artifact.color }}
                                    >
                                        {artifact.score}
                                    </span>
                                    <span className="font-mono text-[8px] text-white/30 ml-1">
                                        PTS
                                    </span>
                                </div>
                                {artifact.commits && (
                                    <div>
                                        <span className="font-mono text-xs text-white/60">
                                            {artifact.commits}
                                        </span>
                                        <span className="font-mono text-[8px] text-white/30 ml-1">
                                            COMMITS
                                        </span>
                                    </div>
                                )}
                                {artifact.layers && (
                                    <div>
                                        <span className="font-mono text-xs text-white/60">
                                            {artifact.layers}
                                        </span>
                                        <span className="font-mono text-[8px] text-white/30 ml-1">
                                            LAYERS
                                        </span>
                                    </div>
                                )}
                                {artifact.words && (
                                    <div>
                                        <span className="font-mono text-xs text-white/60">
                                            {(artifact.words / 1000).toFixed(1)}k
                                        </span>
                                        <span className="font-mono text-[8px] text-white/30 ml-1">
                                            WORDS
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Html>
                )}
            </group>
        </Float>
    );
}

function ParticleField() {
    const pointsRef = useRef<THREE.Points>(null!);
    const count = 500;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return pos;
    }, []);

    useFrame((_, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.02;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#CCFF00"
                transparent
                opacity={0.4}
                sizeAttenuation
            />
        </points>
    );
}

export default function ArtifactCloud() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="w-full h-[600px] md:h-[700px] relative">
            {mounted && (
                <Canvas
                    camera={{ position: [0, 0, 8], fov: 50 }}
                    style={{ background: "transparent" }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#CCFF00" />
                    <pointLight position={[-10, -5, 5]} intensity={0.5} color="#8A2BE2" />
                    <pointLight position={[0, -10, -10]} intensity={0.3} color="#FF00FF" />

                    {ARTIFACTS.map((artifact) => (
                        <ArtifactNode key={artifact.id} artifact={artifact} />
                    ))}

                    <ParticleField />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                        maxPolarAngle={Math.PI / 1.5}
                        minPolarAngle={Math.PI / 3}
                    />
                </Canvas>
            )}

            {/* Edge gradient fades */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-obsidian to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-obsidian to-transparent" />
                <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-obsidian to-transparent" />
                <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-obsidian to-transparent" />
            </div>
        </div>
    );
}
