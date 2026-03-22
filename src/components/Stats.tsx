import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statItems = [
  { target: 98, suffix: '%', label: 'Customer Satisfaction' },
  { target: 120, suffix: 'K+', label: 'Active Users' },
  { target: 24, suffix: '/7', label: 'Premium Support' },
];

export const Stats: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Staggered reveal of the cards
      gsap.fromTo('.stat-card',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          }
        }
      );

      // 2. Count-up animation
      numbersRef.current.forEach((el, index) => {
        if (!el) return;
        const target = statItems[index].target;
        const suffix = statItems[index].suffix;
        
        const obj = { val: 0 };
        
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
          onUpdate: () => {
            if (el) {
              const currentVal = target === 24 ? Math.ceil(obj.val) : Math.floor(obj.val);
              el.innerText = currentVal + suffix;
            }
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 w-full">
      {statItems.map((stat, index) => (
        <div 
          key={index} 
          className="stat-card glass-panel rounded-3xl p-8 w-full md:w-72 flex flex-col items-center text-center group relative overflow-hidden transition-all duration-500 hover:bg-white/70 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
        >
          {/* Subtle hover glow inside card using Blue and Indigo */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-indigo-500/0 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all duration-500" />
          
          <span 
            ref={el => numbersRef.current[index] = el}
            className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 mb-4 will-change-transform relative z-10 drop-shadow-sm"
          >
            0{stat.suffix}
          </span>
          <span className="text-xs md:text-sm text-gray-500 font-bold tracking-widest uppercase relative z-10 group-hover:text-blue-600 transition-colors duration-300">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};
