import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BlogPostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Simulate fetching post data from an API
    fetch(`https://your-api.com/posts/${postId}`)
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.log(error));
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.imageUrl} alt={post.title} />
      <p>{post.content}</p>
    </div>
  );
}

export default BlogPostPage;
