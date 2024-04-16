import React from 'react';
import './NavBar.css'; // Assuming you have separate CSS for NavBar

const NavBar = () => {
  return (
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
  );
};

export default NavBar;
