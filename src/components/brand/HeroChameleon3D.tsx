import { Suspense, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/chameleon.glb";

type MouseTarget = { x: number; y: number };

function ChameleonModel({ target }: { target: MutableRefObject<MouseTarget> }) {
  const { scene } = useGLTF(MODEL_URL);
  const root = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Object3D[]>([]);
  const look = useMemo(() => new THREE.Vector3(), []);
  const cloned = useMemo(() => {
    const c = scene.clone(true);
    const found: THREE.Object3D[] = [];
    c.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        const mesh = o as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        if (/_1$|_2$/.test(mesh.name)) found.push(mesh);
      }
    });
    eyes.current = found;
    return c;
  }, [scene]);

  useFrame((state) => {
    const g = root.current;
    if (!g) return;
    const { x, y } = target.current;
    const t = state.clock.elapsedTime;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, x * 0.7 + Math.sin(t * 0.7) * 0.03, 0.09);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -y * 0.42 + Math.sin(t * 0.55) * 0.015, 0.09);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -x * 0.12, 0.09);
    look.set(x * 2.2, 0.28 + y * 1.35, 1.15);
    for (const eye of eyes.current) eye.lookAt(look);
  });

  return (
    <group ref={root} position={[0.08, -0.92, 0]} rotation={[0.05, Math.PI * 0.18, 0]} scale={7.6}>
      <primitive object={cloned} />
    </group>
  );
}

/** Pré-carrega só em desktop fino (evita baixar GLB no celular). */
if (typeof window !== "undefined" && window.matchMedia("(min-width: 768px) and (pointer: fine)").matches) {
  useGLTF.preload(MODEL_URL);
}

/**
 * Camaleão 3D realista (CC0) — corpo inclina e olhos acompanham o cursor.
 * Sem Environment HDR (mais leve). Usado só no desktop.
 */
export const HeroChameleon3D = ({
  className,
  target,
}: {
  className?: string;
  target: MutableRefObject<MouseTarget>;
}) => (
  <div className={className} aria-hidden>
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0.55, 0.42, 2.15], fov: 34, near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance", stencil: false, depth: true }}
      style={{ width: "100%", height: "100%" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight intensity={0.72} />
      <directionalLight position={[3.2, 4.5, 2.2]} intensity={1.35} />
      <directionalLight position={[-2.5, 1.5, -1.5]} intensity={0.45} color="#1FA8BA" />
      <spotLight position={[0.2, 3.2, 1.8]} angle={0.55} penumbra={0.6} intensity={0.45} color="#00C48A" />
      <Suspense fallback={null}>
        <ChameleonModel target={target} />
        <ContactShadows position={[0, -0.98, 0]} opacity={0.28} scale={4.5} blur={2.4} far={3.2} color="#14201C" resolution={256} />
      </Suspense>
    </Canvas>
  </div>
);
