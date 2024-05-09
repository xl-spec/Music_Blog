import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import useFetchData from '../hooks/useFetchData';
import './BlogPage.css';

function BlogPost() {
  const { postId } = useParams();
  const { data, loading, error } = useFetchData();
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
              content: marked(markdown), // markdown -> HTML 
              palette: postDetails.palette.map((rgb, index) => {
                if (index === 0) { // hack to get the background color to be lighter
                  return `rgb(${rgb.map(color => Math.min(color + 40, 255)).join(',')})`;
                }
                return `rgb(${rgb.join(',')})`;
              })
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
  }, [data, postId]);
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Loading post details...</div>;

  if (post.error) {
    return <div>Error: {post.error}</div>; 
  }
  const artistNames = Array.isArray(post.artist) ? post.artist.join(' - ') : post.artist;

  return (
    <div className='blog-post' style={{ backgroundColor: post?.palette?.[0] }}>
      <h1 style={{ color: post?.palette?.[1] }}>{post.name}</h1>
      <h2 style={{ color: post?.palette?.[2] }}>{artistNames}</h2>
      {/* <img src={post.imageUrl} alt={post.name} className='blog-post-img' style={{ borderColor: post?.palette?.[3] }}/> */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} className='blog-post-content' style={{ color: post?.palette?.[1] }}/>
    </div>
  );
  
}

export default BlogPost;
