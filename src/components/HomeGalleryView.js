import React from 'react';
import { Link } from 'react-router-dom';
import './HomeGalleryView.css';

const HomeGalleryView = ({ name, artist, imageUrl, linkUrl }) => {
  return (
    <Link to={linkUrl} className="home-gallery-link">
      <div className="home-gallery-post">
        <img src={imageUrl} alt={name} className="home-gallery-image" />
        <h2 className="home-gallery-title">{name + " - " + artist}</h2>
      </div>
    </Link>
  );
};

export default HomeGalleryView;
