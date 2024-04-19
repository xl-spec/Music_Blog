import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import postContent from '../data/posts/tempblog.md';
import './BlogPost.css';

const BlogPost = ({ title, imageUrl, linkUrl }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchMarkdown = async () => {
      const response = await fetch(postContent);
      const text = await response.text();
      setContent(text);
    };

    fetchMarkdown();
  }, []);

  const createMarkup = () => {
    return { __html: marked(content) };
  };

  return (
    <a href={linkUrl} className="blog-post-link">
      <div className="blog-post">
        <img src={imageUrl} alt={title} className="blog-post-image" />
        <h2 className="blog-post-title">{title}</h2>
        <div dangerouslySetInnerHTML={createMarkup()} />
      </div>
    </a>
  );
};

export default BlogPost;
