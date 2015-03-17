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
    Actions.newMessage('alex', 'this is cool')
  }
  componentWillUnmount() {
    ChatStore.unlisten(this.onStoreChange);
  }
  render() {
    var messageNodes = this.state.messages.map((message) => {
      return (
        <div className='message' key={message.timestamp}>
          <span className='timestamp'>{message.timestamp}</span>
          <span className='sender'>{message.sender}</span>
          <div className='content'>{message.content}</div>
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
  render() {
    return (
      <h1>MessageInput</h1>
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
