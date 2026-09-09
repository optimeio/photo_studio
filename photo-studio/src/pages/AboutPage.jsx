import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import About from '../components/About';
import SEO from '../components/SEO';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF8] selection:bg-[#C5A059] selection:text-[#12100E] flex flex-col">
      <SEO title="About Us - Lumina Studio" description="Learn more about Lumina Studio and our passion for storytelling." path="/about" />
      <Navbar />
      <div className="flex-grow pt-24">
        <About />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
