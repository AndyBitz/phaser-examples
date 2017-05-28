const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });
});

app.use(express.static('public'));

server.listen(3000, () => {
  console.log('> Listening on Port 3000');
});
