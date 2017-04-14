
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/lib'));
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});



http.listen(3000);
io.sockets.on('connection', function (socket) {

    //when receiving the data from the server, push the same message to client.
    socket.on("clientMsg", function (data) {

        //send the data to the current client requested/sent.
        socket.emit("serverMsg", data);
        //send the data to all the clients who are accessing the same site(localhost)
        socket.broadcast.emit("serverMsg", data);
    });

    socket.on("sender", function (data) {
        socket.emit("sender", data);
        socket.broadcast.emit("sender", data);
    });
});
