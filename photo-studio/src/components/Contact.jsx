import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone, MessageCircle } from 'lucide-react';

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo('.form-element',
          { y: 20, opacity: 0 },
          { 
            y: 0, opacity: 1, 
            duration: 0.8, 
            stagger: 0.1, 
            ease: "power2.out",
            scrollTrigger: { 
              trigger: '.contact-form-container', 
              start: "top 80%" 
            } 
          }
        );
        
        gsap.fromTo('.sidebar-info',
          { x: 30, opacity: 0 },
          { 
            x: 0, opacity: 1, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: { 
              trigger: '.sidebar-container', 
              start: "top 80%" 
            } 
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo('.form-element, .sidebar-info', 
          { opacity: 0 }, 
          { opacity: 1, duration: 1.2, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-16 md:py-32 px-4 md:px-6 w-full bg-[#FFFDF8] border-t border-[#12100E]/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Form Area */}
        <div className="w-full lg:w-7/12 contact-form-container">
          <div className="form-element mb-8 md:mb-12">
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[#C5A059] mb-4">LET'S CREATE</h2>
            <h3 className="text-3xl md:text-6xl font-serif font-bold text-[#12100E] leading-tight">
              Something Worth<br/>Remembering.
            </h3>
            <p className="text-[#201D19]/80 text-lg font-light mt-6 max-w-md">
              Tell us about your story, your vision, and the moments you want us to capture.
            </p>
          </div>
          
          <form className="flex flex-col gap-8">
            <div className="form-element border-b border-[#12100E]/20 pb-4">
              <input type="text" placeholder="Name" className="w-full bg-transparent text-[#12100E] placeholder-[#12100E]/40 focus:outline-none text-sm tracking-wide" />
            </div>
            <div className="form-element border-b border-[#12100E]/20 pb-4">
              <input type="email" placeholder="Email" className="w-full bg-transparent text-[#12100E] placeholder-[#12100E]/40 focus:outline-none text-sm tracking-wide" />
            </div>
            <div className="form-element border-b border-[#12100E]/20 pb-4">
              <input type="text" placeholder="Subject" className="w-full bg-transparent text-[#12100E] placeholder-[#12100E]/40 focus:outline-none text-sm tracking-wide" />
            </div>
            <div className="form-element border-b border-[#12100E]/20 pb-4">
              <textarea placeholder="Message" rows="5" className="w-full bg-transparent text-[#12100E] placeholder-[#12100E]/40 focus:outline-none text-sm tracking-wide resize-none"></textarea>
            </div>
            
            <div className="form-element mt-4">
              <button type="submit" className="bg-[#12100E] hover:bg-[#C5A059] text-[#FFFDF8] hover:text-[#12100E] px-10 py-4 font-bold tracking-[0.2em] uppercase text-xs transition-colors duration-300 flex items-center justify-between w-max gap-8 group rounded-sm">
                SEND INQUIRY <span className="transform group-hover:translate-x-2 transition-transform">&rarr;</span>
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="w-full sidebar-container lg:border-l border-[#12100E]/10 lg:pl-20 pt-4">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-8 lg:gap-10">
            <div className="sidebar-info">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                <MapPin className="text-[#C5A059] w-3 h-3 md:w-4 md:h-4" />
                <h4 className="text-[9px] md:text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.2em] pt-[2px]">STUDIO</h4>
              </div>
              <p className="text-[#12100E] font-serif text-sm md:text-2xl mb-1 md:mb-2">Creative District</p>
              <p className="text-[#201D19]/60 font-light italic text-xs md:text-base">Available Worldwide</p>
            </div>
            
            <div className="sidebar-info">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                <Mail className="text-[#C5A059] w-3 h-3 md:w-4 md:h-4" />
                <h4 className="text-[9px] md:text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.2em] pt-[2px]">EMAIL</h4>
              </div>
              <a href="mailto:contact@luminastudio.com" className="text-[#12100E] font-serif text-sm md:text-2xl hover:text-[#C5A059] transition-colors break-all">contact@luminastudio.com</a>
            </div>
            
            <div className="sidebar-info">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                <Phone className="text-[#C5A059] w-3 h-3 md:w-4 md:h-4" />
                <h4 className="text-[9px] md:text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.2em] pt-[2px]">PHONE</h4>
              </div>
              <p className="text-[#12100E] font-serif text-sm md:text-2xl">+91 98765 43210</p>
            </div>
            
            <div className="sidebar-info">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                <MessageCircle className="text-[#C5A059] w-3 h-3 md:w-4 md:h-4" />
                <h4 className="text-[9px] md:text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.2em] pt-[2px]">WHATSAPP</h4>
              </div>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-[#12100E] font-serif text-sm md:text-2xl hover:text-[#C5A059] transition-colors">+91 98765 43210</a>
            </div>
            
            <div className="sidebar-info col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                <InstagramIcon className="text-[#C5A059] w-3 h-3 md:w-4 md:h-4" />
                <h4 className="text-[9px] md:text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.2em] pt-[2px]">SOCIAL</h4>
              </div>
              <a href="#" className="text-[#12100E] font-serif text-sm md:text-2xl hover:text-[#C5A059] transition-colors">@luminastudio_demo</a>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Contact;
