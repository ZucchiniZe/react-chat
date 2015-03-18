import alt from '../alt';
import Actions from '../actions/Actions';
import Socket from '../utils/socket';

class PersonStore {
  constructor() {
    this.bindActions(Actions);
    this.users = [];
    this.messages = []
    this.user = 'Default Name';
  }
  onClientJoin(name) {
    this.user = name;
    localStorage.setItem('chatName', this.user);
    Socket.sendJoin(this.user)
  }
  onNewMessage(message) {
    this.messages.push(message);
    Socket.sendMessage(this.user, message.content, message.timestamp)
  }
  onAddMessage(message) {
    this.messages.push(message);
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
  static getName() {
    return this.getState().user
  }
}

export default alt.createStore(PersonStore)
