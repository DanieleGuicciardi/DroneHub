import { useRef, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useScroll } from "framer-motion";

const DroneModel = () => {
  const { scene } = useGLTF("/models/drone.glb");
  const ref = useRef();
  const { scrollYProgress } = useScroll();
  const landedRef = useRef(false);
  const landingStart = useRef(null);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.rotation.set(0, Math.PI, 0);
      ref.current.scale.set(0.1, 0.1, 0.1);
      ref.current.position.set(0.5, 8, 0);
    }
  }, []);

  useFrame(() => {
    const drone = ref.current;
    if (!drone) return;

    const scroll = scrollYProgress.get();

    const trembleY = Math.sin(Date.now() * 0.01) * 0.01;
    const tiltX = Math.sin(Date.now() * 0.005) * 0.02;
    const tiltZ = Math.sin(Date.now() * 0.007) * 0.02;
    const liftY = scroll < 0.1 ? 0 : (scroll - 0.1) * 2.5;

    if (!landedRef.current) {
      if (!landingStart.current) landingStart.current = Date.now();
      const elapsed = (Date.now() - landingStart.current) / 1000;
      const y = Math.max(3, 8 - elapsed * 5);

      drone.position.set(0.5, y + trembleY + liftY, 0);

      if (y <= 3) {
        landedRef.current = true;
        landingStart.current = null;
      }
    } else {
      drone.position.set(0.5, 3 + trembleY + liftY, 0);
    }

    drone.rotation.x = tiltX;
    drone.rotation.z = tiltZ;
  });

  return <primitive ref={ref} object={scene} />;
};

export default DroneModel;
