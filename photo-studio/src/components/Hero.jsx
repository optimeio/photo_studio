import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const scrollRef = useRef(null);
  const parallaxWrapper = useRef(null);

  useEffect(() => {

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Entrance Sequence
      const tl = gsap.timeline();
      
      // Image Entrance - Snaps down from 1.08 simulating the camera focal settle
      tl.fromTo(bgRef.current,
        { opacity: 1, scale: 1.04 },
        { scale: 1, duration: 1, ease: "power2.out" }
      )
      // Eyebrow
      .fromTo('.hero-eyebrow',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.7"
      )
      // Heading lines
      .fromTo('.hero-line-inner',
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.6"
      )
      // Description
      .fromTo('.hero-desc',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.6"
      )
      // CTAs
      .fromTo('.hero-cta',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.5"
      )
      // Scroll indicator
      .fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 0.7, duration: 0.7 },
        "-=0.4"
      );

      // Scroll Indicator Bounce
      gsap.to(scrollRef.current, {
        y: 8,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true
      });

      // Scroll Transition
      mm.add("(min-width: 768px)", () => {
        gsap.to(contentRef.current, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      });

    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative h-[100svh] min-h-[650px] w-full flex flex-col justify-center overflow-hidden bg-[#12100E] selection:bg-[#C5A059] selection:text-[#12100E]">
      {/* Background Wrapper */}
      <div ref={parallaxWrapper} className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Main Image */}
        <img 
          ref={bgRef}
          src="/images/wedding/wedding-85.webp" 
          alt="Luxury Cinematic Wedding Photography" 
          className="absolute inset-0 w-full h-full object-cover origin-center object-[75%_top] md:object-center"
          style={{ opacity: 1, scale: 1.08 }}
        />
        
        {/* Slightly dim overlay for text readability, as requested */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Film Grain */}
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
      </div>

      {/* Content - Increased top margin heavily so it absolutely clears the logo */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-12 pt-24 md:pt-32 pb-8 md:pb-12">
        <div ref={contentRef} className="max-w-[700px] text-center lg:text-left mx-auto lg:mx-0 flex flex-col items-center lg:items-start" style={{ opacity: 1 }}>
          
          {/* Eyebrow - Changed to white for max visibility, added a gold line next to it for the premium feel */}
          <div className="hero-eyebrow flex items-center gap-4 mb-4 opacity-0">
            <div className="hidden lg:block w-12 h-[1px] bg-[#C5A059]"></div>
            <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#FFFDF8] font-bold drop-shadow-md">
              Vista Studio · Emotion through Photos
            </p>
          </div>
          
          {/* Main Heading */}
          <h1 className="font-serif text-[clamp(2.5rem,8vw,6.5rem)] font-normal leading-[0.95] text-[#FFFDF8] mb-4 md:mb-5 max-w-[650px] drop-shadow-lg">
            <span className="block overflow-hidden"><span className="hero-line-inner block opacity-0">Every <span className="text-[#C5A059] italic">Moment</span></span></span>
            <span className="block overflow-hidden"><span className="hero-line-inner block opacity-0">Deserves</span></span>
            <span className="block overflow-hidden"><span className="hero-line-inner block opacity-0">To Be <span className="text-[#C5A059]">Remembered.</span></span></span>
          </h1>
          
          {/* Description */}
          <p className="hero-desc opacity-0 font-sans text-[#FFFDF8] text-base md:text-xl leading-[1.5] mb-8 max-w-[500px] font-medium" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>
            Stories captured with emotion, elegance, and cinematic beauty.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Link to="/portfolio" className="hero-cta opacity-0 bg-[#C5A059] hover:bg-[#D4AF37] text-[#12100E] px-8 py-3.5 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 w-full sm:w-auto shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3">
              Explore Our Work <span className="text-lg leading-none">&rarr;</span>
            </Link>
            <a href="#booking" className="hero-cta opacity-0 group bg-[#12100E]/50 text-[#FFFDF8] hover:bg-[#12100E]/80 hover:text-[#C5A059] text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-3 border border-[#FFFDF8]/30 hover:border-[#C5A059] px-8 py-3.5 rounded-full backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
              Book a Session <span className="text-lg leading-none transform transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0">
        <span className="text-[#FFFDF8]/70 text-[9px] tracking-[0.3em] uppercase font-sans font-medium">Scroll</span>
        <span className="text-[#C5A059] text-xs">&darr;</span>
      </div>
    </section>
  );
};

export default Hero;
