$(function() {
  var socket = io.connect('http://localhost:3000/stream/');
  socket.on('connect', function() { // 2
    log('connected');
    socket.emit('msg send', 'data'); // 3
    socket.on('msg push', function (msg) { // 7
      log(msg); // 8
    });
  });
  $('form').submit(function() {
    socket.emit('msg', $('input').val());
    $('input').val('');
    return false;
  });

  socket.on('msg', function(data) {
    console.log(data);
    $('div').prepend(data + '<br>');
  });
});
