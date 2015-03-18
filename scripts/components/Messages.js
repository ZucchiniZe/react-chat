import React from 'react';
import Actions from '../actions/Actions';
import ChatStore from '../stores/ChatStore';
import moment from 'moment';

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
    if(localStorage.getItem('chatName')) {
      Actions.clientJoin(localStorage.getItem('chatName'))
      React.findDOMNode(this.refs.form).style.display = 'none'
    }
  }
  componentWillUnmount() {
    ChatStore.unlisten(this.onStoreChange);
  }
  handleSubmit(e) {
    e.preventDefault()
    Actions.clientJoin(React.findDOMNode(this.refs.name).value)
    React.findDOMNode(this.refs.name).value = ''
    React.findDOMNode(this.refs.form).style.display = 'none'
  }
  render() {
    var userNodes = this.state.users.map((user) => {
      return (
        <div className='user' key={user}>{user}</div>
      );
    });
    return (
      <div className='right users col-md-2'>
        <h3>Users:</h3>
        {userNodes}
        <form ref='form' onSubmit={this.handleSubmit.bind(this)}>
          <div className='input-group input-group-sm'>
            <input className='form-control' ref='name' aria-describedby='sizing-addon3' placeholder='Please enter your name' type='text'/>
          </div>
        </form>
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
  render() {
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    }
    var name;
    var messageNodes = this.state.messages.map((message) => {
      return (
        <li className='message list-group-item' key={message.timestamp}>
          <span className='sender'>{message.user.capitalize()}: </span>
          <span className='content'>{message.content}</span>
          <span className='timestamp'>{moment(message.timestamp).format('LT')}</span>
        </li>
      );
    });
    return (
      <div className='input-group messages col-md-10'>
        <h3>Message List</h3>
        <ul className='list-group'>
          {messageNodes}
        </ul>
        <MessageInput/>
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
      <div className="mesg-input input col-md-8">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input className='form-control' ref='input' type='text'/>
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
      <div className='main row'>
        <UserList/>
        <MessageList/>
      </div>
    );
  }
}

export default Messages;
