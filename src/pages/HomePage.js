import React from 'react';
import HomeGalleryView from '../layout/HomeGalleryView';
import useFetchData from '../hooks/useFetchData';
import './HomePage.css';

function HomePage() {
  // const posts = postsData.posts;
  const { data, loading, error } = useFetchData();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

  // this is to get it post date order
  const posts = data.posts.slice().reverse();

  return (
    <div className="home-page">
      <section className="home-gallery-content">
        {posts.map(post => (
          <HomeGalleryView 
          key={post.id}
          title={post.title}
          name={post.name}
          artist={post.artist}
          imageUrl={post.imageUrl}
          linkUrl={`/posts/${post.id}`}
          palette={post.palette}
        />
        ))}
      </section>
    </div>
  );
}

export default HomePage;
