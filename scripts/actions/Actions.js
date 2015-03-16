import alt from '../alt'

class Actions {
  constructor() {
    this.generateActions('newMessage', 'clientJoin', 'personJoin', 'personLeave')
  }
}

export default alt.createActions(Actions);
