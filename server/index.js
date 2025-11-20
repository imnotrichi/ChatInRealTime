const express = require('express');
const http = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/cliente/index.html');
});

io.on('connection', (socket) => {
    io.emit('user connected', 'Un usuario se ha conectado');
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    
    socket.on('disconnect', () => {
        io.emit('user disconnected', 'Un usuario se ha desconectado');
    });
});

server.listen(3000, () => {
    console.log('Escuchando en el puerto 3000.');
});