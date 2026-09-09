import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import SEO from '../components/SEO';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF8] selection:bg-[#C5A059] selection:text-[#12100E] flex flex-col">
      <SEO title="Contact Us | Book a Photography Session" description="Get in touch with Lumina Studio to book your next wedding, portrait, or event photography session." path="/contact" />
      <Navbar />
      <div className="flex-grow">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
