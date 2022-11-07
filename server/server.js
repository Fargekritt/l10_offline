import express from "express";
import { WebSocketServer } from "ws";

const app = express();

app.use(express.static("../client/dist"));
const messages = [];
const sockets = [];
const wsServer = new WebSocketServer({ noServer: true });

wsServer.on("connection", (socket) => {
   sockets.push(socket);

   for (const message of messages){
       socket.send(message.toString());
   }

   socket.on("message", (message) => {
        console.log("Message: " + message);
        messages.push(message);
        for (const recipient of sockets){
            recipient.send(message.toString());
        }
   });

   socket.on("close" , () => {
       console.log("CLOSED!");
       console.log(sockets.length);
       const index = sockets.indexOf(socket);
       sockets.splice(index, 1);
       console.log(sockets.length);
       if(sockets.length === 0){
           messages.length = 0;
       }
   });
});



const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`http://localhost:${server.address().port}`);
    server.on("upgrade", (req, socket, head) => {
       wsServer.handleUpgrade(req, socket, head, (socket) => {
         console.log("Connected!");
         wsServer.emit("connection", socket, req);
       });
    });
});