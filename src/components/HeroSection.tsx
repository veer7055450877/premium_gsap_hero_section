import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Stats } from './Stats';
import { AnimatedObject } from './AnimatedObject';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const headlineText = "WELCOME ITZ FIZZ";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- 1. INITIAL LOAD ANIMATION (Cinematic Entry) ---
      const loadTl = gsap.timeline();

      // Headline: Blur to clear, scale down, move up
      loadTl.fromTo(
        '.headline-letter',
        { y: 80, opacity: 0, scale: 1.2, filter: 'blur(15px)' },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          stagger: 0.04,
          ease: 'expo.out',
        }
      )
      // Stats: Fade up with a micro-bounce
      .fromTo(
        '.stat-card',
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: 'back.out(1.5)' 
        },
        "-=0.8"
      )
      .fromTo(
        '.scroll-indicator',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        "-=0.5"
      );

      // --- 2. SCROLL DRIVEN ANIMATION (Pinned & Multi-Phase) ---
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%", // 250vh of scrolling for a long, cinematic feel
          scrub: 1.5,    // Smooth interpolation
          pin: true,     // Pin the hero section
        }
      });

      // Parallax Layers Setup
      // Background moves slowest, Foreground moves fastest
      scrollTl.to('.parallax-bg', { y: '-15%', ease: 'none' }, 0);
      scrollTl.to('.parallax-mid', { y: '-30%', ease: 'none' }, 0);
      
      // Fade out text as we scroll deep
      scrollTl.to('.hero-content', { opacity: 0, y: -50, duration: 0.3, ease: 'power2.in' }, 0);

      // --- ORB MULTI-PHASE ANIMATION ---
      
      // Phase 1: Entry (0% -> 30%) - Comes into focus from background
      scrollTl.fromTo('.premium-orb',
        { scale: 0.6, opacity: 0, filter: 'blur(20px)', y: '20vh' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', y: '0vh', duration: 0.3, ease: 'power1.inOut' },
        0 // Start immediately on scroll
      )
      // Phase 2: Focus (30% -> 60%) - Zooms in slightly, establishing presence
      .to('.premium-orb', { 
        scale: 1.2, 
        duration: 0.3, 
        ease: 'none' 
      })
      // Phase 3: Dynamic Motion (60% -> 100%) - Moves away diagonally with rotation
      .to('.premium-orb', { 
        x: '35vw', 
        y: '-15vh', 
        rotation: 12, 
        scale: 0.8, 
        opacity: 0.4,
        duration: 0.4, 
        ease: 'power2.inOut' 
      });

      // Idle floating animation for particles
      gsap.to('.floating-particle', {
        y: 'random(-20, 20)',
        x: 'random(-20, 20)',
        rotation: 'random(-15, 15)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.1
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-zinc-950"
    >
      {/* --- PARALLAX LAYERS --- */}
      
      {/* Background Layer (Slowest) */}
      <div className="parallax-bg absolute inset-0 z-0 will-change-transform">
        <div className="absolute inset-0 bg-noise" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,40,60,0.4)_0%,rgba(0,0,0,1)_100%)]" />
      </div>

      {/* Mid Layer (Particles) */}
      <div className="parallax-mid absolute inset-0 z-0 pointer-events-none will-change-transform">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="floating-particle absolute rounded-full bg-white/10 blur-[1px]"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* Foreground Layer (The Orb) */}
      <AnimatedObject />

      {/* --- MAIN CONTENT --- */}
      <div className="hero-content relative z-20 flex flex-col items-center justify-center px-6 w-full max-w-7xl mx-auto will-change-transform">
        
        {/* Headline */}
        <h1 
          ref={headlineRef}
          className="text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-ultra text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 uppercase text-glow"
        >
          {headlineText.split('').map((char, index) => (
            <span 
              key={index} 
              className="headline-letter inline-block will-change-transform"
              style={{ minWidth: char === ' ' ? '0.4em' : 'auto' }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Stats Section */}
        <Stats ref={statsRef} />
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
        <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-white/40">Discover</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/80 animate-[scrolldown_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
};
