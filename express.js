var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var webpack = require('webpack');
var WebpackDevMiddleware = require('webpack-dev-middleware');
var config = require('./webpack.config');

var people = [];

server.listen(process.env.PORT)

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(WebpackDevMiddleware(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}));

app.get('/', function(req, res) {
  res.render('index')
});

app.use(express.static(__dirname + '/static'));

io.on('connection', function (socket) {
  socket.on('client:message', function(data) {
    console.log(data)
    socket.broadcast.emit('send:message', data)
  });
  socket.on('set:join', function(data) {
    people.push(data)
    socket.emit('client:join', people)
    socket.broadcast.emit('client:join', people)
  });
  socket.on('set:leave', function(data) {
    var index = people.indexOf(data);
    if(index > -1) people.splice(index, 1);
    socket.broadcast.emit('client:leave', people)
  });
});
