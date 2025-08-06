// src/components/home/Hero.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50">
      {/* --- PADDING HAS BEEN REDUCED HERE --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <span className="text-indigo-600 font-semibold uppercase tracking-wider">
                Total Peace of Mind
              </span>
              <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                Never Lose a Warranty or Receipt Again
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
                Securely store, track, and manage all your important product documents in one simple, digital hub. Get reminders before your warranties expire.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                <Link
                  to="/signup"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg md:px-8 shadow-lg transform hover:scale-105 transition-transform duration-300"
                >
                  Get Started
                </Link>
                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-indigo-200 text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:text-lg md:px-8"
                >
                  How it Works
                </a>
              </div>
            </div>

            {/* Illustration */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="w-full max-w-md">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M44.7,-73.4C58.8,-65.3,71.8,-53.4,79.5,-39.2C87.2,-25,89.6,-8.4,86.2,6.9C82.8,22.2,73.6,36.2,62.8,47.8C52,59.4,39.6,68.6,26.1,74.7C12.6,80.8,-2.1,83.8,-16.9,80.9C-31.7,78,-46.6,69.2,-58.5,57.7C-70.4,46.2,-79.3,32,-82.9,16.2C-86.5,0.4,-84.8,-17,-76.9,-30.6C-69,-44.2,-54.9,-54,-41.3,-62.1C-27.7,-70.2,-13.9,-76.6,1.1,-78.5C16.1,-80.4,32.1,-81.5,44.7,-73.4Z" transform="translate(100 100)" fill="#eef2ff"></path>
                    <foreignObject x="30" y="40" width="140" height="140">
                      <div className="flex flex-col items-center justify-center h-full text-indigo-600" xmlns="http://www.w3.org/1999/xhtml">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 -mt-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </foreignObject>
                  </g>
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
