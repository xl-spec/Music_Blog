import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for SPA-like navigation
import './HomeGalleryView.css';

const BlogPost = ({ title, imageUrl, linkUrl }) => {
  return (
    <Link to={linkUrl} className="blog-post-link">
      <div className="blog-post">
        <img src={imageUrl} alt={title} className="blog-post-image" />
        <h2 className="blog-post-title">{title}</h2>
      </div>
    </Link>
  );
};

export default BlogPost;
