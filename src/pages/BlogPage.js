import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import postsData from '../data/posts.json'; // Import the JSON data
import { marked } from 'marked';
import styles from './BlogPage.css';

function BlogPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const postDetails = postsData.posts.find(p => p.id.toString() === postId); // Find the post by ID
    if (postDetails) {
      fetch(postDetails.markdownPath)
        .then(response => response.text())
        .then(markdown => {
          setPost({
            ...postDetails,
            content: marked(markdown) // Convert markdown to HTML here
          });
        })
        .catch(error => {
          console.log(error);
          setPost({ error: "Failed to load post content." }); // Handle errors during fetch
        });
    } else {
      setPost({ error: "Post not found." }); // Handle case where post is not found
    }
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  if (post.error) {
    return <div>Error: {post.error}</div>; // Display errors if any
  }

  return (
    <div className='blog-post'>
      <h1>{post.name} </h1>
      <h2>{post.artist}</h2>
      <img src={post.imageUrl} alt={post.name} className='blog-post-img' />
      <div dangerouslySetInnerHTML={{ __html: post.content }} className='blogContent'/>  
    </div>
  );
}

export default BlogPost;
