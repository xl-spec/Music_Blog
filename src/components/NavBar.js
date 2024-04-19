import React from 'react';
import { Link } from 'react-router-dom'; // Import Link if using React Router
import './NavBar.css';

const NavBar = () => {
  return (
    <div>
      <div className="homeButtonContainer">
        <Link to="/" className="homeButton">Home</Link>
      </div>
      <nav className="navbar">
        <div className="rightNav">
          <button className="albumPageButton">Album</button>
          <button className="singlePageButton">Single</button>
          <button className="mashupOrEditPageButton">Mashup/Edits</button>
          <button className="top10PageButton">Top 10</button>
          <input type="text" name="search" id="search" placeholder="Search..." />
          <button className="searchButton">Search</button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
