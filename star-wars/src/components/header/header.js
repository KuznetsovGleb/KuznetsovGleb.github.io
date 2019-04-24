import React from 'react';
import {Link} from 'react-router-dom';


import './header.css';

const Header = () => {
  return (
    <header className="header">
      <h3>
        <Link to="/" className='header-title'>
          StarWars
        </Link>
      </h3>
      <ul className=" header-list">
        <li className="header-list-item">
          <Link to="/people/" className="header-link">People</Link>
        </li>
        <li className="header-list-item">
          <Link to="/planets/" className="header-link">Planets</Link>
        </li>
        <li className="header-list-item">
          <Link to="/starships/" className="header-link">Starships</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;