/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

/**
 * Custom studio lighting configuration engineered for metallic PBR materials.
 * Accentuates the watch bezel edge highlights and creates rich specular reflections on gold surfaces.
 */
export const SceneLighting: React.FC = () => {
  return (
    <>
      {/* Soft ambient light to fill dark recesses */}
      <ambientLight intensity={0.25} color="#D8D9DB" />
      
      {/* Key Light: Crisp key light from the front-right to define the main shape */}
      <directionalLight
        position={[3, 4, 5]}
        intensity={2.2}
        castShadow={true}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
        color="#FFF4E0" // Soft warm white
      />

      {/* Fill Light: Soft, cool light from the left to balance shadows */}
      <directionalLight
        position={[-4, 1, 2]}
        intensity={0.65}
        color="#B8D4FF" // Elegant sky-blue tone
      />

      {/* Rim/Back Light: Critical high-intensity back-angled light for golden edge-highlights on bezel/lugs */}
      <directionalLight
        position={[-2, 3, -4]}
        intensity={1.6}
        color="#E8C87D" // Shimmering warm gold
      />

      {/* Accent Point Light: Facing the dial directly for crystal catch-lights and dial sheen */}
      <pointLight
        position={[0, 1, 3]}
        intensity={1.2}
        distance={8}
        decay={2}
        color="#F3E5AB" // Soft brass gold
      />
    </>
  );
};
