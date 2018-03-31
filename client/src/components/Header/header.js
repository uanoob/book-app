import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import SideNav from './Sidenav/sidenav';

class Header extends Component {
  state = {
    showNav: false,
  };

  onHideNav = () => {
    this.setState({
      showNav: false,
    });
  };

  render() {
    return (
      <header>
        <div className="open_nav">
          <FontAwesome
            name="bars"
            onClick={() => this.setState({ showNav: true })}
            style={{
              color: '#fff',
              padding: '10px',
              cursor: 'pointer',
            }}
          />
        </div>
        <SideNav showNav={this.state.showNav} onHideNav={() => this.onHideNav()} />
        <Link to="/" className="logo">
          The Book Shelf
        </Link>
      </header>
    );
  }
}

export default Header;
