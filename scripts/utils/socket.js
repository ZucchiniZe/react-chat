import io from 'socket.io-client';
import Actions from '../actions/Actions'
var socket = io(location.origin);

export default {
  initSockets() {
    socket.on('message', function(data) {
      Actions.newMessage(data);
    });
    socket.on('personJoin', function(data) {
      Actions.personJoin(data);
    });
    socket.on('personLeave', function(data) {
      Actions.personLeave(data);
    });
  },
  sendMessage(user, message) {
    socket.emit('message', {
      sender: user,
      content: message,
      sentAt: new Date()
    });
  }
}
