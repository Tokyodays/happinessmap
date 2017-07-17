var request = require('superagent');
var util = require('util');
var twitter = require('twitter');
var twit = new twitter({
  consumer_key: 'PUM55p4cAej9wxlavEEh999FD',
  consumer_secret: 'JJch1GZzPqqLZyOlbFzc3L3OwdTHj77uSSCUZy9iNeegdkieSm',
  access_token_key: '177152399-TF6chX4s7oNn1qyiW7BjjxfzuWjlqWPJ45ms6Q5d',
  access_token_secret: 'LcqwN3w57TmkyoSuI3fhA9YQ0u1t93Qo3p1B01KtM4igi'
});

var token = '2f866e09-b924-4dd1-bac9-6819df1b9df9';
var endpoint = 'https://api.apitore.com/api/39/sentiment-v2/predict';

var keyword = process.argv[2]; //第一引数
var option = {'track': keyword,'locations':'122.87,24.84,153.01,46.80'};
console.log(keyword+'を含むツイートを取得します。');

var fs = require('fs');
var app = require('http').createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(fs.readFileSync('index.html'));
}).listen(3000);

var io = require('socket.io').listen(app);
io.sockets.on('connection', function(socket) {
  socket.on('msg', function(data) {
    io.sockets.emit('msg', data);
  });
});

twit.stream('statuses/filter', option, function(stream) {
  stream.on('data', function (data){
    if(data.geo != null){
      request
        .get(endpoint)
        .query({
          access_token: token,
          text: data.text
        })
        .end(function(err, res){
          io.sockets.emit('msg', Object.assign(res.body,data));
        });
    }
  });
});
