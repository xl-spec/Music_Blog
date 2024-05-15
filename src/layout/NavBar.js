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

  return (
    <div>
      <nav className="navbar">
        <div className="rightNav">
          <Link to="/albums" className="navbar-button">Album</Link>
          <Link to="/singles" className="navbar-button">Single</Link>
          <Link to="/mashupsoredits" className="navbar-button">Mashup/Edits</Link>
          <Link to="/top10" className="navbar-button">Top 10</Link>
          <Link to="/search" className="navbar-button">Search</Link>
          <input type="text" name="search" id="search" className="search-input" placeholder="search..." />
          {currentSpotifyLink && (
            <iframe
              className="spotify-iframe"
              src={`https://open.spotify.com/embed/track/${currentSpotifyLink.split('/').pop().split('?')[0]}?utm_source=generator`}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
