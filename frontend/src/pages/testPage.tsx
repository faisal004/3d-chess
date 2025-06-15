import Experience from "@/components/3d/experience";
import { Canvas } from "@react-three/fiber";

const TestPage: React.FC = () => {
  return (
    <Canvas
    className="bg-linear-to-b from-black to-blue-900"
    camera={{ position: [10, 10, 10], fov: 50 }}

      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <Experience />
    </Canvas>
  );
};

export default TestPage;