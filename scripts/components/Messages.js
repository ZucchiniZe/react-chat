import React from 'react';
import Actions from '../actions/Actions';
import ChatStore from '../stores/ChatStore';

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
    var messageNodes = this.state.messages.map((message) => {
      return (
        <div className='message' key={message.timestamp}>
          <div className='timestamp'>{message.timestamp}</div>
          <span className='sender'>{message.user.capitalize()}: </span>
          <span className='content'>{message.content}</span>
        </div>
      );
    });
    return (
      <div className='messages'>
        <h1>MessageList</h1>
        {messageNodes}
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
      </div>
    );
  }
}

export default Messages;
