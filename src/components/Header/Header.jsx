import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

const Header = () => (
  <div className="header">
    <Link to="/">
      <img className="header__logo" src="/fant.svg" alt="logo" />
    </Link>
  </div>
);

export default Header;
