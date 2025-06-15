import Experience from "@/components/3d/experience";
import { Canvas } from "@react-three/fiber";

const TestPage: React.FC = () => {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "ivory",
      }}
    >
      <Experience />
    </Canvas>
  );
};

export default TestPage;