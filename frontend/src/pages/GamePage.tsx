import { useSocket } from "@/hooks/useSocket";
import { INIT_GAME, MOVE, OPPONENT_LEFT } from "@/types/socket";
import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import ChessBoard from "@/components/3d/chessBoard";
import { Canvas } from "@react-three/fiber";
import GameStatusPanel from "@/components/GameStatusPanel";
import { Chess, type Square } from "chess.js";
import type { GameStatus, MovePayload, SocketMessage } from "@/types/type";



const GamePage: React.FC = () => {
  const { socket, send, isConnected } = useSocket("ws://localhost:8080");
  const [gameStatus, setGameStatus] = useState<GameStatus>("not-started");
  const [playerColor, setPlayerColor] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const gameRef = useRef(new Chess());
  const [lastFen, setLastFen] = useState(gameRef.current.fen());

  const board = useMemo(() => gameRef.current.board(), [lastFen]);

  const handleSocketMessage = useCallback((event: MessageEvent) => {
    try {
      const data: SocketMessage = JSON.parse(event.data);
      switch (data.type) {
        case MOVE:
          if (data.payload?.from && data.payload?.to) {
            const moveResult = gameRef.current.move({ from: data.payload.from, to: data.payload.to });
            if (moveResult) {
              setLastFen(gameRef.current.fen());
            }
          }
          break;
        case INIT_GAME:
          setGameStatus("started");
          setPlayerColor(data.payload?.color ?? null);
          break;
        case OPPONENT_LEFT:
          setGameStatus("not-started");
          setMessage("Your opponent has left the game , may be scared of you chess skills 😂😂😂");
          setPlayerColor(null);
          break;
        default:
          break;
      }
    } catch (e) {
      console.error("Invalid socket message", e);
    }
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.addEventListener("message", handleSocketMessage);
    return () => {
      socket.removeEventListener("message", handleSocketMessage);
    };
  }, [socket, handleSocketMessage]);

  useEffect(() => {
    if (!isConnected) {
      setGameStatus("not-started");
      setPlayerColor(null);
      setMessage(null);
    }
  }, [isConnected]);

  const handleStartGame = () => {
    if (socket && isConnected) {
      send(JSON.stringify({ type: INIT_GAME }));
      setMessage(null);
      setGameStatus("waiting-opponent");
    }
  };

  const handleLocalMove = (move: MovePayload) => {
    const moveResult = gameRef.current.move(move);
    if (moveResult) {
      setLastFen(gameRef.current.fen());
      if (socket) {
        socket.send(JSON.stringify({ type: MOVE, payload: move }));
      }
    }
  };
  const getLegalMoves = (square: Square): Square[] => {
    const moves = gameRef.current.moves({ square, verbose: true });
    return moves.map(move => move.to);
  };

  return (
    <>
      <div className="relative w-full min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden">
        <GameStatusPanel
          isConnected={isConnected}
          message={message}
          gameStatus={gameStatus}
          playerColor={playerColor}
          handleStartGame={handleStartGame}
        />
      </div>
      <Canvas
        shadows
        className="bg-linear-to-b from-black to-zinc-700"
        camera={{ position: [10, 10, 10], fov: 50 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <ChessBoard board={board} onMove={handleLocalMove} getLegalMoves={getLegalMoves} />
      </Canvas>
    </>
  );
};

export default GamePage;
