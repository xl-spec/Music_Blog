import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import BlogPostPage from './pages/BlogPage';
// import Footer from './pages/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:postId" element={<BlogPostPage />} />
        {/* Additional routes */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
