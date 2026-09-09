import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef    = useRef(null);
  const imageRef      = useRef(null);
  const imgInnerRef   = useRef(null);
  const lineRef       = useRef(null);
  const counterRef1   = useRef(null);
  const counterRef2   = useRef(null);
  const counterRef3   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        
        /* ── 1. ELEGANT IMAGE REVEAL ── */
        gsap.fromTo(
          '.about-image-wrapper',
          { opacity: 0, y: 50, scale: 1.05 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 1.5, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
          }
        );

        /* ── 2. IMAGE INNER ZOOM ── */
        gsap.fromTo(
          imgInnerRef.current,
          { scale: 1.15 },
          {
            scale: 1,
            duration: 1.5, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
          }
        );

        /* ── 3. GOLDEN CORNER LINES ── */
        gsap.fromTo(
          ['.corner-tl', '.corner-br'],
          { width: 0, height: 0, opacity: 0 },
          { width: 96, height: 96, opacity: 1, duration: 1.5, ease: 'expo.out', stagger: 0.2,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' } }
        );

        /* ── 4. TEXT BLOCKS — Fade Up ── */
        gsap.fromTo(
          '.about-text',
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1.2, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: '.about-text-container', start: 'top 80%' },
          }
        );

        /* ── 4b. HEADING REVEAL ── */
        gsap.fromTo(
          '.about-heading-line',
          { y: 80, opacity: 0, rotate: 2 },
          {
            y: 0, opacity: 1, rotate: 0,
            duration: 1.2, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.about-text-container', start: 'top 80%' }
          }
        );

        /* ── 5. STATS COUNTERS & CARDS ── */
        const animateCounter = (ref, target) => {
          gsap.to(ref.current, {
            textContent: target, duration: 2.5, ease: 'expo.out', snap: { textContent: 1 },
            scrollTrigger: { trigger: '.stat-grid', start: 'top 90%' },
          });
        };
        animateCounter(counterRef1, 1000);
        animateCounter(counterRef2, 500);
        animateCounter(counterRef3, 10);

        gsap.fromTo(
          '.stat-card',
          { scale: 0.8, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: '.stat-grid', start: 'top 95%' } }
        );

      });

      /* Reduced-motion fallback */
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.fromTo('.about-image-wrapper', { opacity: 0 }, { opacity: 1, duration: 1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
        gsap.fromTo('.about-text', { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: '.about-text-container', start: 'top 75%' } });
      });

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-8 md:py-16 px-4 md:px-6 w-full bg-[#FFFDF8] overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

        {/* ── Left — Asymmetric Image ── */}
        <div ref={imageRef} className="w-full relative px-6 md:px-0 max-w-sm mx-auto lg:max-w-none" style={{ transformStyle: 'preserve-3d' }}>
          {/* Corner decoration lines */}
          <div className="corner-tl absolute -top-4 -left-4 w-0 h-0 border-t-2 border-l-2 border-[#C5A059] z-10 pointer-events-none" />
          <div className="corner-br absolute -bottom-4 -right-4 w-0 h-0 border-b-2 border-r-2 border-[#C5A059] z-10 pointer-events-none" />

          {/* Floating golden glow */}
          <div className="absolute -inset-4 rounded-sm z-0 pointer-events-none"
               style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(197,160,89,0.12) 0%, transparent 70%)' }} />

          <div className="about-image-wrapper relative z-10 overflow-hidden rounded-sm aspect-[3/4] shadow-2xl">
            <img
              ref={imgInnerRef}
              src="/images/portraits/portraits-100.webp"
              alt="Vista Studio"
              className="w-full h-full object-cover"
              style={{ willChange: 'transform' }}
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#12100E]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* ── Right — Content ── */}
        <div className="w-full about-text-container">

          <div className="about-text flex items-center gap-4 mb-6">
            <div ref={lineRef} className="h-[1px] w-12 bg-[#C5A059]" />
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[#C5A059]">BEHIND THE LENS</h2>
          </div>

          <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#12100E] mb-6 md:mb-8 leading-tight">
            <span className="block overflow-hidden pb-2"><span className="about-heading-line block">Capturing Authentic</span></span>
            <span className="block overflow-hidden"><span className="about-heading-line block">Emotions &amp; Stories.</span></span>
          </h3>

          <div className="about-text relative mb-12 pl-6 md:pl-10">
            <Quote className="absolute left-0 top-0 text-[#C5A059] w-6 md:w-8 h-6 md:h-8 opacity-40 -translate-x-2 -translate-y-2" />
            <p className="text-[#201D19]/80 mb-6 leading-relaxed text-lg font-light">
              At Vista Studio, we believe that photography is more than just taking pictures. It's about freezing genuine feelings, unguarded smiles, and the invisible connections between people.
            </p>
            <p className="text-[#201D19]/80 mb-6 leading-relaxed text-lg font-light">
              We focus on telling your unique story through an artistic and cinematic lens, ensuring every moment is preserved beautifully for generations to come.
            </p>

            <div className="mt-8 p-5 bg-[#C5A059]/10 border-l-2 border-[#C5A059] rounded-r-sm">
              <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#12100E] mb-2">Visit Our Studio</h4>
              <p className="text-[#201D19]/80 text-sm font-light leading-relaxed">
                Vista Photography Studio<br />
                42 Studio Boulevard, Creative District
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="stat-grid grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-[#12100E]/10">
            {[
              { ref: counterRef1, target: 1000, label: 'Moments Captured' },
              { ref: counterRef2, target: 500,  label: 'Happy Clients' },
              { ref: counterRef3, target: 10,   label: 'Years of Experience', span: 'col-span-2 md:col-span-1' },
            ].map(({ ref, label, span = '' }) => (
              <div key={label} className={`stat-card ${span}`}>
                <span className="block text-[#C5A059] text-4xl font-serif font-bold mb-2">
                  <span ref={ref}>0</span>+
                </span>
                <span className="text-[11px] text-[#201D19]/60 font-bold uppercase tracking-[0.2em]">{label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
