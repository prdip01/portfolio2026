import React from 'react';

export default function ScanlineOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-[0.035]" aria-hidden="true">
      {/* Repeating fine horizontal lines */}
      <div 
        className="absolute inset-0 bg-scanlines bg-[length:100%_3px]" 
        style={{ mixBlendMode: 'overlay' }}
      ></div>
      {/* Dynamic rolling shadow beam to mimic a CRT scan */}
      <div className="absolute inset-0 w-full h-20 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-scanline-sweep"></div>
    </div>
  );
}
