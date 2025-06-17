import { useGLTF } from "@react-three/drei";
import { useMemo, useEffect } from "react";
import * as THREE from "three";

export const KingModel = ({ position, color }: { position: [number, number, number], color: string }) => {
  const { scene } = useGLTF('/king.glb');
  const cloned = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    cloned.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone(); // avoid sharing material
        child.material.color = new THREE.Color(color);
      }
    });
  }, [cloned, color]);

  return <primitive object={cloned} scale={0.7} position={position} />;
};

export const QueenModel = ({ position, color }: { position: [number, number, number], color: string }) => {
  const { scene } = useGLTF('/queen.glb');
  const cloned = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    cloned.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone(); // avoid sharing material
        child.material.color = new THREE.Color(color);
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [cloned, color]);

  return <primitive object={cloned} scale={0.25} position={position} />;
};

export const BishopModel = ({ position, color }: { position: [number, number, number], color: string }) => {
  const { scene } = useGLTF('/bishop.glb');
    const cloned = useMemo(() => scene.clone(), [scene]);
    useEffect(() => {
      cloned.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material = child.material.clone();
          child.material.color = new THREE.Color(color);
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }, [cloned, color]);
    return <primitive object={cloned} scale={0.25} position={position} />;
};

export const KnightModel = ({ position, color }: { position: [number, number, number], color: string }) => {
  const { scene } = useGLTF('/knight.glb');
  const cloned = useMemo(() => scene.clone(), [scene]);
  useEffect(() => {
    cloned.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.color = new THREE.Color(color);
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [cloned, color]);
  return <primitive object={cloned} scale={0.25} position={position} />;
};

export const RookModel = ({ position, color }: { position: [number, number, number], color: string }) => {
  const { scene } = useGLTF('/rook.glb');
  const cloned = useMemo(() => scene.clone(), [scene]);
  useEffect(() => {
    cloned.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.color = new THREE.Color(color);
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [cloned, color]);
  return <primitive object={cloned} scale={0.25} position={position} />;
};

export const PawnModel = ({ position, color }: { position: [number, number, number], color: string }) => {
  const { scene } = useGLTF('/pawn.glb');
  const cloned = useMemo(() => scene.clone(), [scene]);
  useEffect(() => {
    cloned.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.color = new THREE.Color(color);
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [cloned, color]);
  return <primitive object={cloned} scale={0.25} position={position} />;
};