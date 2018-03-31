import React from 'react';
import SimpleSidenav from 'react-simple-sidenav';

import SidenavItems from './sidenav_items';

const Sidenav = props => (
  <SimpleSidenav
    showNav={props.showNav}
    onHideNav={props.onHideNav}
    navStyle={{
      background: '#242424',
      maxWidth: '200px',
    }}
  >
    <SidenavItems />
  </SimpleSidenav>
);

export default Sidenav;
