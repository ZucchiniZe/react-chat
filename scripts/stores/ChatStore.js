import alt from '../alt'
import Actions from '../actions/Actions'

class PersonStore {
  constructor() {
    this.bindActions(Actions)
  }
  onNewMessage() {

  }
  onPersonJoin() {

  }
  onPersonLeave() {
    
  }
}

export default alt.createStore(PersonStore)
