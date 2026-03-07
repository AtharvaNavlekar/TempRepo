"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles, Stars, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const NUM_NODES = 450;
const RADIUS = 9.0;
const CONNECTION_DISTANCE = 2.4;

function NexusNetwork() {
    const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const groupRef = useRef<THREE.Group>(null);

    // Pre-calculate random positions and lines to save massive CPU computation each frame
    const { positions, staticLinePositions } = useMemo(() => {
        const pos = new Float32Array(NUM_NODES * 3);

        for (let i = 0; i < NUM_NODES; i++) {
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            const r = RADIUS * Math.cbrt(Math.random());

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;
        }

        const lines = [];
        for (let i = 0; i < NUM_NODES; i++) {
            for (let j = i + 1; j < NUM_NODES; j++) {
                const dx = pos[i * 3] - pos[j * 3];
                const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
                const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
                if (dx * dx + dy * dy + dz * dz < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
                    lines.push(
                        pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
                        pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
                    );
                }
            }
        }
        return { positions: pos, staticLinePositions: new Float32Array(lines) };
    }, []);

    // Set up instances on mount
    useEffect(() => {
        if (!instancedMeshRef.current) return;
        const dummy = new THREE.Object3D();

        for (let i = 0; i < NUM_NODES; i++) {
            dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
            // Give some random scale variance
            const scale = Math.random() * 0.5 + 0.5;
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            instancedMeshRef.current.setMatrixAt(i, dummy.matrix);

            // Subtle color variance (mostly gold, some pure white)
            const color = new THREE.Color();
            color.setHex(Math.random() > 0.8 ? 0xffffff : 0xC9A353);
            instancedMeshRef.current.setColorAt(i, color);
        }
        instancedMeshRef.current.instanceMatrix.needsUpdate = true;
        if (instancedMeshRef.current.instanceColor) {
            instancedMeshRef.current.instanceColor.needsUpdate = true;
        }
    }, [positions]);

    // Apply static lines geometry exactly once on mount
    useEffect(() => {
        if (linesRef.current) {
            linesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(staticLinePositions, 3));
        }
    }, [staticLinePositions]);

    // Animate rotation and material fade only (costs almost zero CPU)
    useFrame((state) => {
        if (!groupRef.current || !linesRef.current) return;

        // Gentle rotation of the whole constellation
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        groupRef.current.rotation.z = state.clock.elapsedTime * 0.02;

        // Make the material pulse slightly
        const material = linesRef.current.material as THREE.LineBasicMaterial;
        material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    });

    // Drastically drop polycount (450 nodes * 256 faces was killing the GPU)
    const nodeGeometry = useMemo(() => new THREE.SphereGeometry(0.04, 6, 6), []);
    const nodeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        roughness: 0.1,
        metalness: 1,
        emissive: "#C9A353",
        emissiveIntensity: 0.5
    }), []);

    return (
        <group ref={groupRef}>
            {/* The nodes */}
            <instancedMesh
                ref={instancedMeshRef}
                args={[nodeGeometry, nodeMaterial, NUM_NODES]}
            />
            {/* The energy lines */}
            <lineSegments ref={linesRef}>
                <bufferGeometry />
                <lineBasicMaterial
                    color="#C9A353"
                    transparent
                    opacity={0.15}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </lineSegments>

            {/* Core energy source deep inside */}
            <mesh>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshBasicMaterial color="#C9A353" transparent opacity={0.03} blending={THREE.AdditiveBlending} />
            </mesh>
        </group>
    );
}

export default function Hero3D() {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-64 h-64 border border-gold-dim rounded-full flex items-center justify-center bg-cream-2/50 backdrop-blur">
                    <span className="dmsans text-xs text-gold tracking-widest uppercase">The Nexus</span>
                </div>
            </div>
        );
    }

    // frameloop="demand" helps tremendously with HMR context loss issues
    return (
        <div className="w-full h-full absolute inset-0 z-0 select-none pointer-events-auto">
            <Canvas
                camera={{ position: [0, 0, 12], fov: 45 }}
                dpr={[1, Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 1)]}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} color="#F7F4EE" />

                <Float speed={1} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
                    <NexusNetwork />
                </Float>

                {/* Background stars for deep space illusion */}
                <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

                {/* Foreground magical dust */}
                <Sparkles count={100} scale={10} size={2} speed={0.2} opacity={0.2} color="#C9A353" />

                <ContactShadows position={[0, -4.5, 0]} opacity={0.3} scale={15} blur={3} far={5} color="#0D0D0D" />
            </Canvas>
        </div>
    );
}
