import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';

// A large pool of known images to randomly select from
const imagePool = [
  ...Array.from({length: 55}, (_, i) => `/images/wedding/wedding-${i+80}.webp`),
  ...Array.from({length: 20}, (_, i) => `/images/portraits/portraits-${i+90}.webp`)
];

const getRandomImages = (count) => {
  const shuffled = [...imagePool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const textRef = useRef(null);
  const subTextRef = useRef(null);
  const overlayRef = useRef(null);
  
  // Pick 5 random images only once when the component mounts
  const randomImages = useMemo(() => getRandomImages(5), []);

  // Preload images to ensure they display instantly
  useEffect(() => {
    randomImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [randomImages]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }
      });

      // Initial state
      gsap.set(imageRefs.current, { opacity: 0, scale: 1.2 });
      gsap.set(textRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(subTextRef.current, { opacity: 0, y: 20 });
      gsap.set(overlayRef.current, { yPercent: 0 });

      // Create a rapid sequence for the images
      const imageDuration = 0.15; // very fast flash
      
      imageRefs.current.forEach((img, i) => {
        const isLast = i === imageRefs.current.length - 1;
        
        // Show image
        tl.to(img, {
          opacity: 1,
          scale: 1,
          duration: isLast ? 0.4 : imageDuration,
          ease: "power2.out"
        });
        
        // Hide image (unless it's the last one)
        if (!isLast) {
          tl.to(img, {
            opacity: 0,
            duration: 0.05, // virtually instant cut
          });
        }
      });

      // The last image scales up dramatically and fades out as the text stamps in
      tl.to(imageRefs.current[imageRefs.current.length - 1], {
        scale: 2,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.6,
        ease: "power3.in"
      }, "+=0.2")
      // Brand Name Reveal
      .to(textRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.5)"
      }, "<0.2")
      .to(subTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      // Hold for a moment to admire the logo
      // Then slide everything up
      .to([textRef.current, subTextRef.current], {
        y: -50,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        delay: 0.1
      })
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut"
      }, "-=0.2");

    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center pointer-events-none"
    >
      {/* Background Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-[#0a0908] z-10 origin-top"
      />
      
      {/* Decorative noise */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none z-20"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Image Sequence Container */}
      <div className="absolute z-30 w-64 h-80 md:w-80 md:h-[28rem] overflow-hidden rounded-sm shadow-2xl flex items-center justify-center">
        {randomImages.map((src, index) => (
          <img 
            key={index}
            ref={el => imageRefs.current[index] = el}
            src={src}
            alt={`Preloader ${index}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ))}
      </div>

      {/* Brand Text */}
      <div className="relative z-40 flex flex-col items-center justify-center">
        <h1 
          ref={textRef}
          className="text-5xl md:text-7xl lg:text-9xl font-serif text-[#FFFDF8] tracking-[0.15em] uppercase drop-shadow-2xl"
        >
          Vista
        </h1>
        <p 
          ref={subTextRef}
          className="mt-4 text-xs md:text-sm font-sans text-[#C5A059] tracking-[0.4em] uppercase"
        >
          Studio
        </p>
      </div>
    </div>
  );
};

export default Preloader;
