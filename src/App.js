import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Photography from './components/Photography';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="App">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero id="home" setActiveSection={setActiveSection} />
        <About id="about" />
        <Experience id="experience" />
        <Projects id="projects" />
        <Photography id="photography" />
        <Contact id="contact" />
        <Footer />
      </motion.main>
    </div>
  );
}

export default App;
