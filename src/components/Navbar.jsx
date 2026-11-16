import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { siteConfig } from '../data/siteConfig';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Scroll effect with direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled styling threshold
      setIsScrolled(currentScrollY > 50);

      // Keep navbar visible if mobile menu is open
      if (isMobileMenuOpen) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > 70) {
        if (currentScrollY > lastScrollY.current + 6) {
          // Scrolling down
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current - 6) {
          // Scrolling up
          setIsVisible(true);
        }
      } else {
        // At or near the top
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  // GSAP animations
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Initial animation for logo and links
      gsap.fromTo(
        [logoRef.current, ...linksRef.current?.children || []],
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.3,
        }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useGSAP(() => {
    if (!mobileMenuRef.current) return;

    const ctx = gsap.context(() => {
      if (isMobileMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current.children,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            stagger: 0.1,
          }
        );
      }
    }, mobileMenuRef);

    return () => ctx.revert();
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMobileMenu();
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${isScrolled || isMobileMenuOpen
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
        }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            ref={logoRef}
            href="#"
            className="group font-mono flex items-center gap-3 text-2xl md:text-3xl tracking-tight text-white hover:opacity-90 transition-opacity"
            aria-label={`${siteConfig.brand.name} - Home`}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="relative flex items-center justify-center transition-transform duration-700 ease-out group-hover:rotate-180 group-hover:scale-110">
              <svg
                className="w-7 h-7 md:w-8 md:h-8 text-sky-400 group-hover:text-[#BAFDDB] transition-colors duration-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.45)]"
                viewBox="0 0 64 64"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <g transform="translate(32,32)">
                  <path d="M 0,-4 C -6,-16 -6,-24 0,-28 C 6,-24 6,-16 0,-4 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="1.5" />
                  <path d="M 0,-4 C -6,-16 -6,-24 0,-28 C 6,-24 6,-16 0,-4 Z" fill="currentColor" fillOpacity="0.2" strokeWidth="1.5" transform="rotate(45)" />
                  <path d="M 0,-4 C -6,-16 -6,-24 0,-28 C 6,-24 6,-16 0,-4 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="1.5" transform="rotate(90)" />
                  <path d="M 0,-4 C -6,-16 -6,-24 0,-28 C 6,-24 6,-16 0,-4 Z" fill="currentColor" fillOpacity="0.2" strokeWidth="1.5" transform="rotate(135)" />
                  <path d="M 0,-4 C -6,-16 -6,-24 0,-28 C 6,-24 6,-16 0,-4 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="1.5" transform="rotate(180)" />
                  <path d="M 0,-4 C -6,-16 -6,-24 0,-28 C 6,-24 6,-16 0,-4 Z" fill="currentColor" fillOpacity="0.2" strokeWidth="1.5" transform="rotate(225)" />
                  <path d="M 0,-4 C -6,-16 -6,-24 0,-28 C 6,-24 6,-16 0,-4 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="1.5" transform="rotate(270)" />
                  <path d="M 0,-4 C -6,-16 -6,-24 0,-28 C 6,-24 6,-16 0,-4 Z" fill="currentColor" fillOpacity="0.2" strokeWidth="1.5" transform="rotate(315)" />
                  <circle cx="0" cy="0" r="5.5" fill="#090a0f" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="2.8" fill="currentColor" fillOpacity="0.9" />
                </g>
              </svg>
            </span>
            <span className="font-['Space_Grotesk'] tracking-wider">
              {siteConfig.brand.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div
            ref={linksRef}
            className="hidden md:flex items-center gap-8"
            role="menubar"
          >
            {siteConfig.nav.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all hover:after:w-full"
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={hamburgerRef}
            className="md:hidden p-2 text-white z-50"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${isMobileMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
            }`}
          role="navigation"
          aria-label="Mobile navigation"
          aria-hidden={!isMobileMenuOpen}
          inert={!isMobileMenuOpen}
        >
          <div className="py-4 space-y-4 border-t border-white/10 mt-4">
            {siteConfig.nav.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-lg font-medium text-white/80 hover:text-white transition-colors"
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}