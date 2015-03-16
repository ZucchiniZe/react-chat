import alt from '../alt'

class Actions {
  constructor() {
    this.generateActions('newMessage', 'personJoin', 'personLeave')
  }
}

export default alt.createActions(Actions);
