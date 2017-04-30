console.log('Client.js loaded');

var socket = io();

socket.on('newMessage', function (msg) {
    console.log('new message:', msg.text);
    var time = moment(msg.createdTime).format('h:mm a');
    jQuery('#messages')
        .append(jQuery('<li id="other">')
            .text(time + ': ' + msg.text));
})

socket.on('chatMessage', function (msg) {
    console.log('msg', msg.text);
    var time = moment(msg.createdTime).format('h:mm a');

    jQuery('#messages').append(jQuery('<li>')
        .text(time + ': ' + msg.text));
})

jQuery('#form').submit(function () {
    socket.emit('chatMessage', jQuery('#m').val());
    jQuery('#m').val('');
    return false;
})

