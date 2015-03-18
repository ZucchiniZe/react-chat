import io from 'socket.io-client';
import Actions from '../actions/Actions'
var socket = io(location.origin);

export default {
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
  sendMessage(user, message, ts) {
    const message = {
      user: user,
      content: message,
      timestamp: ts
    }
    socket.emit('client:message', message);
    return message;
  },
  sendJoin(name) {
    socket.emit('set:join', name);
  }
}
