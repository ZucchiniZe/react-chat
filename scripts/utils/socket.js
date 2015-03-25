// Import socket client and actions
import io from 'socket.io-client';
import Actions from '../actions/Actions'
// Connect to server
if(!global) {
  var socket = io(window.location.origin);
}

export default {
  // Add listeners with corresponding actions
  initSockets() {
    socket.on('send:message', (data) => {
      Actions.addMessage(data);
    });
    socket.on('client:join', (data) => {
      Actions.personJoin(data);
    });
    socket.on('client:leave', (data) => {
      Actions.personLeave(data);
    });
  },
  // Create a message and send it to the server
  sendMessage(user, message, ts) {
    const message = {
      user: user,
      content: message,
      timestamp: ts
    }
    socket.emit('client:message', message);
    return message;
  },
  // Send the join message
  sendJoin(name) {
    socket.emit('local:join', name);
  },
  // Send the leave message
  sendLeave(name) {
    socket.emit('local:leave', name);
  }
}
