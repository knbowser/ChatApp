var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages =[]; //need to change this, and store messages in a database instead of arr

console.log('websockets server started');

ws.on('connection', function (socket) {
  console.log('client connection established');

  messages.forEach(function (msg) {
    socket.send(msg);
  });

  socket.on('message', function (data)  {
    console.log('message received: ' + data);
    messages.push(data);
    ws.clients.forEach(function (clientSocket)  {
      clientSocket.send(data);
    });
  });
});
