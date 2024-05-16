import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SpotifyContext = createContext();

export const SpotifyProvider = ({ children }) => {
  const [spotifyLink, setSpotifyLink] = useState('https://open.spotify.com/track/5H8BPBnmDDeocTGbwCmYWm?si=01d3cef9ecde46c1');
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.startsWith('/posts/')) {
      setSpotifyLink('https://open.spotify.com/track/5H8BPBnmDDeocTGbwCmYWm?si=01d3cef9ecde46c1');
    }
  }, [location]);

  return (
    <SpotifyContext.Provider value={{ spotifyLink, setSpotifyLink }}>
      {children}
    </SpotifyContext.Provider>
  );
};
