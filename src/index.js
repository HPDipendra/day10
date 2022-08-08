import express from "express";
import http from "http"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();


const server = http.createServer(app)

const io = new Server(server);


io.on("connection", (socket) => {
    console.log("a user connected" + socket.id);
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on('chat message', (data) => {
      
        io.emit('chat message', data);
      });
});


app.get('/', (req, res) => {
    +
    res.sendFile(__dirname + '/views/homePage.html')
})



server.listen(4000, () => {
    console.log("the server is running in port 4000");
})