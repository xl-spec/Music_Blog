import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <div>
      <div className="homeButtonContainer">
        <Link to="/" className="homeButton">Home</Link>
      </div>
      <nav className="navbar">
        <div className="rightNav">
          <Link to="/albums" className="navbar-button">Album</Link>
          <Link to="/singles" className="navbar-button">Single</Link>
          <Link to="/mashupsoredits" className="navbar-button">Mashup/Edits</Link>
          <Link to="/top10" className="navbar-button">Top 10</Link>
          <Link to="/search" className="navbar-button">Search</Link>
          <input type="text" name="search" id="search" placeholder="    search..." />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
