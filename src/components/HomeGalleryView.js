import React from 'react';
import { Link } from 'react-router-dom';
import './HomeGalleryView.css';

const HomeGalleryView = ({ title, name, artist, imageUrl, linkUrl, palette }) => {
  return (
    <Link to={linkUrl} className="home-gallery-link">
      <div className="home-gallery-post">
        <img src={imageUrl} alt={name} className="home-gallery-image" />
        <div className="home-gallery-details">
          <h2 className="home-gallery-title">{title}</h2>
          <h3 className="home-gallery-name">{name}</h3>
          <h4 className="home-gallery-artist">{artist}</h4>
        </div>
      </div>
    </Link>
  );
};

export default HomeGalleryView;
