import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import { SpotifyContext } from '../context/SpotifyContext';
import './BlogPage.css';

function BlogPost({ data, loading, error }) {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const { setSpotifyLink } = useContext(SpotifyContext);

  useEffect(() => {
    if (data) {
      const postDetails = data.posts.find(p => p.id.toString() === postId);
      if (postDetails) {
        fetch(postDetails.markdownPath)
          .then(response => response.text())
          .then(markdown => {
            const postData = {
              ...postDetails,
              content: marked(markdown),
              palette: postDetails.palette.map((rgb, index) => {
                if (index === 0) {
                  return `rgb(${rgb.map(color => Math.min(color + 40, 255)).join(',')})`;
                }
                return `rgb(${rgb.join(',')})`;
              })
            };
            setPost(postData);
            setSpotifyLink(postDetails.spotifyUrl); // Set Spotify link
          })
          .catch(error => {
            console.log(error);
            setPost({ error: "Failed to load post content." });
          });
      } else {
        setPost({ error: "Post not found." });
      }
    }
  }, [data, postId, setSpotifyLink]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Loading post details...</div>;

  if (post.error) {
    return <div>Error: {post.error}</div>;
  }

  return (
    <div className='blog-post' style={{ backgroundColor: post?.palette?.[0] }}>
      <h1 style={{ color: post?.palette?.[1] }}>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} className='blog-post-content' style={{ color: post?.palette?.[1] }} />
    </div>
  );
}

export default BlogPost;
