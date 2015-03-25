require('babel/register');
// Basic imports and libraries
var express = require('express')
// Initiate new express instance
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var React = require('react');
var App = require('./scripts/index.js');

var people = [];

// Listen on port $PORT
server.listen(process.env.PORT)
console.log('Listening on port', process.env.PORT)

// Set ejs view engine
app.set('view engine', 'ejs');

// If $NODE_ENV is development use the hot reload webpack middleware
if(process.env.NODE_ENV === 'development') {
  var webpack = require('webpack');
  var config = require('./webpack.dev.config');
  var WebpackDevMiddleware = require('webpack-dev-middleware');
  app.use(WebpackDevMiddleware(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
  }));
}

console.log(React.renderToString(React.createElement(App, null)));
// Get the index page with the `env` local
app.get('/', function(req, res) {
  res.render('index', {env: process.env.NODE_ENV, component: React.renderToString(React.createElement(App, null))})
});

// Serve the static directory
app.use(express.static(__dirname + '/static'));

// When the server makes a connection with the client
io.on('connection', function (socket) {
  // Listen for the 'client:message' socket
  socket.on('client:message', function(data) {
    // Emit data to all other listening sockets
    socket.broadcast.emit('send:message', data)
  });
  // Listen for user joins
  socket.on('local:join', function(data) {
    // Add person to people array
    people.push(data)
    // Emit for all clients the people array
    socket.emit('client:join', people)
    socket.broadcast.emit('client:join', people)
  });
  // Listen for user leaves
  socket.on('local:leave', function(data) {
    // Find index of person in people array
    var index = people.indexOf(data);
    // If they exist remove them from array
    if(index > -1) people.splice(index, 1);
    // Emit for all users the people array
    socket.broadcast.emit('client:leave', people)
  });
});
