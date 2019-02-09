import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

import './header.scss';

const Header = () => (
  <div className="header">
    <MenuIcon className="header__icon" />
    <Link to="/">
      <img className="header__logo" src="/fant.svg" alt="logo" />
    </Link>
  </div>
);

export default Header;
