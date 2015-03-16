import React from 'react';
import Actions from '../actions/Actions';
import ChatStore from '../stores/ChatStore';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <h1>MessageList</h1>
    );
  }
}

class MessageInput extends React.Component {
  construtor(props) {
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
      <div className='messages'>
        <MessageList/>
        <MessageInput/>
      </div>
    );
  }
}
