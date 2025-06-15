/// <reference types="@react-three/fiber" />

import { OrbitControls } from '@react-three/drei'
import Lights from './lights'

const Experience = () => {
    return <>
        <OrbitControls makeDefault />
        <Lights />
        <mesh receiveShadow position={[0, -0.16, 0]} >
            <boxGeometry args={[8.8, 0.3, 8.8]} />
            <meshStandardMaterial color="#333" />
        </mesh>
        {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => {
                const isWhite = (row + col) % 2 === 1;
                return (
                    <mesh
                        key={`square-${row}-${col}`}
                        position={[
                            col - 3.5,
                            0,
                            row - 3.5
                        ]}
                        receiveShadow
                        castShadow
                    >
                        <boxGeometry args={[1, 0.1, 1]} />
                        <meshStandardMaterial color={isWhite ? '#ffffff' : '#000000'} />
                    </mesh>
                );
            })
        )}
    </>
}

export default Experience
