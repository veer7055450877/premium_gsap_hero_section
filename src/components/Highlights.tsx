import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Stats } from './Stats';

gsap.registerPlugin(ScrollTrigger);

export const Highlights: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%", 
          }
        }
      );

      gsap.fromTo('.highlight-text',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 w-full flex flex-col items-center justify-center z-20 overflow-hidden">
      {/* Subtle top glow to blend with previous section */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50vw] h-[200px] bg-blue-100/40 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center relative z-10">
        <h2 className="highlight-text text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 drop-shadow-sm">
          Proven Performance
        </h2>
        <p className="highlight-text text-gray-600 text-lg md:text-xl font-medium max-w-2xl mb-16">
          The journey doesn't end with aesthetics. Our core engine delivers unmatched reliability and scale for the next generation of digital products.
        </p>

        <Stats />
      </div>
    </section>
  );
};
