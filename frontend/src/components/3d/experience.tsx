/// <reference types="@react-three/fiber" />

import { OrbitControls } from '@react-three/drei'
import Lights from './lights'
import { useState } from 'react';
import { Chess } from "chess.js"

const Experience = () => {
    const [game, setGame] = useState(new Chess());
    const [board, setBoard] = useState(game.board());

    return <>
        <OrbitControls makeDefault
            minDistance={2}

        />
        <Lights />
        <mesh receiveShadow position={[0, -0.16, 0]}  >
            <boxGeometry args={[8.8, 0.3, 8.8]} />
            <meshStandardMaterial color="#333" />
        </mesh>
        {board.map((rowArr, row) =>
            rowArr.map((piece, col) => {
                const isWhiteSquare = (row + col) % 2 === 1;
                const squarePos: [number, number, number] = [col - 3.5, 0, row - 3.5];
                return (
                    <group key={`square-${row}-${col}`}>
                        <mesh
                            position={squarePos}
                            receiveShadow
                            castShadow
                        >
                            <boxGeometry args={[1, 0.2, 1]} />
                            <meshStandardMaterial color={isWhiteSquare ? '#ffffff' : '#000000'} />
                        </mesh>
                        {piece && (
                            <mesh
                                position={[col - 3.5, 0.25, row - 3.5]}
                                castShadow
                            >
                                {piece.type === 'p' && (
                                    <sphereGeometry args={[0.28, 32, 32]} />
                                )}
                                {piece.type === 'r' && (
                                    <cylinderGeometry args={[0.22, 0.22, 0.5, 32]} />
                                )}
                                {piece.type === 'n' && (
                                    <torusGeometry args={[0.18, 0.09, 16, 32]} />
                                )}
                                {piece.type === 'b' && (
                                    <coneGeometry args={[0.22, 0.45, 32]} />
                                )}
                                {piece.type === 'q' && (
                                    <boxGeometry args={[0.32, 0.32, 0.32]} />
                                )}
                                {piece.type === 'k' && (
                                    <sphereGeometry args={[0.36, 32, 32]} />
                                )}
                                <meshStandardMaterial color={piece.color === 'w' ? '#e0e0e0' : '#222'} />
                            </mesh>
                        )}
                    </group>
                );
            })
        )}
    </>
}

export default Experience
