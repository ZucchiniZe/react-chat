//Importing alt
import alt from '../alt'
//Creating all actions that a user can take includeing leaveing joining and new message
class Actions {
  constructor() {
    this.generateActions('clientJoin', 'clientLeave', 'personJoin', 'personLeave')
  }
  //Preventing blank messages
  newMessage(user, message) {
    if(message === '') {
      return false;
    }
    //Creating timestamp
    this.dispatch({
      user: user,
      content: message,
      timestamp: Date.now()
    });
  }
  addMessage(message) {
    this.dispatch(message)
  }
}
//Exporting this component
export default alt.createActions(Actions);
