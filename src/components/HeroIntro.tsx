import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const HeroIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(containerRef.current, { opacity: 1, duration: 1 });

      // Blur to clear reveal for headline
      tl.fromTo(
        '.intro-letter',
        { y: 40, opacity: 0, scale: 1.1, filter: 'blur(12px)' },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.4,
          stagger: 0.04,
          ease: 'power3.out',
        }
      )
      // Tagline fade
      .fromTo(
        '.intro-tagline',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        "-=0.6"
      )
      // Scroll indicator fade
      .fromTo(
        '.intro-scroll',
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.inOut' },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headline = "WELCOME ITZ FIZZ";

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden opacity-0">
      {/* Soft light radial gradient background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6)_0%,transparent_100%)] z-0 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-ultra text-transparent bg-clip-text bg-gradient-to-b from-gray-900 via-gray-800 to-gray-600 uppercase text-glow mb-6">
          {headline.split('').map((char, i) => (
            <span key={i} className="intro-letter inline-block will-change-transform" style={{ minWidth: char === ' ' ? '0.4em' : 'auto' }}>
              {char}
            </span>
          ))}
        </h1>
        
        <p className="intro-tagline text-gray-500 text-lg md:text-xl tracking-widest font-medium uppercase">
          Experience the next generation
        </p>
      </div>

      <div className="intro-scroll absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
        <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-gray-400">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-blue-200/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-500 animate-[scrolldown_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
};
