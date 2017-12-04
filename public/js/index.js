var socket = io();
var locationButton = $('#send-location');

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log(message.from + ": " + message.text);

    var li = $("<li></li>");
    li.text(`${message.from}: ${message.text}`);

    $("#messages").append(li);
});

socket.on('newLocationMessage', function(message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);

    $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
    // prevent default behaviour of submit event, which includes refreshing the page
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('input[name="message"]').val()
    }, function() {

    });
});

locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.');
    }  

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert('Unable to fetch location.');
    });
});