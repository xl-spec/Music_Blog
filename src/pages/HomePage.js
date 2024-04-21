import React from 'react';
import HomeGalleryView from '../components/HomeGalleryView';
import postsData from '../data/posts.json'; // Assuming the JSON file is stored here
import './HomePage.css';

function HomePage() {
  const posts = postsData.posts; // Access the posts array from the JSON data

  return (
    <div className="HomePage">
      <h2>Recent Posts</h2>
      <section className="content">
        {posts.map(post => (
          <HomeGalleryView key={post.id} title={post.name} imageUrl={post.imageUrl} linkUrl={`/posts/${post.id}`} />
        ))}
      </section>
    </div>
  );
}

export default HomePage;
