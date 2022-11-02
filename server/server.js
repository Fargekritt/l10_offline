import express from "express";
import { WebSocketServer } from "ws";

const app = express();

app.use(express.static("../client/dist"));

const wsServer = new WebSocketServer({ noServer: true });

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`http://localhost:${server.address().port}`);
    server.on("upgrade", (req, socket, head) => {
       wsServer.handleUpgrade(req, socket, head, (socket) => {
         console.log("Connected!");
         wsServer.emit("connection", socket, req);
       });
    });
});