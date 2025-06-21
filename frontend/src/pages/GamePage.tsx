import { useSocket } from "@/hooks/useSocket";
import { INIT_GAME, MOVE, OPPONENT_LEFT } from "@/types/socket";
import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import ChessBoard from "@/components/3d/chessBoard";
import { Canvas } from "@react-three/fiber";
import GameStatusPanel from "@/components/GameStatusPanel";
import { Chess, type Square } from "chess.js";
import type { ChessMove, GameStatus, SocketMessage } from "@/types/type";




const GamePage: React.FC = () => {
  const { socket, send, isConnected } = useSocket("ws://localhost:8080");
  const [gameStatus, setGameStatus] = useState<GameStatus>("not-started");
  const [playerColor, setPlayerColor] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  const gameRef = useRef(new Chess());
  const [lastFen, setLastFen] = useState(gameRef.current.fen());
  const [lastMove, setLastMove] = useState<ChessMove | null>(null);

  const board = useMemo(() => gameRef.current.board(), [lastFen]);

  const handleSocketMessage = useCallback((event: MessageEvent) => {
    try {
      const data: SocketMessage = JSON.parse(event.data);
      switch (data.type) {
        case MOVE:
          if (data.payload?.from && data.payload?.to) {
            const moveResult = gameRef.current.move({ 
              from: data.payload.from as Square, 
              to: data.payload.to as Square 
            });
            if (moveResult) {
              setLastMove({ 
                from: data.payload.from as Square, 
                to: data.payload.to as Square 
              });
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
    if (gameRef.current.isCheckmate()) {
      setBannerMessage("Checkmate");

      return;
    } else if (gameRef.current.isCheck()) {
      setBannerMessage("Check");
      const timeout = setTimeout(() => {
        setBannerMessage(null);
      }, 2000);
      return () => clearTimeout(timeout);
    } else {
      setBannerMessage(null);
    }
  }, [lastFen, gameStatus]);


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
      gameRef.current.reset();
      setLastFen(gameRef.current.fen());
      send(JSON.stringify({ type: INIT_GAME }));
      setMessage(null);
      setGameStatus("waiting-opponent");
    }
  };

  const handleLocalMove = (move: { from: string; to: string }) => {
    const targetSquare = gameRef.current.get(move.to as Square);
    const captured = targetSquare ? targetSquare.type : undefined;
    
    const moveResult = gameRef.current.move({
        from: move.from as Square,
        to: move.to as Square,
        promotion: 'q'
    });
    
    if (moveResult) {
        setLastMove({ 
            from: move.from as Square, 
            to: move.to as Square,
            captured: captured
        });
        setLastFen(gameRef.current.fen());
        if (socket) {
            socket.send(JSON.stringify({ 
                type: MOVE, 
                payload: { 
                    from: move.from, 
                    to: move.to,
                    captured: captured 
                } 
            }));
        }
    }
};
  const getLegalMoves = (square: Square): Square[] => {
    const moves = gameRef.current.moves({ square, verbose: true });
    return moves.map(move => move.to);
  };
  const turn = gameRef.current.turn(); 

  return (
    <div className="relative h-screen">
      {bannerMessage && (
        <div className="w-full z-50 h-20 text-2xl font-bold absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-white/10 backdrop-blur-sm border-l-0 border-r-0 border border-white shadow-2xl text-white">
          {bannerMessage}
        </div>
      )}

      <GameStatusPanel
        isConnected={isConnected}
        message={message}
        gameStatus={gameStatus}
        playerColor={playerColor}
        handleStartGame={handleStartGame}
        turn={turn}
      />

      <Canvas
        shadows
        className="bg-linear-to-b from-black to-zinc-700"
        camera={{ position: [10, 10, 10], fov: 20 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <ChessBoard board={board} onMove={handleLocalMove} getLegalMoves={getLegalMoves} gameStatus={gameStatus} playerColor={playerColor}  lastMove={lastMove}/>
      </Canvas>
    </div>
  );
};

export default GamePage;
