import React from 'react';
import App from './components/App';

var socket = require('socket.io-client')(location.origin);
socket.on('news', function (data) {
  console.log(data);
  setTimeout(function() {
    socket.emit('my other event', { my: 'data' });
  }, 2000)
});

React.render(<App />, document.body);
