import { useRef, Suspense } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { siteConfig } from '../data/siteConfig';
import Scene from './Scene';
import { Canvas } from '@react-three/fiber';


export default function Hero() {
  const heroRef = useRef(null);
  const titleLinesRef = useRef([]);
  const subtitleRef = useRef(null);
  const ctaPrimaryRef = useRef(null);
  const ctaSecondaryRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  // GSAP animations
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      // Master timeline
      const tl = gsap.timeline({
        defaults: {
          duration: siteConfig.animation.duration,
          ease: siteConfig.animation.ease
        }
      });

      // Animate title lines
      tl.to(titleLinesRef.current, {
        y: 0,
        stagger: siteConfig.animation.stagger,
      })
        // Animate subtitle
        .to(subtitleRef.current, {
          y: 0,
        }, '-=0.4')
        // Animate CTAs
        .to([ctaPrimaryRef.current, ctaSecondaryRef.current], {
          y: 0,
          stagger: 0.1,
        }, '-=0.3')
        // Animate scroll indicator
        .to(scrollIndicatorRef.current, {
          y: 0,
        }, '-=0.2');

      // Floating animation for scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Subtle parallax on mouse move
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20;
        const y = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(titleLinesRef.current, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 1,
          ease: 'power2.out',
        });
        gsap.to(subtitleRef.current, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 1,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full px-6 md:pt-26 md:pb-20"
      aria-labelledby="hero-title"
    >
      {/* 3D Canvas Section */}
      <div className="absolute h-[80vh] md:h-[90vh] inset-0 z-0">
        <Canvas
          camera={{ fov: 25, near: 0.1, far: 100, position: [0, 0, 21] }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          className="absolute inset-0 h-full! w-full!"
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
        <div className="absolute inset-0 z-10 bg-linear-to-t from-transparent via-black/15 to-transparent pointer-events-none" />
      </div>
      {/* Content */}
      <div className="z-20 w-full flex flex-col px-6 pt-28 pb-16 md:pt-3 md:pb-0 overflow-hidden">
        {/* Title */}
        <h1
          id="hero-title"
          className="font-['Space_Grotesk'] font-semibold tracking-tight text-white"
          style={{ fontSize: 'clamp(3.6rem, 9vw, 8rem)', lineHeight: 0.98  }}
        >
          <span
            ref={(el) => { if (el) titleLinesRef.current[0] = el; }}
            className="block"
          >
            {siteConfig.hero.title.line1}
          </span>
          <span
            ref={(el) => { if (el) titleLinesRef.current[1] = el; }}
            className="block text-transparent py-1 bg-clip-text bg-linear-to-r from-blue-300 via-white to-white/60"
          >
            {siteConfig.hero.title.line2}
          </span>
          <span
            ref={(el) => { if (el) titleLinesRef.current[2] = el; }}
            className="block "
          >
            {siteConfig.hero.title.line3}
          </span>
        </h1>
        {/* Subtitle */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
          <p
            ref={subtitleRef}
            className="mt-12 pt-40 md:pt-0 max-w-3xl text-lg md:text-xl text-white/70 leading-relaxed font-light"
          >
            {siteConfig.hero.subtitle}
          </p>
          {/* Scroll Indicator */}
          <div
            ref={scrollIndicatorRef}
            className="mt-16 md:mr-10 flex flex-col items-center gap-2 text-white/70 opacity-70"
            aria-hidden="true"
          >
            <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
            <svg
              className="w-6 h-6 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>

        </div>
        {/* CTAs */}
        <div
          className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-4"
          role="group"
          aria-label="Primary actions"
        >
          <a
            ref={ctaPrimaryRef}
            href={siteConfig.hero.cta.primary.href}
            className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(siteConfig.hero.cta.primary.href);
            }}
          >
            {siteConfig.hero.cta.primary.label}
          </a>
          <a
            ref={ctaSecondaryRef}
            href={siteConfig.hero.cta.secondary.href}
            className="px-8 py-4 border border-white/30 text-white font-medium rounded-full hover:border-white/60 hover:bg-white/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(siteConfig.hero.cta.secondary.href);
            }}
          >
            {siteConfig.hero.cta.secondary.label}
          </a>


        </div>
      </div>
    </section>
  );
}