import { useGLTF } from "@react-three/drei"
import { useMemo } from "react";

export const KingModel = ({ position }: { position: [number, number, number] }) => {
  // load (cached) glb once
  const { scene } = useGLTF('/king.glb');

  // clone it so each square gets its OWN Object3D
  const cloned = useMemo(() => scene.clone(), [scene]);

  return <primitive object={cloned} scale={0.7} position={position} />;
};

export const QueenModel = ({ position }: { position: [number, number, number] }) => {
  const { scene } = useGLTF('/queen.glb');
  const cloned = useMemo(() => scene.clone(), [scene]);
  return <primitive object={cloned} scale={0.25} position={position} />;
};

export const BishopModel = ({ position }: { position: [number, number, number] }) => {
  const { scene } = useGLTF('/bishop.glb');
  const cloned = useMemo(() => scene.clone(), [scene]);
  return <primitive object={cloned} scale={0.25} position={position} />;
};

export const KnightModel = ({ position }: { position: [number, number, number] }) => {
  const { scene } = useGLTF('/knight.glb');
  const cloned = useMemo(() => scene.clone(), [scene]);
  return <primitive object={cloned} scale={0.25} position={position} />;
};

export const RookModel = ({ position }: { position: [number, number, number] }) => {
  const { scene } = useGLTF('/rook.glb');
  const cloned = useMemo(() => scene.clone(), [scene]);
  return <primitive object={cloned} scale={0.25} position={position} />;
};

export const PawnModel = ({ position }: { position: [number, number, number] }) => {
  const { scene } = useGLTF('/pawn.glb');
  const cloned = useMemo(() => scene.clone(), [scene]);
  return <primitive object={cloned} scale={0.25} position={position} />;
};