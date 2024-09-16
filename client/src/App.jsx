import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import IntroContent from './components/introContent/IntroContent.jsx';
import PlayGame from './components/playGame/PlayGame.jsx';
import Story from './components/story/Story.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Login from './components/login/Login.jsx';
import Signup from './components/signup/Signup.jsx';
import GameNavbar from './gameComponents/GameNavbar/GameNavbar.jsx';

function App() {
  
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<IntroContent />} />
          <Route path="/play" element={<PlayGame />} />
          <Route path="/story" element={<Story />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
