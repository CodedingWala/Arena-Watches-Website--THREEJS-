/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Sparse, slow-moving gold particle field drifting upward behind the watch.
 * Implemented using highly performant BufferGeometry points to avoid CPU overhead.
 */
export const ParticleField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 40;

  // Generate stable coordinates and speeds
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Spread coordinates symmetrically across X, Y, Z space
      pos[i * 3] = (Math.random() - 0.5) * 6; // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3 - 1; // Z (slightly behind product)
      
      spd[i] = 0.08 + Math.random() * 0.15; // Vertical speed
    }
    return [pos, spd];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    if (!posAttr) return;

    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i);
      y += speeds[i] * delta;
      
      // Wrap around when particle escapes bounds
      if (y > 3.5) {
        y = -3.5;
        // Jitter X coordinate slightly upon respawning to vary pathing
        posAttr.setX(i, (Math.random() - 0.5) * 6);
      }
      
      posAttr.setY(i, y);
    }
    
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#C9A55C" // Champagne Gold tone
        size={0.035}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
