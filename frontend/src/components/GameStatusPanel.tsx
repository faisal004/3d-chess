import React from "react";

type GameStatus = "not-started" | "waiting-opponent" | "started";

type GameStatusPanelProps = {
  isConnected: boolean;
  message: string | null;
  gameStatus: GameStatus;
  playerColor: string | null;
  handleStartGame: () => void;
};

const GameStatusPanel: React.FC<GameStatusPanelProps> = ({
  isConnected,
  message,
  gameStatus,
  playerColor,
  handleStartGame,
}) => {
  return (
    <div className="absolute top-8 right-8 z-10">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 w-80 transform transition-all duration-500 ">
        <div className="flex items-center justify-center mb-8">
         
          <div className="flex items-center gap-3">
            <div className="relative">
              {isConnected ? (
                <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50">
                  <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                </div>
              ) : (
                <div className="w-4 h-4 bg-red-400 rounded-full shadow-lg shadow-red-400/50"></div>
              )}
            </div>
            <span className="text-white/80 text-sm font-medium">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl backdrop-blur-sm">
            <p className="text-red-300 text-center font-medium">{message}</p>
          </div>
        )}

        <div className="mb-8">
          {gameStatus === "not-started" && (
            <div className="text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 mx-auto bg-gradient-to-b from-[#FFFFF0] to-[#5d9948] rounded-full flex items-center justify-center mb-4 ">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white/90">Ready to Play?</h2>
              <p className="text-white/60">Click the button below to start your adventure</p>
            </div>
          )}

          {gameStatus === "waiting-opponent" && (
            <div className="text-center space-y-4 animate-fade-in">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 border-4 border-blue-400/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-blue-400 rounded-full animate-spin"></div>
                <div className="absolute inset-2 bg-gradient-to-r from-[#FFFFF0] to-[#5d9948] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-white/90">Finding Opponent</h2>
              <p className="text-white/60">Please wait while we match you with another player...</p>
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          )}

          {gameStatus === "started" && playerColor && (
            <div className="text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#FFFFF0] to-[#5d9948] rounded-full flex items-center justify-center mb-4 animate-pulse">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white/90">Game Active!</h2>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                <div className={`w-3 h-3 rounded-full ${playerColor === 'White' ? 'bg-white' : 'bg-gray-800'}`}></div>
                <span className="text-white/90 font-medium">Playing as {playerColor}</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <button
            onClick={handleStartGame}
            disabled={!isConnected || gameStatus !== "not-started"}
            className={`w-full py-4 px-6 rounded-xl font-bold text-white/90 transition-all duration-300 transform ${
              !isConnected || gameStatus !== "not-started"
                ? "bg-gray-600/50 cursor-not-allowed opacity-50"
                : "bg-gradient-to-b from-[#d3d3ad] to-[#315a22] hover:from-[#FFFFF0] hover:to-[#5d9948] hover:scale-105 hover:shadow-xl hover:shadow-[#5d9948]/25 active:scale-95"
            }`}
          >
            {gameStatus === "not-started" ? "Start Game" : "Game in Progress"}
          </button>
        </div>
      </div>
  
   
    </div>
  );
};

export default GameStatusPanel;
