import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PricingPackages from '../components/PricingPackages';
import Footer from '../components/Footer';
import BookingSection from '../components/BookingSection';
import SEO from '../components/SEO';

const Home = () => {
  const [bookingCategory, setBookingCategory] = useState("wedding");

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#12100E] selection:bg-[#C5A059] selection:text-[#12100E]">
      <div className="">
        <Navbar />
        <main>
          <SEO title="Luxury Photography Studio" description="Lumina Studio is a premier creative photography studio offering luxury wedding, candid, portrait, pre-wedding and event photography." path="/" />
          <Hero />
          <PricingPackages onBook={(category) => setBookingCategory(category)} />
          <BookingSection selectedCategory={bookingCategory} onCategoryChange={setBookingCategory} />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
