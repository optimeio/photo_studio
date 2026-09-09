import React, { useState } from 'react';
import BookingCalendar from './BookingCalendar';
import './BookingCalendar.css';

const BookingSection = ({ selectedCategory = 'wedding', onCategoryChange }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Split Full Name into firstName and lastName for the backend schema
    if (data.firstName) {
      const nameParts = data.firstName.trim().split(' ');
      data.firstName = nameParts[0];
      data.lastName = nameParts.slice(1).join(' ') || ' '; // fallback if no last name
    }

    // Add selected category and date explicitly if not part of form data
    data.sessionType = selectedCategory;
    if (selectedDate) {
      data.date = selectedDate.toISOString();
    } else {
      setError('Please select a date from the calendar.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://photo-studio-1nvn.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      setSuccess(true);
      e.target.reset(); // Clear the form
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-12 md:py-16 px-4 md:px-6 w-full bg-[#12100E] border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 bg-[#FFFDF8] rounded-sm overflow-hidden shadow-2xl border-2 border-[#12100E]">
        
        {/* Left Side - Image */}
        <div className="relative min-h-[250px] md:min-h-[400px]">
          <img 
            src="/images/wedding/wedding-32.webp" 
            alt="Booking Inspiration" 
            className="absolute inset-0 w-full h-full object-cover object-[center_25%] md:object-center"
          />
          <div className="absolute inset-0 bg-[#12100E]/20"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-[#FFFDF8]">
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2 drop-shadow-md">Let's Create Magic.</h3>
            <p className="text-[10px] md:text-xs font-light tracking-widest uppercase opacity-90 drop-shadow-md">Lumina Studio</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full p-4 sm:p-6 md:p-8 lg:p-10">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#12100E] mb-2">Book a Session</h2>
          <p className="text-[#12100E]/60 text-sm mb-6 font-light max-w-md">Tell us a bit about your vision, and we'll get back to you to finalize the details.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C5A059]">Full Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  required
                  className="w-full bg-transparent border-b border-[#12100E]/20 py-2 text-[#12100E] focus:outline-none focus:border-[#C5A059] transition-colors placeholder:text-[#12100E]/30"
                  placeholder="Karthik Subramanian"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C5A059]">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full bg-transparent border-b border-[#12100E]/20 py-2 text-[#12100E] focus:outline-none focus:border-[#C5A059] transition-colors placeholder:text-[#12100E]/30"
                  placeholder="karthik@example.in"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C5A059]">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  className="w-full bg-transparent border-b border-[#12100E]/20 py-2 text-[#12100E] focus:outline-none focus:border-[#C5A059] transition-colors placeholder:text-[#12100E]/30"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C5A059]">Session Type</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
                  className="w-full bg-transparent border-b border-[#12100E]/20 py-2 text-[#12100E] focus:outline-none focus:border-[#C5A059] transition-colors cursor-pointer"
                >
                  <option value="wedding">Wedding Photography</option>
                  <option value="pre-wedding">Pre-Wedding Shoot</option>
                  <option value="portrait">Portrait Session</option>
                  <option value="event">Event Coverage</option>
                  <option value="candid">Candid Photography</option>
                  <option value="fashion">Fashion / Editorial</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C5A059]">Package (Optional)</label>
                <select 
                  name="package"
                  defaultValue=""
                  className="w-full bg-transparent border-b border-[#12100E]/20 py-2 text-[#12100E] focus:outline-none focus:border-[#C5A059] transition-colors cursor-pointer"
                >
                  <option value="" disabled>Select a package</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="elite">Elite</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C5A059]">Preferred Date</label>
                <div className="w-full max-w-[360px]">
                  <BookingCalendar 
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C5A059]">Your Vision</label>
                <textarea 
                  name="notes"
                  className="w-full h-[260px] bg-transparent border border-[#12100E]/20 p-4 text-[#12100E] focus:outline-none focus:border-[#C5A059] transition-colors placeholder:text-[#12100E]/30 resize-none rounded-sm"
                  placeholder="Tell us what you're dreaming of... How do you envision your shoot? Any specific locations like Mahabalipuram or traditional styles?"
                ></textarea>
              </div>
            </div>

            <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#12100E] font-bold uppercase tracking-[0.2em] py-3 rounded-sm transition-colors mt-2 text-xs ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Processing...' : 'Request Booking'}
              </button>
              
              {success && (
                <div className="mt-4 p-6 bg-[#12100E]/5 border border-[#C5A059]/20 rounded-sm text-center">
                  <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-serif text-lg font-bold text-[#12100E] mb-1">Request Received!</p>
                  <p className="text-[#12100E]/60 text-xs leading-relaxed">Our team will contact you soon to finalize the details of your session.</p>
                </div>
              )}
              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-600 text-sm rounded-sm text-center">
                  {error}
                </div>
              )}
            </form>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
