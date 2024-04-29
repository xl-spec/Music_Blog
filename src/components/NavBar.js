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
          <Link to="/albums" className="navbar button">Album</Link>
          <Link to="/singles" className="navButton singlePageButton">Single</Link>
          <Link to="/mashupsoredits" className="navButton mashupOrEditPageButton">Mashup/Edits</Link>
          <Link to="/top10" className="navButton top10PageButton">Top 10</Link>
          <input type="text" name="search" id="search" placeholder="Search..." />
          <Link to="/search" className="navButton searchButton">Search</Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
