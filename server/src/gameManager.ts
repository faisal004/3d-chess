import { Game } from "./games";
import { INIT_GAME, MOVE, OPPONENT_LEFT } from "./messages";
import { WebSocket } from "ws";

export class GameManager {
    private games: Game[];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket: WebSocket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket: WebSocket) {
        this.users = this.users.filter(user => user !== socket);
        this.games = this.games.filter(game => {
            if (game.player1 === socket || game.player2 === socket) {
                const remainingPlayer = game.player1 === socket ? game.player2 : game.player1;
                try {
                    remainingPlayer.send(JSON.stringify({ type: OPPONENT_LEFT }));
                } catch { 
                    console.log("Failed to send message to remaining player");
                }
                try {
                    socket.close();
                } catch { 
                    console.log("Failed to close socket");
                }
                return false;
            }
            return true;
        });
        if (this.pendingUser === socket) {
            this.pendingUser = null;
        }
    }
    private addHandler(socket: WebSocket) {
        socket.on("message", (data) => {
            let message;
            try {
                message = JSON.parse(data.toString());
            } catch (e) {
                socket.send(JSON.stringify({ error: "Invalid JSON" }));
                return;
            }
            if (message.type === INIT_GAME) {
                if (this.pendingUser && this.pendingUser !== socket) {
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                } else {
                    this.pendingUser = socket;
                }
            } else if (message.type === MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, message.payload);
                } else {
                    socket.send(JSON.stringify({ error: "Game not found" }));
                }
            } else {
                socket.send(JSON.stringify({ error: "Unknown message type" }));
            }
        });
        socket.on("close", () => {
            this.removeUser(socket);
        });
        socket.on("error", () => {
            this.removeUser(socket);
        });
    }
}