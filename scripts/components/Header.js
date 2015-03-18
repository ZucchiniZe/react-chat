import React from 'react';
class Header extends React.Component {
  render() {
    return (
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

export default Header;
