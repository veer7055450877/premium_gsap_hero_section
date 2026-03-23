import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HeroIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a scroll-linked timeline that pins the intro section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Pins the section for 1.5x the viewport height
          scrub: 1,      // Smooth scrubbing effect tied to scroll
          pin: true,     // Pauses the main scroll until animation completes
        }
      });

      // 1. Typing animation for the headline tied to scroll
      tl.fromTo(
        '.intro-letter',
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.1,   // Reveal one by one
          ease: 'none',
          duration: 2     // Takes up a good portion of the scroll
        }
      )
      // 2. Tagline fade in
      .fromTo(
        '.intro-tagline',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        "-=0.5" // Overlap slightly with the end of the typing
      )
      // 3. Scroll indicator fade in
      .fromTo(
        '.intro-scroll',
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.inOut' },
        "<" // Sync with tagline
      )
      // 4. Add a small empty buffer at the end so the user can see the fully 
      // completed text for a moment before the section unpins and moves down.
      .to({}, { duration: 0.5 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headline = "WELCOME ITZ FIZZ";

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Soft light radial gradient background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6)_0%,transparent_100%)] z-0 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-7xl mx-auto">
        
        {/* Headline with Scroll-Typing Effect and Blinking Cursor */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-ultra uppercase mb-6 flex items-center justify-center flex-wrap text-gray-900 drop-shadow-sm">
          {headline.split('').map((char, i) => (
            <span 
              key={i} 
              className="intro-letter inline-block opacity-0 will-change-transform" 
              style={{ minWidth: char === ' ' ? '0.4em' : 'auto' }}
            >
              {char}
            </span>
          ))}
          {/* Blinking Cursor */}
          <span className="inline-block w-[0.08em] h-[0.9em] bg-blue-600 ml-2 animate-pulse" />
        </h1>
        
        <p className="intro-tagline text-gray-500 text-lg md:text-xl tracking-widest font-medium uppercase opacity-0">
          Experience the next generation
        </p>
      </div>

      <div className="intro-scroll absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 opacity-0">
        <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-gray-400">Scroll down</span>
        <div className="w-[1px] h-12 bg-blue-200/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-500 animate-[scrolldown_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
};
