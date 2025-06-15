/// <reference types="@react-three/fiber" />

import { OrbitControls } from '@react-three/drei'
import Lights from './lights'
import { Chess } from "chess.js"
import type { Square } from "chess.js"
import { MOVE } from '@/types/socket'
import React, { useState } from 'react'

type ChessBoardProps = {

    socket: WebSocket | null
}
const ChessBoard: React.FC<ChessBoardProps> = ({ socket }) => {
    const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
    const [game, setGame] = useState(new Chess());
    const [board, setBoard] = useState(game.board());

    const getSquare = (row: number, col: number): Square => {
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        return (files[col] + (8 - row)) as Square;
    };

    const isSelected = (row: number, col: number) => {
        return selectedSquare === getSquare(row, col);
    };

    const handleSquareClick = (row: number, col: number) => {
        const clickedSquare = getSquare(row, col);
        const piece = board[row][col];
        if (!selectedSquare) {
            if (piece) {
                setSelectedSquare(clickedSquare);
            }
            return;
        }
        if (selectedSquare === clickedSquare) {
            setSelectedSquare(null);
            return;
        }
        const move = { from: selectedSquare, to: clickedSquare };
        const moveResult = game.move(move);
        if (moveResult) {
            setBoard(game.board());
            setSelectedSquare(null);
            if (socket) {
                socket.send(JSON.stringify({ type: MOVE, payload: move }));
            }
        } else {
            setSelectedSquare(null);
        }
    };

    return <>
        <OrbitControls makeDefault minDistance={2} />
        <Lights />
        <mesh receiveShadow position={[0, -0.16, 0]}>
            <boxGeometry args={[8.8, 0.3, 8.8]} />
            <meshStandardMaterial color="#1a1818" />
        </mesh>
        {board.map((rowArr, row) =>
            rowArr.map((piece, col) => {
                const isWhiteSquare = (row + col) % 2 === 1;
                const squarePos: [number, number, number] = [col - 3.5, 0, row - 3.5];
                const highlight = isSelected(row, col);
                return (
                    <group key={`square-${row}-${col}`} onClick={() => handleSquareClick(row, col)}>
                        <mesh
                            position={squarePos}
                            receiveShadow
                            castShadow

                        >
                            <boxGeometry args={[1, 0.2, 1]} />
                            <meshStandardMaterial color={highlight ? '#f7e26b' : (isWhiteSquare ? '#FFFFF0' : '#5d9948')} />
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
    </>;
}

export default ChessBoard
