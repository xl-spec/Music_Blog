import React from 'react';
import './BlogPost.css'; // Make sure to create a corresponding CSS file

const BlogPost = ({ title, imageUrl, summary }) => {
  return (
    <div className="blog-post">
      <img src={imageUrl} alt={title} className="blog-post-image" />
      <h2 className="blog-post-title">{title}</h2>
      <p className="blog-post-summary">{summary}</p>
    </div>
  );
};

export default BlogPost;
