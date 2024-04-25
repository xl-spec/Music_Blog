import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for SPA-like navigation
import './HomeGalleryView.css';

const BlogPost = ({ name, artist, imageUrl, linkUrl }) => {
  return (
    <Link to={linkUrl} className="blog-post-link">
      <div className="blog-post">
        <img src={imageUrl} alt={name} className="blog-post-image" />
        <h2 className="blog-post-title">{name + " by "+ artist}</h2>
      </div>
    </Link>
  );
};

export default BlogPost;
