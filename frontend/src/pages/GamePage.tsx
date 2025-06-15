import { Button } from "@/components/ui/button";
import { useSocket } from "@/hooks/useSocket";
import { INIT_GAME } from "@/types/socket";
import React, { useEffect, useState, useCallback } from "react";

type GameStatus = "waiting" | "started";

const GamePage: React.FC = () => {
  const { socket, send, isConnected } = useSocket('ws://localhost:8080');
  const [gameStatus, setGameStatus] = useState<GameStatus>("waiting");
  const [playerColor, setPlayerColor] = useState<string | null>(null);

  const handleSocketMessage = useCallback((event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === INIT_GAME) {
        setGameStatus("started");
        setPlayerColor(data.payload?.color ?? null);
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

  const handleStartGame = () => {
    if (socket && isConnected) {
      send(JSON.stringify({ type: INIT_GAME }));
    }
  };

  return (
    <div>
      <h1>Game Page</h1>
      {gameStatus === "waiting" && (
        <div>
          <h2>Waiting for user...</h2>
        </div>
      )}
      {gameStatus === "started" && playerColor && (
        <div>
          <h2>Game is already in progress</h2>
          <h3>Your color: {playerColor}</h3>
        </div>
      )}
      <Button onClick={handleStartGame} disabled={!isConnected}>
        Start Game
      </Button>
    </div>
  );
};

export default GamePage;
