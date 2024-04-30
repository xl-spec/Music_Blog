import React from 'react';
import HomeGalleryView from '../components/HomeGalleryView';
import postsData from '../data/posts.json'; // Assuming the JSON file is stored here
import './HomePage.css';

function HomePage() {
  const posts = postsData.posts;

  return (
    <div className="home-page">
      {/* <h2>Recent Posts *fix later</h2> */}
      <section className="home-gallery-content">
        {posts.map(post => (
          <HomeGalleryView key={post.id} name={post.name} artist={post.artist} imageUrl={post.imageUrl} linkUrl={`/posts/${post.id}`} />
        ))}
      </section>
    </div>
  );
}

export default HomePage;
