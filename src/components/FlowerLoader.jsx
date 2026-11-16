import { useEffect, useState } from 'react';
import { Html, useProgress } from '@react-three/drei';

export function FlowerIcon({ className = 'w-12 h-12' }) {
  return (
    <svg
      className={`text-[#BAFDDB] animate-flower-bloom ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.5" />
      <path d="M12 3a2.5 2.5 0 0 0-2.5 2.5c0 1.5 2.5 4 2.5 4s2.5-2.5 2.5-4A2.5 2.5 0 0 0 12 3z" />
      <path d="M12 21a2.5 2.5 0 0 0 2.5-2.5c0-1.5-2.5-4-2.5-4s-2.5 2.5-2.5 4A2.5 2.5 0 0 0 12 21z" />
      <path d="M3 12a2.5 2.5 0 0 0 2.5 2.5c1.5 0 4-2.5 4-2.5s-2.5-2.5-4-2.5A2.5 2.5 0 0 0 3 12z" />
      <path d="M21 12a2.5 2.5 0 0 0-2.5-2.5c-1.5 0-4 2.5-4 2.5s2.5 2.5 4 2.5A2.5 2.5 0 0 0 21 12z" />
      <path d="M5.64 5.64a2.5 2.5 0 0 0 0 3.54c1.06 1.06 4.24 1.41 4.24 1.41s-.35-3.18-1.41-4.24a2.5 2.5 0 0 0-3.54 0z" />
      <path d="M18.36 18.36a2.5 2.5 0 0 0 0-3.54c-1.06-1.06-4.24-1.41-4.24-1.41s.35 3.18 1.41 4.24a2.5 2.5 0 0 0 3.54 0z" />
      <path d="M5.64 18.36a2.5 2.5 0 0 0 3.54 0c1.06-1.06 1.41-4.24 1.41-4.24s-3.18.35-4.24 1.41a2.5 2.5 0 0 0 0 3.54z" />
      <path d="M18.36 5.64a2.5 2.5 0 0 0-3.54 0c-1.06 1.06-1.41 4.24-1.41 4.24s3.18-.35 4.24-1.41a2.5 2.5 0 0 0 0-3.54z" />
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
