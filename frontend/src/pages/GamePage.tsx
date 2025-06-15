import { Button } from "@/components/ui/button";
import { useSocket } from "@/hooks/useSocket";
import { INIT_GAME, OPPONENT_LEFT } from "@/types/socket";
import React, { useEffect, useState, useCallback } from "react";

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
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center gap-2">
        <h1>Game Page   </h1>
        {isConnected ? <div className="bg-green-500 size-3 animate-pulse rounded-full"/> : <div className="bg-red-500 size-3 rounded-full"></div>} 
      </div>
      {message && <div className="text-red-500">{message}</div>}
      {gameStatus === "not-started" && (
        <div>
          <h2>Please start your game</h2>
        </div>
      )}
      {gameStatus === "waiting-opponent" && (
        <div>
          <h2>Waiting for opponent to join...</h2>
        </div>
      )}
      {gameStatus === "started" && playerColor && (
        <div>
          <h2>Game is already in progress</h2>
          <h3>Your color: {playerColor}</h3>
        </div>
      )}
      <Button onClick={handleStartGame} disabled={!isConnected || gameStatus !== "not-started"}>
        Start Game
      </Button>
    </div>
  );
};

export default GamePage;
