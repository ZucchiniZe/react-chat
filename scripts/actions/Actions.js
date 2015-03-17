import alt from '../alt'

class Actions {
  constructor() {
    this.generateActions('setName', 'clientJoin', 'personJoin', 'personLeave')
  }
  newMessage(user, message) {
    if(message === '') {
      return false;
    }
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

export default alt.createActions(Actions);
