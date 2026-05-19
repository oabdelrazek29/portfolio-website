import { Html, useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

const CanvasLoader = () => {
  const { progress, active } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!active || progress >= 100) {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [active, progress]);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 12000);
    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null;

  return (
    <Html
      as='div'
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span className='canvas-loader'></span>
      <p
        style={{
          fontSize: 14,
          color: "#F1F1F1",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {Math.min(100, progress).toFixed(0)}%
      </p>
    </Html>
  );
};

export default CanvasLoader;
