$(function() {
  var socket = io.connect();
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
