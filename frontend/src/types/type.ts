import type { INIT_GAME, MOVE, OPPONENT_LEFT } from "./socket";

export type GameStatus = "not-started" | "waiting-opponent" | "started";
export type MovePayload = { from: string; to: string };

export type SocketMessage = {
  type: typeof INIT_GAME | typeof MOVE | typeof OPPONENT_LEFT;
  payload?: any;
};