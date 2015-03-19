//Importing the react module so everything works
import React from 'react';
class Header extends React.Component {
  render() {
    return (
      //Nothing special just a bootstrap navbar
      <nav className='navbar-fixed-fixed-top navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <a className='navbar-brand'>Welcome to Martini!</a>
          </div>
        </div>
      </nav>
    );
  }
}
//Exporting 
export default Header;
