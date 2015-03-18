import alt from '../alt';
import Actions from '../actions/Actions';
import Socket from '../utils/socket';
import Favicon from '../utils/favicon';

function uniqueArray(arr1, arr2) {
  var arr = arr1.concat(arr2);
  for(var i=0; i < arr.length; ++i) {
    for(var j=i+1; j < arr.length; ++j) {
      if(arr[i] === arr[j]) arr.splice(j--, 1);
    }
  }
  return arr;
};

class PersonStore {
  constructor() {
    this.bindActions(Actions);
    this.users = [];
    this.messages = [];
    this.hiddenmessages = [];
    this.user = 'Default Name';
  }
  onClientJoin(name) {
    this.user = name;
    localStorage.setItem('chatName', this.user);
    Socket.sendJoin(this.user)
  }
  onClientLeave() {
    Socket.sendLeave(this.user)
  }
  onNewMessage(message) {
    this.messages.push(message);
    Socket.sendMessage(this.user, message.content, message.timestamp)
  }
  onAddMessage(message) {
    if(document.hidden) {
      this.hiddenmessages.push(message);
      Favicon.badge(this.hiddenmessages.length);
    }
    document.addEventListener('visibilitychange', function() {
      if(document.hidden) {
        this.hiddenmessages = [];
        Favicon.reset();
      }
    }, false);
    this.messages.push(message);
  }
  onPersonJoin(newPeople) {
    this.users = uniqueArray(this.users, newPeople);
  }
  onPersonLeave(newPeople) {
    this.users = newPeople;
  }
  static getMessages() {
    return this.getState().messages;
  }
  static getPeople() {
    return this.getState().users;
  }
  static getName() {
    return this.getState().user;
  }
}

export default alt.createStore(PersonStore)
