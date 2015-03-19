// Importing all components and libraries that are going to be packaged into app
import React from 'react';
import Messages from './Messages';
import Header from './Header';

export default class App extends React.Component {
  render() {
    // Rendering all components
    return (
      <div className='app container-fluid'>
        <Header/>
        <Messages/>
      </div>
    );
  }
}
