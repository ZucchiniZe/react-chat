//Importing all the things
import React from 'react';
import App from './components/App';
import Socket from './utils/socket';
import Action from './actions/Actions';

require('./styles/index.less')

Socket.initSockets();

window.onbeforeunload = function() {
  Action.clientLeave();
}

React.render(<App />, document.body);
