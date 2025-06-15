import { WebSocketServer } from 'ws';
import { GameManager } from './gameManager';

const wss = new WebSocketServer({ port: 8080 });

const gameManager= new GameManager()
wss.on('connection', function connection(ws) {
  console.log("Client connected");
  gameManager.addUser(ws)
  ws.on("close",()=>gameManager.removeUser(ws))
});