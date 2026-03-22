import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedObject } from './AnimatedObject';

gsap.registerPlugin(ScrollTrigger);

export const ScrollJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating particles idle animation
      gsap.to('.journey-particle', {
        y: 'random(-30, 30)',
        x: 'random(-30, 30)',
        rotation: 'random(-20, 20)',
        duration: 'random(4, 7)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.1
      });

      // --- MAIN CINEMATIC SCROLL TIMELINE ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%", 
          scrub: 1.5,    
          pin: true,
        }
      });

      // Parallax Backgrounds
      tl.to('.journey-bg-gradient', { y: '-20%', ease: 'none' }, 0);
      tl.to('.journey-particles-layer', { y: '-40%', ease: 'none' }, 0);

      // --- PHASE 1: Reveal (0% -> 25%) ---
      tl.fromTo('.orb-wrapper',
        { scale: 0.5, opacity: 0, filter: 'blur(30px)', y: '30vh' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', y: '0vh', duration: 1, ease: 'power2.out' },
        0
      );

      // --- PHASE 2: Focus & Power (25% -> 50%) ---
      tl.to('.orb-wrapper', { scale: 1.3, duration: 1, ease: 'none' }, 1);
      // Background shifts slightly
      tl.to('.journey-bg-gradient', { opacity: 0.6, duration: 1 }, 1);

      // --- PHASE 3: Dynamic Movement (50% -> 75%) ---
      tl.to('.orb-wrapper', { 
        x: '25vw', 
        y: '-15vh', 
        rotation: 12, 
        duration: 1, 
        ease: 'power1.inOut' 
      }, 2);
      
      tl.fromTo('.motion-trail', 
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power2.out' }, 
        2.2
      );

      // --- PHASE 4: Transition (75% -> 100%) ---
      tl.to('.orb-wrapper', { 
        y: '-80vh', 
        scale: 0.6, 
        opacity: 0, 
        duration: 1, 
        ease: 'power2.in' 
      }, 3);
      tl.to('.motion-trail', { opacity: 0, duration: 0.5 }, 3);
      tl.to('.journey-bg-gradient', { opacity: 0, duration: 1 }, 3);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      
      {/* Parallax Layer 1: Background Gradient */}
      <div className="journey-bg-gradient absolute inset-[-20%] z-0 will-change-transform bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.6)_0%,transparent_70%)] pointer-events-none" />

      {/* Parallax Layer 2: Particles */}
      <div className="journey-particles-layer absolute inset-[-20%] z-10 pointer-events-none will-change-transform">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="journey-particle absolute rounded-full bg-blue-400/20 blur-[1px]"
            style={{
              width: Math.random() * 8 + 2 + 'px',
              height: Math.random() * 8 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* Layer 3: The Main Object */}
      <AnimatedObject />
      
      {/* Motion Trail */}
      <div className="motion-trail absolute top-1/2 left-1/2 w-[40vw] h-[20px] -translate-y-1/2 -translate-x-full origin-right z-10 opacity-0 pointer-events-none transform -rotate-[15deg] translate-y-[-10vh]" />

    </section>
  );
};
