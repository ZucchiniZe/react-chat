import io from 'socket.io-client';
import Actions from '../actions/Actions'
var socket = io(location.origin);

export default {
  initSockets() {
    socket.on('message', function(data) {
      Actions.addMessage(data);
    });
    socket.on('personJoin', function(data) {
      Actions.personJoin(data);
    });
    socket.on('personLeave', function(data) {
      Actions.personLeave(data);
    });
  },
  sendMessage(user, message) {
    const message = {
      user: user,
      content: message,
      timestamp: Date.now()
    }
    socket.emit('clientMessage', message);
    return message;
  }
}
