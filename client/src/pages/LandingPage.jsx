// src/pages/LandingPage.jsx

import React from 'react';
import Navbar from '../components/layout/Navbar.jsx';
import Hero from '../components/home/Hero.jsx';
import HowItWorks from '../components/home/HowItWorks.jsx'; // Import the new component

const LandingPage = () => {
  return (
    <div>
      <Navbar/>
      <Hero />
      
      {/* --- ADD THIS NEW SECTION WITH AN ID --- */}
      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* You can add a Footer component here later */}
    </div>
  );
};

export default LandingPage;
