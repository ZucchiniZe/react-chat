import Alt from 'alt';

// Initiate new alt object
const alt = new Alt();
alt.dispatcher.register(console.log.bind(console))
export default alt;
