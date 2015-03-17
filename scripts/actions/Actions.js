import alt from '../alt'

class Actions {
  constructor() {
    this.generateActions('clientJoin', 'personJoin', 'personLeave')
  }
  newMessage(user, message) {
    this.dispatch({
      sender: user,
      content: message,
      timestamp: Date.now()
    });
  }
  addMessage(user, message) {
    // this.dispatch({
    //   sender: user,
    //   content: message,
    //   timestamp: Date.now()
    // })
  }
}

export default alt.createActions(Actions);
