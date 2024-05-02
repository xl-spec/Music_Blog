import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import BlogPostPage from './pages/BlogPage';
import AlbumPage from './pages/AlbumPage';
import SinglePage from './pages/SinglePage';
import MashupOrEditsPage from './pages/MashupOrEditsPage';
import Top10Page from './pages/Top10Page';
// import './App.css';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="posts/:postId" element={<BlogPostPage />} />
        <Route path="albums" element={<AlbumPage />} />
        <Route path="singles" element={<SinglePage />} />
        <Route path="mashupsoredits" element={<MashupOrEditsPage />} />
        <Route path="top10" element={<Top10Page />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;