var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var http = require('http');
var app = express();
var server = http.createServer(app);

var index = require('./routes/index');
var users = require('./routes/users');
var stream = require('./routes/stream');
var map = require('./routes/map');

var fs = require('fs');
var http = require('http').createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(fs.readFileSync('index.html'));
}).listen(3000);
var io = require('socket.io').listen(http);
//var io = require('socket.io')(server);
io.sockets.on('connection', function(socket) {
  console.log('a user connected');

  console.log(socket);
  socket.emit('msg', {message: 'hello'}, function (data) {
    console.log('result: ' + data);
  });

  socket.on('msg', function(data) {
    io.sockets.emit('msg', data);
  });
});

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
//
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(sassMiddleware({
//   src: path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   indentedSyntax: true, // true = .sass and false = .scss
//   sourceMap: true
// }));
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', map);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
//
// var twitter = require('twitter');
// var twit = new twitter({
//   consumer_key: 'PUM55p4cAej9wxlavEEh999FD',
//   consumer_secret: 'JJch1GZzPqqLZyOlbFzc3L3OwdTHj77uSSCUZy9iNeegdkieSm',
//   access_token_key: '177152399-TF6chX4s7oNn1qyiW7BjjxfzuWjlqWPJ45ms6Q5d',
//   access_token_secret: 'LcqwN3w57TmkyoSuI3fhA9YQ0u1t93Qo3p1B01KtM4igi'
// });
//
// //var keyword = process.argv[2]; //第一引数
// var keyword = "trump";
// var option = {'track': keyword,'locations':'122.87,24.84,153.01,46.80'};
//
// // server.on('request', function(req, res) {
// //   var stream = fs.createReadStream('index.html');
// //   res.writeHead(200, {'Content-Type': 'text/html'});
// //   stream.pipe(res);
// // });
//
//
//
// // twit.stream('statuses/filter', option, function(stream) {
// //   stream.on('data', function (data) {
// //     io.sockets.emit('msg', data.text);
// //     if(data.geo != null){
// //     //console.log(data);
// //     }
// //   });
// // });
//
//
// module.exports = app;
