import React from 'react';
import { HeroIntro } from './components/HeroIntro';
import { ScrollJourney } from './components/ScrollJourney';
import { Highlights } from './components/Highlights';

function App() {
  return (
    <main className="bg-gradient-to-br from-sky-100 to-white min-h-screen w-full text-gray-900 selection:bg-blue-500/20 relative">
      {/* Global Noise Overlay */}
      <div className="fixed inset-0 bg-noise z-50 pointer-events-none opacity-50" />

      {/* 1. The Hook */}
      <HeroIntro />
      
      {/* 2. The Main Experience */}
      <ScrollJourney />
      
      {/* 3. The Proof */}
      <Highlights />
      
      {/* Spacer to allow scrolling past the highlights */}
      <section className="h-[40vh] w-full flex items-center justify-center relative z-10 border-t border-sky-200/50">
        <p className="text-gray-400 text-sm tracking-widest uppercase font-medium">The journey continues</p>
      </section>
    </main>
  );
}

export default App;
