import React from 'react';
import { Link } from 'react-router-dom';
import './HomeGalleryView.css';

const HomeGalleryView = ({ title, name, artist, imageUrl, linkUrl, palette }) => {

  let paletteMapped = palette.map(rgb => `rgb(${rgb.join(',')})`);
  const artistNames = Array.isArray(artist) ? artist.join(' - ') : artist;

  return (
    <Link to={linkUrl} className="home-gallery-link">
      <div className="home-gallery-post"  style={{ backgroundColor: paletteMapped[1] }} >
        <img src={imageUrl} alt={name} className="home-gallery-image" style={{ borderColor: paletteMapped[3] }}/>
        <div className="home-gallery-details" style={{ color: paletteMapped[0] }}>
          <h2 className="home-gallery-title">{title}</h2>
          <>________</>
          <h3 className="home-gallery-name">{name}</h3>
          <h4 className="home-gallery-artist">{artistNames}</h4>
        </div>
      </div>
    </Link>
  );
};

export default HomeGalleryView;
