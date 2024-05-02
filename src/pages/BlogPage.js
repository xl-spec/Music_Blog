import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import useFetchData from '../hooks/useFetchData';
import './BlogPage.css';

function BlogPost() {
  const { postId } = useParams();
  const { data, loading, error } = useFetchData(); // Use the hook to fetch all posts
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (data) {
      const postDetails = data.posts.find(p => p.id.toString() === postId);
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
            setPost({ error: "Failed to load post content." });
          });
      } else {
        setPost({ error: "Post not found." });
      }
    }
  }, [data, postId]); // Dependency on data ensures this runs when data is fetched

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Loading post details...</div>;

  if (post.error) {
    return <div>Error: {post.error}</div>; // Display errors if any
  }

  return (
    <div className='blog-post'>
      <h1>{post.name} </h1>
      <h2>{post.artist}</h2>
      <img src={post.imageUrl} alt={post.name} className='blog-post-img' />
      <div dangerouslySetInnerHTML={{ __html: post.content }} className='blog-post-content'/>  
    </div>
  );
}

export default BlogPost;
