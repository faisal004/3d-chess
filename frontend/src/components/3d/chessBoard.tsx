/// <reference types="@react-three/fiber" />
import { OrbitControls } from '@react-three/drei';
import Lights from './lights';
import type { Square, Piece } from 'chess.js';
import React, { useState, useMemo, useCallback } from 'react';

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

type ChessBoardProps = {
  board: (Piece | null)[][];
  onMove: (move: { from: Square; to: Square }) => void;
};

const getSquare = (row: number, col: number): Square => {
  return (FILES[col] + (8 - row)) as Square;
};

const ChessBoard: React.FC<ChessBoardProps> = ({ board, onMove }) => {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);

  const isSelected = useCallback((row: number, col: number) => {
    return selectedSquare === getSquare(row, col);
  }, [selectedSquare]);

  const handleSquareClick = useCallback((row: number, col: number) => {
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
    onMove(move);
    setSelectedSquare(null);
  }, [selectedSquare, board, onMove]);

  const boardElements = useMemo(() => {
    return board.map((rowArr, row) =>
      rowArr.map((piece, col) => {
        const isWhiteSquare = (row + col) % 2 === 1;
        const squarePos: [number, number, number] = [col - 3.5, 0, row - 3.5];
        const highlight = isSelected(row, col);

        return (
          <group key={`square-${row}-${col}`} onClick={() => handleSquareClick(row, col)}>
            <mesh position={squarePos} receiveShadow castShadow>
              <boxGeometry args={[1, 0.2, 1]} />
              <meshStandardMaterial color={highlight ? '#f7e26b' : isWhiteSquare ? '#FFFFF0' : '#5d9948'} />
            </mesh>
            {piece && (
              <mesh position={[col - 3.5, 0.25, row - 3.5]} castShadow>
                {piece.type === 'p' && <sphereGeometry args={[0.28, 32, 32]} />}
                {piece.type === 'r' && <cylinderGeometry args={[0.22, 0.22, 0.5, 32]} />}
                {piece.type === 'n' && <torusGeometry args={[0.18, 0.09, 16, 32]} />}
                {piece.type === 'b' && <coneGeometry args={[0.22, 0.45, 32]} />}
                {piece.type === 'q' && <boxGeometry args={[0.32, 0.32, 0.32]} />}
                {piece.type === 'k' && <sphereGeometry args={[0.36, 32, 32]} />}
                <meshStandardMaterial color={piece.color === 'w' ? '#e0e0e0' : '#222'} />
              </mesh>
            )}
          </group>
        );
      })
    );
  }, [board, selectedSquare, isSelected, handleSquareClick]);

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