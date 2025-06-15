import ChessBoard from "@/components/3d/chessBoard";
import { Canvas } from "@react-three/fiber";

const TestPage: React.FC = () => {
  
  return (
    <Canvas
    shadows
    className="bg-linear-to-b from-black to-zinc-700 "
    camera={{ position: [10, 10, 10], fov: 50 }}

      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      {/* <ChessBoard /> */}
    </Canvas>
  );
};

export default TestPage;