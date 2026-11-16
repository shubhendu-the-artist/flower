import { useEffect, useState } from 'react';
import { Html, useProgress } from '@react-three/drei';

export function FlowerIcon({ className = 'w-12 h-12' }) {
  return (
    <svg
      className={`text-sky-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.5)] animate-flower-bloom ${className}`}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <g transform="translate(32,32)">
        {/* 8 Botanical Petals */}
        <path d="M 0,-4 C -6,-16 -6,-24 0,-28 C 6,-24 6,-16 0,-4 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.5" />
        <path d="M 0,-4 C -6,-16 -6,-24 0,-28 C 6,-24 6,-16 0,-4 Z" fill="currentColor" fillOpacity="0.2" strokeWidth="1.5" transform="rotate(45)" />
        <path d="M 0,-4 C -6,-16 -6,-24 0,-28 C 6,-24 6,-16 0,-4 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.5" transform="rotate(90)" />
        <path d="M 0,-4 C -6,-16 -6,-24 0,-28 C 6,-24 6,-16 0,-4 Z" fill="currentColor" fillOpacity="0.2" strokeWidth="1.5" transform="rotate(135)" />
        <path d="M 0,-4 C -6,-16 -6,-24 0,-28 C 6,-24 6,-16 0,-4 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.5" transform="rotate(180)" />
        <path d="M 0,-4 C -6,-16 -6,-24 0,-28 C 6,-24 6,-16 0,-4 Z" fill="currentColor" fillOpacity="0.2" strokeWidth="1.5" transform="rotate(225)" />
        <path d="M 0,-4 C -6,-16 -6,-24 0,-28 C 6,-24 6,-16 0,-4 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.5" transform="rotate(270)" />
        <path d="M 0,-4 C -6,-16 -6,-24 0,-28 C 6,-24 6,-16 0,-4 Z" fill="currentColor" fillOpacity="0.2" strokeWidth="1.5" transform="rotate(315)" />

        {/* Center core */}
        <circle cx="0" cy="0" r="6" fill="#090a0f" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="3" fill="currentColor" fillOpacity="0.8" />
      </g>
    </svg>
  );
}

export function FlowerLoaderCanvas() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center select-none pointer-events-none">
        <FlowerIcon className="w-14 h-14 md:w-16 md:h-16" />
      </div>
    </Html>
  );
}

export function FlowerLoaderOverlay() {
  const { active, progress } = useProgress();
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (!active && progress === 100) {
      const timer = setTimeout(() => {
        setMounted(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [active, progress]);

  if (!mounted) return null;

  return (
    <div
      className={`absolute inset-0 z-10 flex items-center justify-center md:justify-end md:pr-40 pointer-events-none transition-opacity duration-700 ease-out ${
        active || progress < 100 ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <FlowerIcon className="w-14 h-14 md:w-16 md:h-16" />
      </div>
    </div>
  );
}
