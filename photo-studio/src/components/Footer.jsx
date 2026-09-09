import React, { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e, href) => {
    if (href.includes('#')) {
      e.preventDefault();
      
      const [path, hash] = href.split('#');
      const targetHash = '#' + hash;
      const targetPath = path || '/';

      if (location.pathname === targetPath) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
      } else {
        navigate(href);
      }
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo('.footer-col',
          { y: 30, opacity: 0 },
          { 
            y: 0, opacity: 1, 
            duration: 0.8, 
            stagger: 0.1, 
            ease: "power2.out",
            scrollTrigger: { 
              trigger: footerRef.current, 
              start: "top 85%" 
            } 
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set('.footer-col', { y: 0, opacity: 1 });
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#12100E] pt-32 pb-12 px-6 lg:px-12 w-full border-t border-[#FFFDF8]/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-12 mb-20">
          
          {/* Column 1: Brand */}
          <div className="footer-col opacity-0">
            <Link to="/" className="inline-flex items-center gap-4 mb-8 group">
              <img 
                src="/logo.png" 
                alt="Lumina Studio Logo" 
                className="w-auto h-12 md:h-16 object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <span className="font-serif uppercase tracking-[0.15em] font-bold text-[#FFFDF8] text-2xl md:text-3xl">
                Lumina
                <span className="block text-[12px] tracking-[0.3em] font-sans font-normal text-[#C5A059] mt-1">Studio</span>
              </span>
            </Link>
            <p className="text-[#FFFDF8]/60 text-base font-light leading-relaxed mb-8 max-w-sm">
              Capturing cinematic moments and preserving your most precious memories with elegance and artistic vision.
            </p>
            <div className="flex gap-5">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-[#FFFDF8]/5 flex items-center justify-center text-[#FFFDF8]/70 hover:bg-[#C5A059] hover:text-[#12100E] transition-colors text-xs font-bold tracking-wider">IG</a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-[#FFFDF8]/5 flex items-center justify-center text-[#FFFDF8]/70 hover:bg-[#C5A059] hover:text-[#12100E] transition-colors text-xs font-bold tracking-wider">FB</a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-[#FFFDF8]/5 flex items-center justify-center text-[#FFFDF8]/70 hover:bg-[#C5A059] hover:text-[#12100E] transition-colors text-xs font-bold tracking-wider">X</a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col opacity-0">
            <h4 className="text-sm font-bold tracking-[0.2em] text-[#C5A059] uppercase mb-8">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="/" className="text-[#FFFDF8]/70 hover:text-[#C5A059] text-base transition-colors inline-block">Home</Link></li>
              <li><a href="/#about" onClick={(e) => handleNavClick(e, '/#about')} className="text-[#FFFDF8]/70 hover:text-[#C5A059] text-base transition-colors inline-block">About Us</a></li>
              <li><Link to="/services" className="text-[#FFFDF8]/70 hover:text-[#C5A059] text-base transition-colors inline-block">Services</Link></li>
              <li><Link to="/portfolio" className="text-[#FFFDF8]/70 hover:text-[#C5A059] text-base transition-colors inline-block">Our Works</Link></li>
              <li><Link to="/contact" className="text-[#FFFDF8]/70 hover:text-[#C5A059] text-base transition-colors inline-block">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="footer-col opacity-0">
            <h4 className="text-sm font-bold tracking-[0.2em] text-[#C5A059] uppercase mb-8">Contact Us</h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <span className="text-[#FFFDF8]/70 text-base leading-relaxed">42 Studio Boulevard,<br/>Suite 100, Creative District</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span className="text-[#FFFDF8]/70 text-base">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-[#C5A059] shrink-0" />
                <a href="mailto:contact@luminastudio.com" className="text-[#FFFDF8]/70 hover:text-[#C5A059] text-base transition-colors break-all">contact@luminastudio.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-col opacity-0 border-t border-[#FFFDF8]/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#FFFDF8]/40 text-xs text-center md:text-left tracking-wide">
            &copy; {new Date().getFullYear()} Lumina Studio. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[#FFFDF8]/40 hover:text-[#FFFDF8] text-xs transition-colors tracking-wide">Privacy Policy</a>
            <a href="#" className="text-[#FFFDF8]/40 hover:text-[#FFFDF8] text-xs transition-colors tracking-wide">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
