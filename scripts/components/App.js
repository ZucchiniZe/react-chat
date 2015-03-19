//Importing all components that are going to be packaged into app
import React from 'react';
import Messages from './Messages';
import Header from './Header';

export default class App extends React.Component {
  render() {
    return (
      //Rendering all components
      <div className='app container-fluid'>
        <Header/>
        <Messages/>
      </div>
    );
  }
}
