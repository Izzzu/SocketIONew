console.log('Client.js loaded');

var socket = io();

socket.on('connect', function () {
 var params = jQuery.deparam(window.location.search);
 console.log('Params: ' + params.name)
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
        }
    })
});

socket.on('newMessage', function (msg) {
    console.log('new message.js:', msg.text);
    var time = moment(msg.createdTime).format('h:mm a');
    jQuery('#messages')
        .append(jQuery('<li id="other">')
            .text(msg.from+ ' [' + time +'] ' + msg.text));
})

socket.on('chatMessage', function (msg) {
    console.log('msg', msg.text);
    var time = moment(msg.createdTime).format('h:mm a');
    console.log('Append message.js');
    jQuery('#messages').append(jQuery('<li>')
        .text(msg.from + ' [' + time + '] ' + msg.text));
})

socket.on('locationMessage', function(msg) {
    console.log("Location message ", msg.url);
    var time = moment(msg.createdTime).format('h:mm a');
    var li = jQuery('<li>');
    li.text(msg.userName + ' [' + time + '] ')
    var a = jQuery('<a> My current location </a>');
    a.attr('href', msg.url);
    li.append(a);
    jQuery('#messages').append(li);

})

socket.on('updateListMessage', function(users) {
    var ol = jQuery('<ol></ol>');
    users.forEach(function(u) {
        ol.append(jQuery('<li></li>').text(u));
    });

    jQuery('#people').html(ol);

})

jQuery('#form').submit(function () {
    socket.emit('chatMessage', jQuery('#m').val());
    console.log('Send form');
    jQuery('#m').val('');
    return false;
})


var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log("sending location message to server");
        socket.emit('locationMessage', {
            lat: position.coords.latitude,
            lon: position.coords.longitude
        })
    })
})

