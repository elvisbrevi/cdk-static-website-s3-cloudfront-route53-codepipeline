import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MiniProjectsPage from './pages/MiniProjectsPage';
import BlogPage from './pages/BlogPage';
import './App.css';
import Post from './pages/Post';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/about" index element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mini-projects" element={<MiniProjectsPage />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
