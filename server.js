var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment')

var usersId = {}
app.use(express.static(__dirname + '/'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.set('port', (process.env.PORT || 3000));

io.on('connection', function (socket) {
    var socketId = socket.id;

    console.log('user connected')

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome in a chat',
        createdTime: moment().valueOf()
    });
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user connected',
        createdTime: moment().valueOf()
    });

    socket.on('chatMessage', function (msg) {
        console.log('User message:', msg);
        io.emit('chatMessage', {
            from: 'User',
            text: msg,
            createdTime: moment().valueOf()
        });
    })

    socket.on('disconnect', function () {
        console.log('user disconnected');
    })
});


http.listen(app.get('port'), function () {
    console.log('App is listening on port ', app.get('port'));
});
