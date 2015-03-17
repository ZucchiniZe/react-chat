import io from 'socket.io-client';
import Actions from '../actions/Actions'
var socket = io(location.origin);

export default {
  initSockets() {
    socket.on('send:message', (data) => {
      Actions.addMessage(data);
    });
    socket.on('person:join', (data) => {
      Actions.personJoin(data);
    });
    socket.on('person:leave', (data) => {
      Actions.personLeave(data);
    });
  },
  sendMessage(user, message, ts) {
    const message = {
      user: user,
      content: message,
      special: false,
      timestamp: ts
    }
    socket.emit('client:message', message);
    return message;
  },
  sendName(name) {
    socket.emit('set:name', name);
  }
}
