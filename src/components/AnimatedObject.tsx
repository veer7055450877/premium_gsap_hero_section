import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const AnimatedObject: React.FC = () => {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Micro-interaction: Continuous slow idle rotation and pulse
      gsap.to('.orb-core', {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: 'none'
      });
      
      gsap.to('.orb-pulse', {
        scale: 1.05,
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, orbRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={orbRef} className="orb-wrapper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] z-20 will-change-transform pointer-events-none">
      
      {/* Background Pulse Glow - Blue Accent */}
      <div className="orb-pulse absolute inset-[-10%] rounded-full bg-blue-300/30 blur-[50px] mix-blend-multiply" />

      {/* Main Glass Orb - Frosted Light Theme */}
      <div className="absolute inset-0 rounded-full orb-glow backdrop-blur-2xl border border-white/60 overflow-hidden">
        
        {/* Rotating Iridescent Core (Blue & Indigo) */}
        <div className="orb-core absolute inset-[-50%] opacity-60 mix-blend-normal">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
               style={{
                 background: 'conic-gradient(from 0deg, transparent 0%, rgba(59,130,246,0.5) 25%, transparent 50%, rgba(99,102,241,0.5) 75%, transparent 100%)',
                 filter: 'blur(25px)'
               }} 
          />
        </div>

        {/* Dynamic Light Reflection (Specular Highlight) */}
        <div className="absolute top-[5%] left-[10%] w-[50%] h-[40%] rounded-full bg-gradient-to-br from-white/90 to-transparent blur-xl transform -rotate-45" />
        
        {/* Secondary subtle reflection */}
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-white/50 blur-lg" />
      </div>
    </div>
  );
};
