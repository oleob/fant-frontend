import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';

import './header.scss';

const Header = () => (
  <div className="header">
    <MenuIcon className="header__icon" />
    <h1>Fant</h1>
  </div>
);

export default Header;
