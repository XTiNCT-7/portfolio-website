// src/App.tsx
import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import './styles/Global.css'

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Projects />
      <Contact />
    </div>
  );
};

export default App;
