var fs = require('fs');
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var router = express.Router();
var util = require('util');
var twitter = require('twitter');
var twit = new twitter({
  consumer_key: 'PUM55p4cAej9wxlavEEh999FD',
  consumer_secret: 'JJch1GZzPqqLZyOlbFzc3L3OwdTHj77uSSCUZy9iNeegdkieSm',
  access_token_key: '177152399-TF6chX4s7oNn1qyiW7BjjxfzuWjlqWPJ45ms6Q5d',
  access_token_secret: 'LcqwN3w57TmkyoSuI3fhA9YQ0u1t93Qo3p1B01KtM4igi'
});

/* GET home page. */
router.get('/', function(req, res, next) {


  //var keyword = process.argv[2]; //第一引数
  var keyword = "trump";
  var option = {'track': keyword,'locations':'122.87,24.84,153.01,46.80'};

  server.on('request', function(req, res) {
    var stream = fs.createReadStream('index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    stream.pipe(res);
  });

  var io = require('socket.io').listen(server);

  io.sockets.on('connection', function(socket) {
    console.log(socket);
    socket.emit('msg', {message: 'hello'}, function (data) {
      console.log('result: ' + data);
    });

    socket.on('msg', function(data) {
      io.sockets.emit('msg', data);
    });
  });

  twit.stream('statuses/filter', option, function(stream) {
    stream.on('data', function (data) {
      io.sockets.emit('msg', data.text);
      if(data.geo != null){
      //console.log(data);
      }
    });
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
