import React from 'react';
import Actions from '../actions/Actions';
import ChatStore from '../stores/ChatStore';
import moment from 'moment'

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.onStoreChange = this.onStoreChange.bind(this);
    this.state = this._getStateFromStore();
  }
  _getStateFromStore() {
    return {
      users: ChatStore.getPeople()
    }
  }
  onStoreChange() {
    this.setState(this._getStateFromStore);
  }
  componentDidMount() {
    ChatStore.listen(this.onStoreChange);
  }
  componentWillUnmount() {
    ChatStore.unlisten(this.onStoreChange);
  }
  render() {
    var userNodes = this.state.users.map((user) => {
      return (
        <div className='user'>{user}</div>
      );
    });
    return (
      <div className='users'>
        {userNodes}
      </div>
    )
  }
}

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.onStoreChange = this.onStoreChange.bind(this);
    this.state = this._getStateFromStore();
  }
  _getStateFromStore() {
    return {
      messages: ChatStore.getMessages()
    }
  }
  onStoreChange() {
    this.setState(this._getStateFromStore);
  }
  componentDidMount() {
    ChatStore.listen(this.onStoreChange);
  }
  componentWillUnmount() {
    ChatStore.unlisten(this.onStoreChange);
  }
  handleSubmit(e) {
    e.preventDefault()
    Actions.clientJoin(React.findDOMNode(this.refs.name).value)
    React.findDOMNode(this.refs.name).value = ''
  }
  render() {
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    }
    var name;
    var messageNodes = this.state.messages.map((message) => {
      return (
        <li className='message list-group-item' key={message.timestamp}>
          <div className='timestamp'>{moment(message.timestamp).format('LT')}</div>
          <span className='sender'>{message.user.capitalize()}: </span>
          <span className='content'>{message.content}</span>
        </li>
      );
    });
    return (
      <div className='input-group messages'>
        <h3>
          MessageList
          <small>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <input ref='name' placeholder='Please enter your name' type='text'/>
            </form>
          </small>
        </h3>
        <ul className='list-group'>
          {messageNodes}
        </ul>
      </div>
    );
  }
}

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit(e) {
    e.preventDefault()
    Actions.newMessage(ChatStore.getName(), React.findDOMNode(this.refs.input).value)
    React.findDOMNode(this.refs.input).value = ''
  }
  render() {
    return (
      <div className="input">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input ref='input' type='text'/>
        </form>
      </div>
    );
  }
}

class Messages extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='main'>
        <MessageList/>
        <MessageInput/>
        <UserList/>
      </div>
    );
  }
}

export default Messages;
