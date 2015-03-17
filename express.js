var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var webpack = require('webpack');
var WebpackDevMiddleware = require('webpack-dev-middleware');
var config = require('./webpack.config');

server.listen(process.env.PORT)

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')

app.use(WebpackDevMiddleware(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}))

app.get('*', function(req, res) {
  res.render('index')
});

io.on('connection', function (socket) {
  socket.on('client:message', function(data) {
    console.log(data)
    socket.broadcast.emit('send:message', data)
  });
  socket.on('set:join', function(data) {
    socket.emit('client:join', data)
  });
});
