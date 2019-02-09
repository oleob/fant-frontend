import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';

import './header.scss';

const Header = () => (
  <div className="header">
    <MenuIcon className="header__icon" />
    <img className="header__logo" src="/fant.svg" alt="logo" />
  </div>
);

export default Header;
