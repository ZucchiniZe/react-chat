// Importing all libraries, stores and actions
import React from 'react';
import moment from 'moment';
import Actions from '../actions/Actions';
import ChatStore from '../stores/ChatStore';

// Creating the sidebar of users
class UserList extends React.Component {
  constructor(props) {
    super(props);
    // Fuxing react v0.13.0 bindings
    this.onStoreChange = this.onStoreChange.bind(this);
    // Get initial state from the ChatStore
    this.state = this._getStateFromStore();
  }
  _getStateFromStore() {
    return {
      users: ChatStore.getPeople()
    }
  }
  // When the store changes re-set the state from the store
  onStoreChange() {
    this.setState(this._getStateFromStore);
  }
  // Listen for the store changes and check if your name is in localStorage
  componentDidMount() {
    ChatStore.listen(this.onStoreChange);
    if(localStorage.getItem('chatName')) {
      Actions.clientJoin(localStorage.getItem('chatName'));
      React.findDOMNode(this.refs.form).style.display = 'none';
    }
  }
  // Unlisten for the store changes so we don't have a memory leak and unused CPU time
  componentWillUnmount() {
    ChatStore.unlisten(this.onStoreChange);
  }
  // Trigger the `clientJoin` action when you submit your name
  handleSubmit(e) {
    e.preventDefault();
    Actions.clientJoin(React.findDOMNode(this.refs.name).value);
    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.form).style.display = 'none';
  }
  // Render the actual component
  render() {
    // Create and array with the people in the users array
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

// Creating the list of messages
class MessageList extends React.Component {
  constructor(props) {
    super(props);
    // Fuxing react v0.13.0 bindings
    this.onStoreChange = this.onStoreChange.bind(this);
    this.state = this._getStateFromStore();
  }
  _getStateFromStore() {
    return {
      messages: ChatStore.getMessages()
    }
  }
  // When the store changes re-set the state from the store
  onStoreChange() {
    this.setState(this._getStateFromStore);
  }
  // Listen for the store changes
  componentDidMount() {
    ChatStore.listen(this.onStoreChange);
  }
  // Unlisten for the store changes so we don't have a memory leak and unused CPU time
  componentWillUnmount() {
    ChatStore.unlisten(this.onStoreChange);
  }
  // When new messages scroll to the bottom of the div
  componentDidUpdate() {
    React.findDOMNode(this.refs.messages).scrollTop = React.findDOMNode(this.refs.messages).scrollHeight;
  }
  // Render the actual component
  render() {
    // Capitalize the namez
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    }
    // Create an array of react elements with the messages
    var messageNodes = this.state.messages.map((message) => {
      return (
        <li className='message list-group-item' key={message.timestamp}>
          <span className='sender'>{message.user.capitalize()}: </span>
          <span className='content'>{message.content}</span>
          <span className='timestamp'>{moment(message.timestamp).format('LT')}</span>
        </li>
      );
    });
    // Render the component with the message list
    // LINE: 120 (Can't put comments in return) Render the message input in
    // here so they are in the same div
    return (
      <div className='message-group col-md-10'>
        <h3>Message List</h3>
        <div ref='messages' className="messages">
          <ul className='list-group'>
            {messageNodes}
          </ul>
        </div>
        <MessageInput/>
      </div>
    );
  }
}

// Create the input form for the messages
class MessageInput extends React.Component {
  constructor(props) {
    super(props);
  }
  // Handle the submit of the form to trigger an action of `newMessage`
  handleSubmit(e) {
    e.preventDefault()
    // Make it so the user has to enter name
    if(ChatStore.getName() !== 'Default Name') {
      Actions.newMessage(ChatStore.getName(), React.findDOMNode(this.refs.input).value)
      React.findDOMNode(this.refs.input).value = ''
    } else {
      React.findDOMNode(this.refs.input).value = '<----- Please enter your name'
    }
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

// A simple wrapper component so they can go together
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

// Export the wrapper component so you can use this in other files
export default Messages;
