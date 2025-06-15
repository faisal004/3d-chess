import { useSocket } from "@/hooks/useSocket";
import { INIT_GAME, OPPONENT_LEFT } from "@/types/socket";
import React, { useEffect, useState, useCallback } from "react";
import ChessBoard from "@/components/3d/chessBoard";
import { Canvas } from "@react-three/fiber";
import GameStatusPanel from "@/components/GameStatusPanel";
type GameStatus = "not-started" | "waiting-opponent" | "started";

const GamePage: React.FC = () => {
  const { socket, send, isConnected } = useSocket('ws://localhost:8080');
  const [gameStatus, setGameStatus] = useState<GameStatus>("not-started");
  const [playerColor, setPlayerColor] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSocketMessage = useCallback((event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      console.log(data);
      switch (data.type) {
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
      console.error(e);
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
      <ChessBoard    socket={socket}/>
    </Canvas>
    </>
    
  );
};

export default GamePage;
