/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { WatchModel } from "./WatchModel";
import { ParticleField } from "./ParticleField";
import { SceneLighting } from "./SceneLighting";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface WatchSceneProps {
  strapColor?: string;
  dialColor?: string;
  caseColor?: string;
  metallic?: number;
  roughness?: number;
  isInteractive?: boolean;
}

/**
 * Camera controller that translates normalized scroll-progress (0 to 1) 
 * into smooth, lerped camera movements (orbiting, dollying, panning) at 60fps.
 */
const CameraController: React.FC<{ progress: number; isInteractive: boolean }> = ({
  progress,
  isInteractive,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reducedMotion = useReducedMotion();
  const hasInitialized = React.useRef(false);

  useFrame((state) => {
    // If interactive configurator, set the gorgeous initial 3/4 angle exactly once, and let OrbitControls take over!
    if (isInteractive) {
      if (!hasInitialized.current) {
        state.camera.position.set(1.1, 0.9, isMobile ? 5.0 : 4.0);
        state.camera.lookAt(0, 0, 0);
        hasInitialized.current = true;
      }
      return;
    }

    if (reducedMotion) {
      state.camera.position.set(1.1, 0.9, isMobile ? 5.0 : 4.0);
      state.camera.lookAt(0, 0, 0);
      return;
    }

    // Define beautiful off-axis 3D camera angle checkpoints across 0 to 1 scroll progress.
    // This avoids flat face-on views (which flatten the 3D depth and resemble flat discs)
    let targetX = 1.0;
    let targetY = 0.7;
    let targetZ = 3.8;

    if (progress < 0.25) {
      // 0.0 -> 0.25: Move smoothly from initial 3/4 angle to focus on the crown right-side profile
      const alpha = progress / 0.25;
      targetX = THREE.MathUtils.lerp(1.0, 1.4, alpha);
      targetY = THREE.MathUtils.lerp(0.7, 0.2, alpha);
      targetZ = THREE.MathUtils.lerp(3.8, 3.2, alpha);
    } else if (progress < 0.5) {
      // 0.25 -> 0.5: Focus on bezel & PBR materials texture
      const alpha = (progress - 0.25) / 0.25;
      targetX = THREE.MathUtils.lerp(1.4, -1.5, alpha);
      targetY = THREE.MathUtils.lerp(0.2, -0.4, alpha);
      targetZ = THREE.MathUtils.lerp(3.2, 3.4, alpha);
    } else if (progress < 0.75) {
      // 0.5 -> 0.75: Dolly out slightly to frame integrated strap connection
      const alpha = (progress - 0.5) / 0.25;
      targetX = THREE.MathUtils.lerp(-1.5, 1.1, alpha);
      targetY = THREE.MathUtils.lerp(-0.4, 0.5, alpha);
      targetZ = THREE.MathUtils.lerp(3.4, 3.7, alpha);
    } else {
      // 0.75 -> 1.0: Frame at a premium, off-center 3/4 perspective for the final conversion section
      const alpha = (progress - 0.75) / 0.25;
      targetX = THREE.MathUtils.lerp(1.1, 0.8, alpha);
      targetY = THREE.MathUtils.lerp(0.5, 0.6, alpha);
      targetZ = THREE.MathUtils.lerp(3.7, 3.8, alpha);
    }

    // Push camera back on mobile to avoid viewport clipping
    if (isMobile) {
      targetZ += 0.8;
    }

    // Lerp with dampening factor (0.05) for smooth cinematic physics
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
};

// Import useFrame dynamically from react-three-fiber inside the module
import { useFrame } from "@react-three/fiber";

/**
 * Elegant, luxury fallback loader displayed during WebGL canvas bootstrapping.
 */
const LuxuryFallback: React.FC = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-obsidian text-platinum z-20">
      <div className="relative w-12 h-12 flex items-center justify-center mb-4">
        {/* Repeating golden radial spinner ring */}
        <div className="absolute inset-0 border border-champagne-gold/10 rounded-full" />
        <div className="absolute inset-0 border-t-2 border-champagne-gold rounded-full animate-spin" style={{ animationDuration: "1.2s" }} />
        <span className="text-[10px] font-mono text-champagne-gold font-bold">V</span>
      </div>
      <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-platinum-dim animate-pulse">
        CALIBRATING THREE.JS SCENE...
      </p>
    </div>
  );
};

export const WatchScene: React.FC<WatchSceneProps> = ({
  strapColor,
  dialColor,
  caseColor,
  metallic,
  roughness,
  isInteractive = false,
}) => {
  const scrollProgress = useScrollProgress();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="relative w-full h-full select-none outline-none">
      <Suspense fallback={<LuxuryFallback />}>
        <Canvas
          shadows={true}
          dpr={isMobile ? [1, 1.5] : [1, 2]} // Cap device pixel ratio for mobile performance
          camera={{ position: [1.1, 0.9, isMobile ? 5.0 : 4.0], fov: 45 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.15
          }}
          className="w-full h-full"
        >
          {/* Setup background dust fields */}
          {!isMobile && <ParticleField />}

          {/* Setup specialized materials lights */}
          <SceneLighting />

          {/* Mount the studio environment for gorgeous PBR reflections */}
          <Suspense fallback={null}>
            <Environment preset="studio" />
          </Suspense>

          {/* Setup a soft shadow projected onto a backplate behind the watch */}
          <ContactShadows 
            position={[0, 0, -1.1]} 
            opacity={0.45} 
            scale={5} 
            blur={2.2} 
            far={2.0} 
            rotation={[Math.PI / 2, 0, 0]}
          />

          {/* Mount the procedural high-end watch model */}
          <WatchModel
            strapColor={strapColor}
            dialColor={dialColor}
            caseColor={caseColor}
            metallic={metallic}
            roughness={roughness}
            scrollProgress={scrollProgress}
            isInteractive={isInteractive}
          />

          {/* Attach camera transitions */}
          <CameraController progress={scrollProgress} isInteractive={isInteractive} />

          {/* Interactive controls: enable OrbitControls only in configurator */}
          {isInteractive && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 2 + 0.2}
              minPolarAngle={Math.PI / 2 - 0.4}
              dampingFactor={0.05}
              enableDamping={true}
            />
          )}
        </Canvas>
      </Suspense>
    </div>
  );
};
