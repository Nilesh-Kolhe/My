import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Contact from './components/Contact';
import Education from './components/Education';
import About from './components/About';
import Work from './components/Work';
import { Navigate } from 'react-router-dom';
import Skills from './components/Skills';
import ReachMe from './components/ReachMe';
import Experience from './components/Experience';

const App = () => (
  <div className="App">

    {/* <NavBar /> */}
    <Home />
    <About />
    <Experience />
    <Skills />
    <ReachMe />
    {/* <Education /> */}
    {/* <Contact /> */}

    {/*
      <Router>
        <NavBar />
        <Home />
        <Education />
        <Work />
        <Contact />
        <Routes>
          {/* <Route path="/" element={<Navigate to="home" />} /> */} {/*
          <Route path="/My" element={<Navigate to="/home" />} />
          {/* <Route path="/My" element={<Navigate to="/home" />} /> Add this and / before route for Local dev and Import Browser Router */} {/*
          <Route path="/home" element={<Home />} />
          <Route path='/education' element={<Education />} />
          <Route path='/work' element={<Work />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Router > */}
  </div >
);

export default App;
