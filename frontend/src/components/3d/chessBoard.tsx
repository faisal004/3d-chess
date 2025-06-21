/// <reference types="@react-three/fiber" />
import { OrbitControls } from '@react-three/drei';
import Lights from './lights';
import type { Piece, Square } from 'chess.js';
import React, { useState, useMemo, useCallback, Suspense } from 'react';
import type { AnimatedPieceProps, ChessBoardProps } from '@/types/type';
import { BishopModel, KingModel, KnightModel, PawnModel, QueenModel, RookModel } from '../models';
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const squareToPosition = (square: Square): [number, number, number] => {
    const file = square[0];
    const rank = square[1];
    const col = FILES.indexOf(file);
    const row = 8 - parseInt(rank);
    return [col - 3.5, 0.25, row - 3.5];
};
const getSquare = (row: number, col: number): Square => {
    return (FILES[col] + (8 - row)) as Square;
};
const AnimatedPiece = ({ from, to, children }: AnimatedPieceProps) => {
    const fromPos = useMemo(() => squareToPosition(from), [from]);
    const toPos = useMemo(() => squareToPosition(to), [to]);
    const { position } = useSpring({
        from: { position: fromPos },
        to: { position: toPos },
        config: { mass: 200, tension: 900, friction: 200,clamp:true },
    });

    return <a.group position={position as any}>{children}</a.group>;
};
const PieceComponent = ({ piece, highlight }: { piece: Piece, highlight: boolean }) => (
    <group castShadow>
        {piece.type === 'p' && <PawnModel position={[0, 0.03, 0]} color={piece.color === 'w' ? '#e0e0e0' : '#222'} />}
        {piece.type === 'r' && <RookModel position={[0, 0.19, 0]} color={piece.color === 'w' ? '#e0e0e0' : '#222'} />}
        {piece.type === 'n' && <KnightModel position={[0, 0.22, 0]} color={piece.color === 'w' ? '#e0e0e0' : '#222'} />}
        {piece.type === 'b' && <BishopModel position={[0, 0.25, 0]} color={piece.color === 'w' ? '#e0e0e0' : '#222'} />}
        {piece.type === 'q' && <QueenModel position={[0, 0.32, 0]} color={piece.color === 'w' ? '#e0e0e0' : '#222'} />}
        {piece.type === 'k' && <KingModel position={[0, 0.9, 0]} color={piece.color === 'w' ? '#e0e0e0' : '#222'} />}
        <meshStandardMaterial
            color={piece.color === 'w' ? '#e0e0e0' : '#222'}
            emissive={highlight ? (piece.color === 'w' ? '#444400' : '#220022') : '#000000'}
            emissiveIntensity={highlight ? 0.3 : 0}
        />
    </group>
);
const ChessBoard: React.FC<ChessBoardProps> = ({ board, onMove, getLegalMoves, gameStatus, playerColor, lastMove }) => {
    const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);

    const validMoves = useMemo(() => {
        if (!selectedSquare) return [];
        return getLegalMoves(selectedSquare);
    }, [selectedSquare, getLegalMoves]);

    const isSelected = useCallback((row: number, col: number) => {
        return selectedSquare === getSquare(row, col);
    }, [selectedSquare]);

    const isValidMove = useCallback((row: number, col: number) => {
        const square = getSquare(row, col);
        return validMoves.includes(square);
    }, [validMoves]);

    const handleSquareClick = useCallback((row: number, col: number) => {

        if (gameStatus == "waiting-opponent") {
            alert("Game has not started yet.");
            return;
        }

        const clickedSquare = getSquare(row, col);
        const piece = board[row][col];
        if (!selectedSquare) {
            if (piece && piece.color !== playerColor?.[0] && gameStatus === "started") {
                alert("You cannot select your opponent’s pieces.");
                return;
            }
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
        onMove(move);
        setSelectedSquare(null);
    }, [selectedSquare, board, onMove, gameStatus]);



    const boardElements = useMemo(() => {
        return board.map((rowArr, row) =>
            rowArr.map((piece, col) => {
                const isWhiteSquare = (row + col) % 2 === 1;
                const squarePos: [number, number, number] = [col - 3.5, 0, row - 3.5];
                const highlight = isSelected(row, col);
                const canMoveTo = isValidMove(row, col);
                let squareColor = isWhiteSquare ? '#FFFFF0' : '#5d9948';
                if (highlight) {
                    squareColor = '#f7e26b';
                } else if (canMoveTo) {
                    squareColor = piece ? '#ff6b6b' : '#f7e26b';
                }


                return (
                    <group key={`square-${row}-${col}`} onClick={() => handleSquareClick(row, col)}>
                        <mesh position={squarePos} receiveShadow castShadow>
                            <boxGeometry args={[1, 0.2, 1]} />
                            <meshStandardMaterial color={squareColor} />
                        </mesh>

                        {piece && (
                            <group>
                                <Suspense fallback={null}>
                                    {lastMove?.to === getSquare(row, col) ? (
                                        <AnimatedPiece
                                            from={lastMove.from}
                                            to={lastMove.to}
                                        >
                                            <PieceComponent piece={piece} highlight={highlight} />
                                        </AnimatedPiece>
                                    ) : (
                                        <group position={squareToPosition(getSquare(row, col))}>
                                            <PieceComponent piece={piece} highlight={highlight} />
                                        </group>
                                    )}
                                </Suspense>
                                {highlight && (
                                    <>

                                        <pointLight
                                            position={[col - 3.5, 0.5, row - 3.5]}
                                            color={piece.color === 'w' ? '#ffffaa' : '#ffaaff'}
                                            intensity={8}
                                            distance={5}
                                            decay={1.5}
                                        />
                                    </>
                                )}
                            </group>
                        )}
                        
                    </group>
                );
            })
        );
    }, [board, selectedSquare, isSelected, handleSquareClick, isValidMove]);

    return (
        <>
            <OrbitControls makeDefault minDistance={2} />
            <Lights />
            <mesh receiveShadow position={[0, -0.16, 0]}>
                <boxGeometry args={[8.8, 0.3, 8.8]} />
                <meshStandardMaterial color="#1a1818" />
            </mesh>
            {boardElements}
        </>
    );
};

export default ChessBoard;