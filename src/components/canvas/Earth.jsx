import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const PLANET_MODEL = "/planet/scene.gltf";
useGLTF.preload(PLANET_MODEL);

const Earth = ({ scale = 2.5 }) => {
  const earth = useGLTF(PLANET_MODEL);

  return (
    <primitive object={earth.scene} scale={scale} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = ({ variant = "contact", className = "" }) => {
  const isHero = variant === "hero";

  return (
    <div className={`h-full w-full ${className}`}>
      <Canvas
        shadows={!isHero}
        frameloop='demand'
        dpr={isHero ? [1, 1] : [1, 1.5]}
        gl={{ preserveDrawingBuffer: true, powerPreference: "high-performance" }}
        camera={{
          fov: isHero ? 50 : 45,
          near: 0.1,
          far: 200,
          position: isHero ? [-3, 2, 5] : [-4, 3, 6],
        }}
        className='!h-full !w-full'
      >
        <Suspense fallback={isHero ? null : <CanvasLoader />}>
          <OrbitControls
            autoRotate
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Earth scale={isHero ? 1.85 : 2.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EarthCanvas;
