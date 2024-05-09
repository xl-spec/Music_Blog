import React from 'react';
import HomeGalleryView from '../components/HomeGalleryView';
import useFetchData from '../hooks/useFetchData';
import './HomePage.css';

function HomePage() {
  // const posts = postsData.posts;
  const { data, loading, error } = useFetchData();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  const posts = data.posts;
  return (
    <div className="home-page">
      <section className="home-gallery-content">
        {posts.map(post => (
          <HomeGalleryView key={post.id} name={post.name} artist={post.artist} imageUrl={post.imageUrl} linkUrl={`/posts/${post.id}`} />
        ))}
      </section>
    </div>
  );
}

export default HomePage;
