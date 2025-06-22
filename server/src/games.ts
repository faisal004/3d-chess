import { WebSocket } from "ws";
import { Chess } from 'chess.js';
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    public board: InstanceType<typeof Chess>;
    private startTime: Date;
    private moveCount = 0;
    private gameOver = false;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: { color: "white" }
        }));
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: { color: "black" }
        }));
    }
    makeMove(socket: WebSocket, move: { from: string; to: string }) {
        if (this.gameOver) {
            socket.send(JSON.stringify({ error: "Game is already over" }));
            return;
        }
        if (this.moveCount % 2 === 0 && socket !== this.player1) {
            socket.send(JSON.stringify({ error: "Not your turn" }));
            return;
        }
        if (this.moveCount % 2 === 1 && socket !== this.player2) {
            socket.send(JSON.stringify({ error: "Not your turn" }));
            return;
        }
        try {
            const result = this.board.move(move as any);
            if (!result) {
                socket.send(JSON.stringify({ error: "Illegal move" }));
                return;
            }
            this.moveCount++;
        } catch (error) {
            socket.send(JSON.stringify({ error: "Move error" }));
            return;
        }
        if (this.board.game_over()) {
            this.gameOver = true;
            const winner = this.board.turn() === "w" ? "black" : "white";
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload: { winner }
            }));
            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                payload: { winner }
            }));
            return;
        }
        if (this.moveCount % 2 === 1) {
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }));
        } else {
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }));
        }
    }
}