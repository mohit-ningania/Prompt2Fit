import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";

// Tracks scroll progress (0-1 down the page) in a ref rather than React
// state, so the 3D scene can read it every frame without re-rendering.
function useScrollProgress() {
  const progress = useRef(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      progress.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}

const BLOBS = [
  { position: [-2.9, 0.8, -3.5], scale: 1.6, color: "#a7d8f5", speed: 0.55 },
  { position: [3, -0.6, -4.5], scale: 2.2, color: "#c9bdfa", speed: 0.4 },
  { position: [0.3, 1.9, -5.5], scale: 1.2, color: "#f6c7ea", speed: 0.75 },
  { position: [-1.5, -2, -4.8], scale: 1.8, color: "#bdeee0", speed: 0.5 },
];

function FlowBlob({ position, scale, color, speed, scrollRef, index }) {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    const scroll = scrollRef.current;
    const dir = index % 2 === 0 ? 1 : -1;

    mesh.current.rotation.x = t * 0.12 * speed + scroll * Math.PI * dir;
    mesh.current.rotation.y = t * 0.09 * speed + scroll * 2.2;
    mesh.current.position.x = position[0] + Math.cos(t * speed * 0.6 + index) * 0.25;
    mesh.current.position.y = position[1] + Math.sin(t * speed * 0.8 + index) * 0.3 - scroll * 2.6 * dir;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 5]} />
      <MeshDistortMaterial
        color={color}
        speed={1.8}
        distort={0.42}
        roughness={0.2}
        metalness={0.05}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

function ScrollRig({ scrollRef }) {
  useFrame((state) => {
    const scroll = scrollRef.current;
    state.camera.position.z = 7 - scroll * 1.4;
    state.camera.rotation.y = scroll * 0.12;
  });
  return null;
}

export default function Scene3D() {
  const scrollRef = useScrollProgress();

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 7], fov: 45 }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[3, 4, 5]} intensity={0.7} color="#eaf6ff" />
      <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#f7ecff" />
      <ScrollRig scrollRef={scrollRef} />
      {BLOBS.map((blob, i) => (
        <FlowBlob key={i} index={i} scrollRef={scrollRef} {...blob} />
      ))}
    </Canvas>
  );
}
