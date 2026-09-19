import dynamic from "next/dynamic";
import WebGLErrorBoundary from "./WebGLErrorBoundary";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function BackgroundFX() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-20 bg-bg" />
      <div className="flow-mesh pointer-events-none fixed inset-0 -z-20" />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <WebGLErrorBoundary>
          <Scene3D />
        </WebGLErrorBoundary>
      </div>

      <div className="grain" />
    </>
  );
}
