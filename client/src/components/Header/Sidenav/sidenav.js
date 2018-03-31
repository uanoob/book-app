import React from 'react';
import SimpleSidenav from 'react-simple-sidenav';

const Sidenav = props => (
  <SimpleSidenav
    showNav={props.showNav}
    onHideNav={props.onHideNav}
    navStyle={{
      background: '#242424',
      maxWidth: '200px',
    }}
  >
    Items
  </SimpleSidenav>
);

export default Sidenav;
