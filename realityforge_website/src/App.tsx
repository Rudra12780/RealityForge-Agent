import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { ClickEffect } from './components/ClickEffect';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#f8f9fc] dark:bg-[#1D1E2C] text-[#0f172a] dark:text-[#f3f4f8] transition-colors duration-200">
        <ClickEffect />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
};

export default App;
