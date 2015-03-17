import React from 'react';
import App from './components/App';
import Socket from './utils/socket';

require('./styles/index.scss')

Socket.initSockets();

React.render(<App />, document.body);
