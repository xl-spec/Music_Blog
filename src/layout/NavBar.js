import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ spotifyLink }) => {
  const [currentSpotifyLink, setCurrentSpotifyLink] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchSpotifyLinkForPost = async (postId) => {
      // Example fetching logic, replace with your actual data fetching logic
      const response = await fetch(`/api/posts/${postId}`);
      const postData = await response.json();
      return postData.spotifyLink;
    };

    const path = location.pathname;
    if (path === '/') {
      setCurrentSpotifyLink(spotifyLink);
    } else if (path.startsWith('/posts/')) {
      const postId = path.split('/').pop();
      fetchSpotifyLinkForPost(postId).then(link => setCurrentSpotifyLink(link));
    } else {
      // Set the default link for other pages if needed
      setCurrentSpotifyLink('defaultSpotifyLinkForOtherPages');
    }
  }, [location, spotifyLink]);

  const getNavLinkClass = (path) => {
    return location.pathname === path ? 'navbar-button active' : 'navbar-button';
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/albums" className={getNavLinkClass("/albums")}>Album</Link>
          <Link to="/singles" className={getNavLinkClass("/singles")}>Single</Link>
          <Link to="/mashupsoredits" className={getNavLinkClass("/mashupsoredits")}>Mashup/Edits</Link>
          <Link to="/top10" className={getNavLinkClass("/top10")}>Top 10</Link>
          <Link to="/search" className={getNavLinkClass("/search")}>Search</Link>
          <input type="text" name="search" id="search" className="search-input" placeholder="search..." />
        </div>
        {currentSpotifyLink && (
          <div className="spotify-container">
            <div className="spotify-text">Song of the Week</div>
            <iframe
              className="spotify-iframe"
              src={`https://open.spotify.com/embed/track/${currentSpotifyLink.split('/').pop().split('?')[0]}?utm_source=generator`}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
