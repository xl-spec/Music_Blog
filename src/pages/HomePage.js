import React from 'react';
import NavBar from '../components/NavBar';
import BlogPost from '../components/BlogPost';
import './HomePage.css';

function HomePage() {
  const posts = [
    { title: "Example Blog Post 1", imageUrl: "https://imgur.com/d1X3eH7.jpg", id: 1 },
    { title: "Example Blog Post 2", imageUrl: "https://imgur.com/VztIqel.jpg", id: 2 },
    { title: "Example Blog Post 3", imageUrl: "https://imgur.com/d1X3eH7.jpg", id: 3 },
    // Add more posts as needed
  ];

  return (
    <div className="HomePage">
      {/* <NavBar /> */}
      <h2>Recent Posts</h2>
      <section className="content">
        {posts.map(post => (
          <BlogPost key={post.id} title={post.title} imageUrl={post.imageUrl} linkUrl={`/posts/${post.id}`} />
        ))}
      </section>
    </div>
  );
}

export default HomePage;
