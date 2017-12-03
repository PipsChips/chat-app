var socket = io();
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

$('#message-form').on('submit', function(e) {
    // prevent default behaviour of submit event, which includes refreshing the page
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('input[name="message"]').val()
    }, function() {

    });
});