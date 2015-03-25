// Importing all the things
import React from 'react';
import App from './components/App';
import Socket from './utils/socket';
import Action from './actions/Actions';

// Adding styles
if(!global) {
  require('./styles/index.less');
}

// Initalizing websockets
Socket.initSockets();

// Shows when client leaves of force unload
window.onbeforeunload = function() {
  Action.clientLeave();
};

// Renders the app which is all of the compoents packages together
React.render(<App />, document.body);
