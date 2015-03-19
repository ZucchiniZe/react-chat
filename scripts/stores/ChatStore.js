// Import all the libraries
import alt from '../alt';
import Actions from '../actions/Actions';
import Socket from '../utils/socket';
import Favicon from '../utils/favicon';

// Custom function to concatenate two arrays without duplicates
function uniqueArray(arr1, arr2) {
  var arr = arr1.concat(arr2);
  for(var i=0; i < arr.length; ++i) {
    for(var j=i+1; j < arr.length; ++j) {
      if(arr[i] === arr[j]) arr.splice(j--, 1);
    }
  }
  return arr;
};

// The store where all the client side data is being stored
class PersonStore {
  constructor() {
    // Make the store functions trigger when actions are called
    this.bindActions(Actions);
    // Initialize users array
    this.users = [];
    // Initialize messages array
    this.messages = [];
    // Initialize the hiddenMessages num for the favicon
    this.hiddenMessages = 0;
    // Give the user a default name
    this.user = 'Default Name';

    // Add eventlistener to reset the favicon
    document.addEventListener('visibilitychange', this.resetMessageCount);
  }
  // Reset the hiddenMessage count and favicon
  resetMessageCount() {
    if(!document.hidden) {
      this.hiddenMessages = 0;
      Favicon.setBubble(this.hiddenMessages);
    }
  }
  // When the client joins set their username
  onClientJoin(name) {
    this.user = name;
    localStorage.setItem('chatName', this.user);
    Socket.sendJoin(this.user)
  }
  // Send the websocket leave command
  onClientLeave() {
    Socket.sendLeave(this.user)
  }
  // When you send a message
  onNewMessage(message) {
    this.messages.push(message);
    Socket.sendMessage(this.user, message.content, message.timestamp)
  }
  // When you receive a message
  onAddMessage(message) {
    if(document.hidden) {
      this.hiddenMessages += 1;
      Favicon.setBubble(this.hiddenMessages);
    }
    this.messages.push(message);
  }
  // When people join, diff the array and make it so there are no doubles
  onPersonJoin(newPeople) {
    this.users = uniqueArray(this.users, newPeople);
  }
  // Set users array to people provided by server
  onPersonLeave(newPeople) {
    this.users = newPeople;
  }
  // Return a list of messages
  static getMessages() {
    return this.getState().messages;
  }
  // Return a list of users
  static getPeople() {
    return this.getState().users;
  }
  // Return username
  static getName() {
    return this.getState().user;
  }
}

export default alt.createStore(PersonStore)
