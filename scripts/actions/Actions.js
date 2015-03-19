// Importing alt
import alt from '../alt'

// Creating all actions that a user can take includeing leaveing joining and new message
class Actions {
  constructor() {
    // Generating basic actions
    this.generateActions('clientJoin', 'clientLeave', 'personJoin', 'personLeave', 'addMessage')
  }
  // Creating the `newMessage` action
  newMessage(user, message) {
    // Preventing blank messages
    if(message === '') {
      return false;
    }
    // Dispatching the action with an object that consists of the user, message and a timetamp
    this.dispatch({
      user: user,
      content: message,
      timestamp: Date.now()
    });
  }
}

// Exporting the actions
export default alt.createActions(Actions);
