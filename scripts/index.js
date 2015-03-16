import React from 'react';
import App from './App';

var socket = require('socket.io-client')(location.origin);
socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});

React.render(<App />, document.body);
