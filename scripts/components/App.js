import React from 'react';
import Messages from './Messages';
import Header from './Header';

export default class App extends React.Component {
  render() {
    return (
      <div className='app container-fluid'>
        <Header/>
        <Messages/>
      </div>
    );
  }
}
