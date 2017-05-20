var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment')

var message = require('./generateMessage');
const {Users} = require("./users");

var users = new Users();

app.use(express.static(__dirname + '/'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/chat.html');
});

app.set('port', (process.env.PORT || 3000));

io.on('connection', function (socket) {

    socket.on('join', function(params, callback){
        socket.join(params.room);
        var user = users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateListMessage', users.getUserList(params.room));

        socket.emit('newMessage', message.message('Admin','Welcome in a chat'));
        socket.broadcast.to(params.room).emit('newMessage', message.message('Admin','New user connected'));
    });

    socket.on('chatMessage', function (msg) {
        console.log('User message.js:', msg);
        var user = users.getUser(socket.id);
        console.log('ChatMessage in server User ', user);
        io.to(user.room).emit('chatMessage', message.message(user.name,msg));
    })

    socket.on('locationMessage', function(msg) {
        var user = users.getUser(socket.id);
        io.to(user.room).emit('locationMessage', message.geolocationMessage(user.name, msg.lat, msg.lon));

    })

    socket.on('disconnect', function () {
        console.log('user disconnected');
    })
});

http.listen(app.get('port'), function () {
    console.log('App is listening on port ', app.get('port'));
});
