import logo from './logo.svg';
import React from 'react';
import NavBar from './components/NavBar.js';
import BlogPost from './posts/BlogPost';
import './App.css';

function App() {
  return (
    <div className="App">
      <main className="homePage">
        <button className="homePageButton">Temp</button>
      </main>
      <NavBar />
      <section className="content">
        <h2>Recent Posts</h2>
        <BlogPost 
          title="Example Blog Post" 
          imageUrl="https://via.placeholder.com/600x300" 
          summary="This is a summary of the example blog post. Here you can put a brief snippet or introduction to the article."
        />
        {/* Here you would map over your blog posts and render them */}
      </section>
    </div>
  );
}

export default App;
