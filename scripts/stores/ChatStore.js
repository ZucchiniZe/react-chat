import alt from '../alt';
import Actions from '../actions/Actions';
import Socket from '../utils/socket';

class PersonStore {
  constructor() {
    this.bindActions(Actions);
    this.users = [];
    this.messages = []
    this.user = '';
  }
  onClientJoin(name) {
    this.user = name;
  }
  onNewMessage(message) {
    this.messages.push(message);
    console.log(message)
    Socket.sendMessage('alex', message.content)
  }
  onAddMessage(message) {
    this.messages.push(message);
    // Socket.sendMessage(this.user, message)
  }
  onPersonJoin(person) {
    this.users.push(person);
  }
  onPersonLeave(perosn) {
    var index = this.users.indexOf(person);
    this.users.splice(index, 1)
  }
  static getMessages() {
    return this.getState().messages;
  }
  static getPeople() {
    return this.getState().users;
  }
}

export default alt.createStore(PersonStore)
