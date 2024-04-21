import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import postsData from '../data/posts.json'; // Import the JSON data
import { marked } from 'marked';

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
        .catch(error => console.log(error));
    }
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={`../assets/${post.id}.jpg`} alt={post.title} /> // Assuming images are named by post ID
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

export default BlogPost;
