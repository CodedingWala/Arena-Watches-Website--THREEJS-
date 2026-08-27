/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WatchModelProps {
  strapColor?: string;
  dialColor?: string;
  caseColor?: string;
  metallic?: number;
  roughness?: number;
  scrollProgress?: number;
  isInteractive?: boolean;
}

/**
 * Procedural 3D luxury watch model constructed with Three.js geometries and PBR materials.
 * Avoids heavy external glTF assets, optimizing load performance and eliminating licensing issues.
 */
export const WatchModel: React.FC<WatchModelProps> = ({
  strapColor = "#151517",
  dialColor = "#0A0A0B",
  caseColor = "#C9A55C", // default gold-toned
  metallic = 0.9,
  roughness = 0.2,
  scrollProgress = 0,
  isInteractive = false,
}) => {
  const watchGroupRef = useRef<THREE.Group>(null);
  const secondHandRef = useRef<THREE.Group>(null);
  const minuteHandRef = useRef<THREE.Group>(null);
  const hourHandRef = useRef<THREE.Group>(null);
  const tourbillonCageRef = useRef<THREE.Group>(null);
  const balanceWheelRef = useRef<THREE.Group>(null);

  // Constants for hands alignment
  const HANDS_Z = 0.04;

  // Render 12 elegant dial markings arranged mathematically
  const renderMarkers = () => {
    const markers = [];
    const radius = 0.78;
    
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const isMajor = i % 3 === 0;
      const isTwelve = i === 0;

      markers.push(
        <group 
          key={i} 
          position={[Math.sin(angle) * radius, Math.cos(angle) * radius, 0.026]}
          rotation={[0, 0, -angle]}
        >
          {isTwelve ? (
            // Double bar or marker at 12 o'clock
            <mesh>
              <boxGeometry args={[0.07, 0.12, 0.02]} />
              <meshStandardMaterial 
                color="#C9A55C" 
                roughness={0.1} 
                metalness={0.9} 
                emissive="#C9A55C"
                emissiveIntensity={0.15}
              />
            </mesh>
          ) : (
            <mesh>
              <boxGeometry args={[isMajor ? 0.035 : 0.015, isMajor ? 0.1 : 0.05, 0.01]} />
              <meshStandardMaterial 
                color={isMajor ? "#C9A55C" : "#D8D9DB"} 
                roughness={0.15} 
                metalness={0.8} 
              />
            </mesh>
          )}
        </group>
      );
    }
    return markers;
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Constant mechanical sweeping second-hand (mimicking a high-beat automatic movement)
    if (secondHandRef.current) {
      secondHandRef.current.rotation.z = -t * 1.5; // Smooth high-beat sweep
    }

    if (minuteHandRef.current) {
      minuteHandRef.current.rotation.z = -t * 1.5 / 60;
    }

    if (hourHandRef.current) {
      hourHandRef.current.rotation.z = -t * 1.5 / 720;
    }

    // Spin the tourbillon cage and oscillate the mechanical balance wheel
    if (tourbillonCageRef.current) {
      tourbillonCageRef.current.rotation.z = t * 0.4; // 1 rpm tourbillon rate
    }

    if (balanceWheelRef.current) {
      balanceWheelRef.current.rotation.z = Math.sin(t * 16) * 1.25; // 4Hz rapid back-and-forth swing
    }

    // Scroll-driven animation logic
    if (watchGroupRef.current) {
      if (isInteractive) {
        // Configurators: standard slow rotation
        watchGroupRef.current.rotation.y = t * 0.15;
        watchGroupRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
      } else {
        // Scroll scrub rotation: blend constant idle spin with scroll metrics
        const idleSpin = t * 0.08;
        const scrollSpin = scrollProgress * Math.PI * 4; // 2 full turns
        watchGroupRef.current.rotation.y = idleSpin + scrollSpin;
        
        // Gentle bounce or tilt as they scroll past sections
        watchGroupRef.current.rotation.x = Math.sin(t * 0.2) * 0.08 + (scrollProgress * 0.4);
        watchGroupRef.current.position.y = Math.cos(t * 0.4) * 0.05;
      }
    }
  });

  // Decide metal hex values based on caseColor text
  const isGold = caseColor.toLowerCase().includes("gold") || caseColor === "#D4AF37" || caseColor === "#C9A55C";
  const caseMetalColor = isGold ? "#C9A55C" : caseColor;

  const isStrapMetal = strapColor === "#D8D9DB" || strapColor === "#D4AF37";

  // Segment specifications for curved, wrapping straps
  const topStrapSegments = [
    {
      widthStart: 0.82,
      widthEnd: 0.77,
      length: 0.42,
      thickness: 0.09,
      position: [0, 1.15, -0.04] as [number, number, number],
      rotation: [-0.08, 0, 0] as [number, number, number],
    },
    {
      widthStart: 0.77,
      widthEnd: 0.72,
      length: 0.38,
      thickness: 0.08,
      position: [0, 1.52, -0.11] as [number, number, number],
      rotation: [-0.22, 0, 0] as [number, number, number],
    },
    {
      widthStart: 0.72,
      widthEnd: 0.67,
      length: 0.34,
      thickness: 0.07,
      position: [0, 1.84, -0.22] as [number, number, number],
      rotation: [-0.38, 0, 0] as [number, number, number],
    },
  ];

  const bottomStrapSegments = [
    {
      widthStart: 0.82,
      widthEnd: 0.77,
      length: 0.42,
      thickness: 0.09,
      position: [0, -1.15, -0.04] as [number, number, number],
      rotation: [0.08, 0, 0] as [number, number, number],
    },
    {
      widthStart: 0.77,
      widthEnd: 0.72,
      length: 0.38,
      thickness: 0.08,
      position: [0, -1.52, -0.11] as [number, number, number],
      rotation: [0.22, 0, 0] as [number, number, number],
    },
    {
      widthStart: 0.72,
      widthEnd: 0.67,
      length: 0.34,
      thickness: 0.07,
      position: [0, -1.84, -0.22] as [number, number, number],
      rotation: [0.38, 0, 0] as [number, number, number],
    },
  ];

  return (
    <group ref={watchGroupRef} scale={[1.3, 1.3, 1.3]}>
      {/* 1. MAIN WATCH CASE (Back & Middle Body - stepped slightly back in Z) */}
      <mesh castShadow receiveShadow position={[0, 0, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.12, 64]} />
        <meshStandardMaterial 
          color={caseMetalColor} 
          metalness={metallic} 
          roughness={roughness}
        />
      </mesh>

      {/* 2. ELEVATED BEZEL RING (Toroidal ring framing the dial face) */}
      <mesh castShadow position={[0, 0, 0.03]}>
        <torusGeometry args={[0.97, 0.035, 16, 64]} />
        <meshStandardMaterial 
          color={caseMetalColor} 
          metalness={1.0} 
          roughness={0.08}
        />
      </mesh>

      {/* 3. WATCH DIAL FACE (Recessed inside the bezel) */}
      <mesh receiveShadow position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.92, 0.92, 0.01, 64]} />
        <meshStandardMaterial 
          color={dialColor} 
          roughness={0.75} 
          metalness={0.15}
        />
      </mesh>

      {/* Dial circular guilloché line detail */}
      <mesh position={[0, 0, 0.026]}>
        <ringGeometry args={[0.65, 0.66, 64]} />
        <meshBasicMaterial color="#C9A55C" transparent opacity={0.25} />
      </mesh>

      {/* INNER REHAUT RING (Polished inner bezel bevel matching case metal) */}
      <mesh position={[0, 0, 0.028]}>
        <torusGeometry args={[0.925, 0.012, 8, 64]} />
        <meshStandardMaterial 
          color={caseMetalColor} 
          metalness={1.0} 
          roughness={0.05}
        />
      </mesh>

      {/* 4. MASTER COMPLICATION: OSCILLATING TOURBILLON ESCAPEMENT AT 6 O'CLOCK */}
      <group position={[0, -0.38, 0.026]}>
        {/* Outer complications ring */}
        <mesh>
          <ringGeometry args={[0.18, 0.20, 32]} />
          <meshStandardMaterial color="#C9A55C" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Beveled background cutout */}
        <mesh position={[0, 0, -0.005]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.17, 0.17, 0.004, 32]} />
          <meshStandardMaterial color="#0A0A0B" roughness={0.9} metalness={0.0} />
        </mesh>

        {/* Rotating Tourbillon Cage */}
        <group ref={tourbillonCageRef}>
          {/* Main golden bridge bar */}
          <mesh>
            <boxGeometry args={[0.34, 0.025, 0.006]} />
            <meshStandardMaterial color="#C9A55C" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Accent secondary bridge bar */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.2, 0.015, 0.004]} />
            <meshStandardMaterial color="#D8D9DB" metalness={0.9} roughness={0.15} />
          </mesh>

          {/* Rapidly Oscillating Balance Wheel & Hairspring */}
          <group ref={balanceWheelRef}>
            {/* Outer balance ring */}
            <mesh>
              <ringGeometry args={[0.11, 0.13, 24]} />
              <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} />
            </mesh>
            {/* 3 triple balance spokes */}
            {Array.from({ length: 3 }).map((_, i) => (
              <mesh key={i} rotation={[0, 0, (i * Math.PI) / 1.5]}>
                <boxGeometry args={[0.22, 0.012, 0.004]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
              </mesh>
            ))}
            {/* Coiled blue hairspring simulation */}
            {Array.from({ length: 5 }).map((_, i) => (
              <mesh key={i}>
                <ringGeometry args={[0.02 + i * 0.015, 0.022 + i * 0.015, 16, 1, 0, Math.PI * 1.5]} />
                <meshBasicMaterial color="#2B5F8C" transparent opacity={0.6} />
              </mesh>
            ))}
          </group>
        </group>

        {/* Center Pivot Jewel (Synthetic Ruby Core) */}
        <mesh position={[0, 0, 0.012]}>
          <sphereGeometry args={[0.022, 16, 16]} />
          <meshStandardMaterial 
            color="#7A1F2B" 
            roughness={0.05} 
            metalness={0.1} 
            emissive="#7A1F2B"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
      
      {/* Brand Name Label printed on Dial */}
      <mesh position={[0, 0.35, 0.026]}>
        <planeGeometry args={[0.5, 0.1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* 5. HOUR INDEX MARKERS */}
      {renderMarkers()}

      {/* 6. WATCH HANDS ASSEMBLY */}
      {/* Center Pin */}
      <mesh position={[0, 0, HANDS_Z]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
        <meshStandardMaterial color="#C9A55C" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Hour Hand (Brushed Gold, clean arrow) */}
      <group 
        ref={hourHandRef} 
        position={[0, 0, HANDS_Z + 0.005]} 
        rotation={[0, 0, Math.PI * 0.7]}
      >
        <mesh position={[0, 0.16, 0]}>
          <boxGeometry args={[0.06, 0.45, 0.01]} />
          <meshStandardMaterial color="#C9A55C" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>

      {/* Minute Hand (Slightly longer, brushed gold) */}
      <group 
        ref={minuteHandRef} 
        position={[0, 0, HANDS_Z + 0.015]} 
        rotation={[0, 0, Math.PI * 0.2]}
      >
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[0.04, 0.72, 0.01]} />
          <meshStandardMaterial color="#C9A55C" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>

      {/* Second Hand (Ultra-thin sweep hand in deep Crimson accent) */}
      <group 
        ref={secondHandRef} 
        position={[0, 0, HANDS_Z + 0.025]}
        rotation={[0, 0, 0]}
      >
        <mesh position={[0, 0.32, 0]}>
          <boxGeometry args={[0.012, 0.82, 0.005]} />
          <meshStandardMaterial 
            color="#7A1F2B" 
            metalness={0.5} 
            roughness={0.2} 
          />
        </mesh>
        
        {/* Counterweight arrow tail for second-hand */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[0.02, 0.15, 0.005]} />
          <meshStandardMaterial color="#7A1F2B" />
        </mesh>
      </group>

      {/* 7. CRYSTAL GLASS COVER (Thin, extremely transparent sapphire glass cover with clearcoat reflections) */}
      <mesh position={[0, 0, 0.055]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.93, 0.93, 0.005, 64]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          transparent={true}
          opacity={0.08}
          roughness={0.05}
          metalness={0.0}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* 8. STRAP ANCHOR LUGS (Integrated short stubs merging seamlessly with case and matching case finish) */}
      {/* Top Left Lug */}
      <group position={[-0.465, 0.94, -0.05]} rotation={[-0.10, 0, 0]}>
        {/* Main tapered body */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.045, 0.06, 0.16, 24]} />
          <meshStandardMaterial color={caseMetalColor} metalness={1.0} roughness={0.15} />
        </mesh>
        {/* Rounded Tip Sphere */}
        <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color={caseMetalColor} metalness={1.0} roughness={0.15} />
        </mesh>
        {/* Filleted Base Transition Sphere to eliminate seams */}
        <mesh position={[0, -0.08, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={caseMetalColor} metalness={1.0} roughness={0.15} />
        </mesh>
      </group>
      {/* Top Right Lug */}
      <group position={[0.465, 0.94, -0.05]} rotation={[-0.10, 0, 0]}>
        {/* Main tapered body */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.045, 0.06, 0.16, 24]} />
          <meshStandardMaterial color={caseMetalColor} metalness={1.0} roughness={0.15} />
        </mesh>
        {/* Rounded Tip Sphere */}
        <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color={caseMetalColor} metalness={1.0} roughness={0.15} />
        </mesh>
        {/* Filleted Base Transition Sphere to eliminate seams */}
        <mesh position={[0, -0.08, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={caseMetalColor} metalness={1.0} roughness={0.15} />
        </mesh>
      </group>
      {/* Bottom Left Lug */}
      <group position={[-0.465, -0.94, -0.05]} rotation={[-0.10, 0, Math.PI]}>
        {/* Main tapered body */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.045, 0.06, 0.16, 24]} />
          <meshStandardMaterial color={caseMetalColor} metalness={1.0} roughness={0.15} />
        </mesh>
        {/* Rounded Tip Sphere */}
        <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color={caseMetalColor} metalness={1.0} roughness={0.15} />
        </mesh>
        {/* Filleted Base Transition Sphere to eliminate seams */}
        <mesh position={[0, -0.08, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={caseMetalColor} metalness={1.0} roughness={0.15} />
        </mesh>
      </group>
      {/* Bottom Right Lug */}
      <group position={[0.465, -0.94, -0.05]} rotation={[-0.10, 0, Math.PI]}>
        {/* Main tapered body */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.045, 0.06, 0.16, 24]} />
          <meshStandardMaterial color={caseMetalColor} metalness={1.0} roughness={0.15} />
        </mesh>
        {/* Rounded Tip Sphere */}
        <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color={caseMetalColor} metalness={1.0} roughness={0.15} />
        </mesh>
        {/* Filleted Base Transition Sphere to eliminate seams */}
        <mesh position={[0, -0.08, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={caseMetalColor} metalness={1.0} roughness={0.15} />
        </mesh>
      </group>

      {/* 9. CROWN REGULATOR VALVE (Right side, knurled metal crown with fine ridges and crimson center core) */}
      <group position={[1.04, 0, -0.01]} rotation={[0, 0, -Math.PI * 0.5]}>
        {/* Main Crown cylinder */}
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.12, 32]} />
          <meshStandardMaterial color={caseMetalColor} metalness={1.0} roughness={0.15} />
        </mesh>
        
        {/* 12 Knurled ridges for tactility */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 12;
          return (
            <mesh 
              key={i} 
              position={[Math.sin(angle) * 0.12, 0, Math.cos(angle) * 0.12]} 
              rotation={[0, angle, 0]}
            >
              <boxGeometry args={[0.015, 0.11, 0.015]} />
              <meshStandardMaterial color={caseMetalColor} metalness={1.0} roughness={0.1} />
            </mesh>
          );
        })}

        {/* Polished metal cap on top */}
        <mesh position={[0, 0.061, 0]}>
          <cylinderGeometry args={[0.115, 0.115, 0.002, 32]} />
          <meshStandardMaterial color={caseMetalColor} metalness={1.0} roughness={0.15} />
        </mesh>

        {/* Thin elegant crimson jewel inset at the absolute center of the crown */}
        <mesh position={[0, 0.063, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.003, 16]} />
          <meshStandardMaterial color="#7A1F2B" metalness={0.1} roughness={0.1} />
        </mesh>
      </group>

      {/* 10. PREMIUM STRAPS (3-segment beautifully tapered, curved & detailed structures wrapping towards the wrist) */}
      {/* Top Strap Segments */}
      <group>
        {topStrapSegments.map((seg, i) => {
          const avgWidth = (seg.widthStart + seg.widthEnd) / 2;
          return (
            <group key={`top-strap-${i}`} position={seg.position} rotation={seg.rotation}>
              <mesh castShadow receiveShadow>
                <boxGeometry args={[avgWidth, seg.length, seg.thickness]} />
                <meshStandardMaterial 
                  color={strapColor} 
                  roughness={isStrapMetal ? 0.18 : 0.75} 
                  metalness={isStrapMetal ? 0.95 : 0.15} 
                />
              </mesh>
              
              {/* Strap detailing: stitching for leather, grooves for metal */}
              {!isStrapMetal ? (
                <>
                  {/* Left edge hand-stitching */}
                  <mesh position={[-avgWidth / 2 + 0.05, 0, seg.thickness / 2 + 0.002]}>
                    <boxGeometry args={[0.012, seg.length, 0.004]} />
                    <meshBasicMaterial color="#E8C87D" transparent opacity={0.45} />
                  </mesh>
                  {/* Right edge hand-stitching */}
                  <mesh position={[avgWidth / 2 - 0.05, 0, seg.thickness / 2 + 0.002]}>
                    <boxGeometry args={[0.012, seg.length, 0.004]} />
                    <meshBasicMaterial color="#E8C87D" transparent opacity={0.45} />
                  </mesh>
                </>
              ) : (
                <>
                  {/* Horizontal Oyster-link indentation groove */}
                  <mesh position={[0, 0, seg.thickness / 2 + 0.002]}>
                    <boxGeometry args={[avgWidth - 0.05, 0.015, 0.004]} />
                    <meshStandardMaterial color={strapColor} metalness={1.0} roughness={0.08} />
                  </mesh>
                </>
              )}
            </group>
          );
        })}
      </group>

      {/* Bottom Strap Segments */}
      <group>
        {bottomStrapSegments.map((seg, i) => {
          const avgWidth = (seg.widthStart + seg.widthEnd) / 2;
          return (
            <group key={`bottom-strap-${i}`} position={seg.position} rotation={seg.rotation}>
              <mesh castShadow receiveShadow>
                <boxGeometry args={[avgWidth, seg.length, seg.thickness]} />
                <meshStandardMaterial 
                  color={strapColor} 
                  roughness={isStrapMetal ? 0.18 : 0.75} 
                  metalness={isStrapMetal ? 0.95 : 0.15} 
                />
              </mesh>
              
              {/* Strap detailing: stitching for leather, grooves for metal */}
              {!isStrapMetal ? (
                <>
                  {/* Left edge hand-stitching */}
                  <mesh position={[-avgWidth / 2 + 0.05, 0, seg.thickness / 2 + 0.002]}>
                    <boxGeometry args={[0.012, seg.length, 0.004]} />
                    <meshBasicMaterial color="#E8C87D" transparent opacity={0.45} />
                  </mesh>
                  {/* Right edge hand-stitching */}
                  <mesh position={[avgWidth / 2 - 0.05, 0, seg.thickness / 2 + 0.002]}>
                    <boxGeometry args={[0.012, seg.length, 0.004]} />
                    <meshBasicMaterial color="#E8C87D" transparent opacity={0.45} />
                  </mesh>
                </>
              ) : (
                <>
                  {/* Horizontal Oyster-link indentation groove */}
                  <mesh position={[0, 0, seg.thickness / 2 + 0.002]}>
                    <boxGeometry args={[avgWidth - 0.05, 0.015, 0.004]} />
                    <meshStandardMaterial color={strapColor} metalness={1.0} roughness={0.08} />
                  </mesh>
                </>
              )}
            </group>
          );
        })}
      </group>
    </group>
  );
};
