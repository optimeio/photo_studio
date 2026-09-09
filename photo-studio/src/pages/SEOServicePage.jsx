import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import BookingSection from '../components/BookingSection';
import Footer from '../components/Footer';

const SEOServicePage = ({ 
  serviceName, 
  location = "Salem, Tamil Nadu", 
  heroImage, 
  description, 
  features = [], 
  path 
}) => {

  const title = `${serviceName} in ${location}`;
  
  // JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Lumina Studio",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Metropolis",
        "addressRegion": "State",
        "addressCountry": "IN"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Metro Region"
    },
    "description": description
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#12100E] font-sans selection:bg-[#C5A059] selection:text-[#FFFDF8]">
      <SEO 
        title={title}
        description={description}
        path={path}
        schema={schema}
        ogImage={heroImage}
      />
      <Navbar />
      
      <main className="pt-24 pb-12 md:pt-32 md:pb-24 px-4 md:px-8 max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-[#12100E]">
            {title}
          </h1>
          <p className="text-lg md:text-xl font-light max-w-3xl mx-auto opacity-80 leading-relaxed">
            {description}
          </p>
        </header>

        {heroImage && (
          <div className="w-full h-[40vh] md:h-[60vh] rounded-sm overflow-hidden mb-16 shadow-2xl">
            <img 
              src={heroImage} 
              alt={`${serviceName} by Lumina Studio in ${location}`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6">Why choose Lumina Studio for {serviceName}?</h2>
            <ul className="space-y-4">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-[#C5A059] mr-3 font-bold">✓</span>
                  <p className="font-light">{feature}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#12100E] text-[#FFFDF8] p-8 md:p-12 rounded-sm text-center">
            <h3 className="text-2xl font-serif font-bold mb-4">Ready to Book?</h3>
            <p className="mb-8 font-light opacity-80">
              We are currently accepting bookings for {serviceName.toLowerCase()} in {location}.
            </p>
            <a href="#booking" className="inline-block border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#12100E] px-8 py-3 uppercase tracking-widest text-xs font-bold transition-colors">
              Check Availability
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-[#12100E]/10 pb-6">
              <h3 className="font-bold text-lg mb-2">Does Lumina Studio provide {serviceName.toLowerCase()} in your location?</h3>
              <p className="font-light opacity-80">Yes, we specialize in professional {serviceName.toLowerCase()} for clients worldwide.</p>
            </div>
            <div className="border-b border-[#12100E]/10 pb-6">
              <h3 className="font-bold text-lg mb-2">How can I book a session?</h3>
              <p className="font-light opacity-80">You can easily book a session by filling out the booking form below, or by contacting us directly via phone or email.</p>
            </div>
          </div>
        </div>
      </main>

      <BookingSection />
      <Footer />
    </div>
  );
};

export default SEOServicePage;
