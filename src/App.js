import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './layout/NavBar';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomePage from './pages/HomePage';
import BlogPostPage from './pages/BlogPage';
import AlbumPage from './pages/AlbumPage';
import SinglePage from './pages/SinglePage';
import MashupOrEditsPage from './pages/MashupOrEditsPage';
import Top10Page from './pages/Top10Page';
import useFetchData from './hooks/useFetchData';
import { SpotifyProvider } from './context/SpotifyContext';
import './App.css';

function App() {
  const { data, loading, error } = useFetchData();

  return (
    <Router>
      <SpotifyProvider>
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="posts/:postId" element={<BlogPostPage data={data} loading={loading} error={error} />} />
          <Route path="albums" element={<AlbumPage />} />
          <Route path="singles" element={<SinglePage />} />
          <Route path="mashupsoredits" element={<MashupOrEditsPage />} />
          <Route path="top10" element={<Top10Page />} />
        </Routes>
        <Footer />
      </SpotifyProvider>
    </Router>
  );
}

export default App;
