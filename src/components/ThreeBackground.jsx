import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { random } from "maath";

function Stars(props) {
  const ref = useRef();

  const sphere = useMemo(
    () => random.inSphere(new Float32Array(5000), { radius: 1.5 }),
    []
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#64ffda"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function FloatingCubes() {
  const ref = useRef();

  useFrame((state) => {
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <mesh ref={ref} position={[2, 0, 0]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial
        color="#ff6b6b"
        transparent
        opacity={0.3}
        wireframe
      />
    </mesh>
  );
}

function Torus() {
  const ref = useRef();

  useFrame((state) => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.005;
    ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 2;
  });

  return (
    <mesh ref={ref} position={[-2, 1, -1]}>
      <torusGeometry args={[0.3, 0.1, 16, 100]} />
      <meshStandardMaterial
        color="#64ffda"
        transparent
        opacity={0.4}
        wireframe
      />
    </mesh>
  );
}

function Sphere() {
  const ref = useRef();

  useFrame((state) => {
    ref.current.rotation.y += 0.01;
    ref.current.position.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
  });

  return (
    <mesh ref={ref} position={[0, -1, -2]}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial
        color="#ff6b6b"
        transparent
        opacity={0.2}
        wireframe
      />
    </mesh>
  );
}

const ThreeBackground = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars />
        <FloatingCubes />
        <Torus />
        <Sphere />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
