import { useState, useEffect, useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../data/siteConfig';

gsap.registerPlugin(ScrollTrigger);

// Magnetic button component that smoothly attracts toward cursor
function MagneticElement({ children, className = '', onClick, href, target, rel, title, ...props }) {
  const elRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = elRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * 0.28,
      y: y * 0.28,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const el = elRef.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.55,
      ease: 'elastic.out(1.1, 0.4)',
    });
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      ref={elRef}
      href={href}
      target={target}
      rel={rel}
      title={title}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const modalOverlayRef = useRef(null);
  const modalBoxRef = useRef(null);
  const modalContentRef = useRef(null);
  const filterRef = useRef(null);

  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const projects = siteConfig.projects.items || [];
  const filterOptions = siteConfig.projects.filterOptions || [
    'All',
    'Development',
    'ML Project',
    'GenAI Project',
  ];

  // Dynamic filter matching
  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => {
      if (p.types && p.types.length > 0) {
        return p.types.includes(activeFilter);
      }
      if (p.category && p.category.toLowerCase().includes(activeFilter.toLowerCase())) return true;
      if (p.tags && p.tags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))) return true;
      return false;
    });

  // Close filter dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };
    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterOpen]);

  // GSAP animation for section header and project cards
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Project cards staggered entrance
      if (cardsRef.current.length > 0) {
        gsap.fromTo(
          cardsRef.current.filter(Boolean),
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  // Magnetic hover effect on project cards
  const handleCardMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      x: relX * 10,
      y: relY * 10,
      rotateX: -relY * 3,
      rotateY: relX * 3,
      transformPerspective: 900,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleCardMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.65,
      ease: 'elastic.out(1, 0.45)',
    });
  };

  // Handle modal opening animation
  useEffect(() => {
    if (selectedProject && modalOverlayRef.current && modalBoxRef.current) {
      document.body.style.overflow = 'hidden';

      const tl = gsap.timeline();
      tl.fromTo(
        modalOverlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      ).fromTo(
        modalBoxRef.current,
        { opacity: 0, y: 35, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.2)' },
        '-=0.1'
      );

      if (modalContentRef.current) {
        tl.fromTo(
          modalContentRef.current.children,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' },
          '-=0.2'
        );
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  // Close modal with smooth GSAP exit animation
  const closeModal = useCallback(() => {
    if (isClosing || !selectedProject) return;
    setIsClosing(true);

    if (modalOverlayRef.current && modalBoxRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setSelectedProject(null);
          setIsClosing(false);
          document.body.style.overflow = '';
        },
      });

      tl.to(modalBoxRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.96,
        duration: 0.2,
        ease: 'power2.in',
      }).to(
        modalOverlayRef.current,
        { opacity: 0, duration: 0.18, ease: 'power2.in' },
        '-=0.08'
      );
    } else {
      setSelectedProject(null);
      setIsClosing(false);
      document.body.style.overflow = '';
    }
  }, [isClosing, selectedProject]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, closeModal]);

  // Navigate to previous or next project in modal
  const navigateProject = (direction) => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = projects.length - 1;
    if (newIndex >= projects.length) newIndex = 0;

    if (modalBoxRef.current) {
      gsap.fromTo(
        modalBoxRef.current,
        { opacity: 0.7, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' }
      );
    }
    setSelectedProject(projects[newIndex]);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full py-24 px-6 md:px-12 bg-transparent text-white"
      aria-labelledby="projects-heading"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header with Gradient Aura */}
        <div ref={headerRef} className="relative z-30 text-center max-w-3xl mx-auto mb-16 md:mb-20">
          {/* Subtle decent gradient aura behind the heading */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[170px] bg-linear-to-r from-purple-500/18 via-indigo-500/14 to-teal-400/16 blur-[65px] rounded-full -z-10"
            aria-hidden="true"
          />

          {/* Clean 'Selected Work' badge without unnecessary border */}
          <p className="text-[#BAFDDB] before:content-['✳'] before:mr-2 font-mono text-sm tracking-widest uppercase mb-4">
            {siteConfig.projects.badge || 'SELECTED WORK'}
          </p>

          <h2
            id="projects-heading"
            className="font-['Space_Grotesk'] font-semibold tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl mb-6 drop-shadow-sm"
          >
            {siteConfig.projects.title}
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
            {siteConfig.projects.subtitle}
          </p>

          {/* Filter Button & Dropdown */}
          <div ref={filterRef} className="relative inline-block mt-8 z-40">
            <button
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-medium border border-white/15 hover:border-white/30 transition-all duration-300 shadow-sm cursor-pointer"
              aria-expanded={isFilterOpen}
              aria-haspopup="true"
            >
              <svg className="w-4 h-4 text-[#BAFDDB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Filter:</span>
              <span className="text-[#BAFDDB] font-mono font-semibold">
                {activeFilter === 'All' ? 'All Projects' : activeFilter}
              </span>
              <svg
                className={`w-3.5 h-3.5 text-white/60 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isFilterOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl bg-zinc-950/95 backdrop-blur-2xl border border-white/15 p-2 shadow-2xl z-50 text-left">
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 px-3 py-1.5">
                  Filter By Category
                </div>
                {filterOptions.map((option) => {
                  const isSelected = activeFilter === option;
                  const label = option === 'All' ? 'All Projects' : option;

                  return (
                    <button
                      key={option}
                      onClick={() => {
                        setActiveFilter(option);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${isSelected
                          ? 'bg-white text-black font-semibold'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                      <span>{label}</span>
                      {isSelected && (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 px-4">
            <p className="text-white/60 font-mono text-sm mb-4">No projects found in this category.</p>
            <button
              onClick={() => setActiveFilter('All')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors cursor-pointer"
            >
              Show All Projects
            </button>
          </div>
        ) : (
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredProjects.map((project, index) => {
              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  onMouseMove={(e) => handleCardMouseMove(e, index)}
                  onMouseLeave={() => handleCardMouseLeave(index)}
                  className="group relative rounded-3xl p-[1px] bg-linear-to-b from-white/15 via-white/5 to-transparent hover:from-white/30 hover:to-white/10 transition-colors duration-400 cursor-pointer shadow-lg hover:shadow-xl"
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  aria-label={`View details for ${project.title}`}
                >
                  <div className="relative h-full rounded-[23px] bg-zinc-950/70 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden border border-white/5 group-hover:border-white/15 transition-colors duration-300">
                    {/* Card Top: Visual Image Showcase with Clean Default White Background */}
                    <div>
                      <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden bg-white border border-white/20 mb-6 flex items-center justify-center p-4 sm:p-6 group-hover:border-white/40 transition-all duration-300 shadow-sm">
                        {/* Project Image on clean white backdrop */}
                        <img
                          src={project.image}
                          alt={project.title}
                          className="relative z-10 max-h-full max-w-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-black/80 backdrop-blur-md text-white border border-white/20 shadow-sm">
                            {project.category}
                          </span>
                        </div>

                        {project.year && (
                          <div className="absolute top-3 right-3 z-20">
                            <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-black/80 backdrop-blur-md text-white/90 border border-white/20 shadow-sm">
                              {project.year}
                            </span>
                          </div>
                        )}

                        {/* Decent subtle hover indicator */}
                        <div className="absolute inset-0 z-20 bg-black/25 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                          <span className="px-4 py-2 rounded-full bg-zinc-900/95 text-white text-xs font-medium tracking-wide flex items-center gap-2 border border-white/20 shadow-xl transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                            <span>Inspect Project</span>
                            <svg className="w-3.5 h-3.5 text-[#BAFDDB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </span>
                        </div>
                      </div>

                      {/* Card Middle: Title, Subtitle & Description */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-['Space_Grotesk'] font-semibold tracking-tight text-white text-2xl sm:text-3xl group-hover:text-[#BAFDDB] transition-colors duration-300">
                            {project.title}
                          </h3>
                          <div className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 group-hover:text-white group-hover:bg-white/10 transition-all duration-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                          </div>
                        </div>

                        {project.subtitle && (
                          <p className="text-xs sm:text-sm font-mono text-teal-300/80">
                            {project.subtitle}
                          </p>
                        )}

                        <p className="text-sm text-white/70 line-clamp-2 font-light leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Bottom: Tech Tags and Quick Actions */}
                    <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-4">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {(project.tags || []).slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-white/75 border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                        {(project.tags || []).length > 4 && (
                          <span className="px-2 py-1 rounded-md text-xs font-mono text-white/40 bg-white/5">
                            +{project.tags.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Action row with Magnetic Code Button */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-mono text-white/50 group-hover:text-white/80 transition-colors flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#BAFDDB]" />
                          Click to view details & code
                        </span>

                        {project.codeUrl && (
                          <MagneticElement
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/10 hover:border-white/25 transition-colors"
                            title="View Source Code"
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            <span>Code</span>
                          </MagneticElement>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* DETAILED PROJECT MODAL / POP-UP */}
      {/* ========================================================================= */}
      {selectedProject && (
        <div
          ref={modalOverlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          {/* Modal Container */}
          <div
            ref={modalBoxRef}
            className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative z-10 flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-zinc-950/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-white/70">
                  {selectedProject.category}
                </span>
                {selectedProject.year && (
                  <span className="text-xs font-mono text-white/40 hidden sm:inline">
                    • {selectedProject.year}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-white/40 hidden sm:inline">
                  ESC to close
                </span>
                <MagneticElement
                  onClick={closeModal}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close project modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </MagneticElement>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="relative z-10 overflow-y-auto px-6 sm:px-8 py-6 sm:py-8 space-y-6 max-h-[calc(90vh-145px)]">
              <div ref={modalContentRef} className="space-y-6">
                {/* Visual Showcase + Title banner */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Left: Image Card with Pure White Background */}
                  <div className="lg:col-span-5 relative w-full aspect-square sm:aspect-16/10 lg:aspect-square rounded-2xl bg-white border border-white/20 overflow-hidden flex items-center justify-center p-6 shadow-sm">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="relative z-10 max-h-full max-w-full object-contain object-center"
                    />
                  </div>

                  {/* Right: Title, Subtitle & Quick Overview */}
                  <div className="lg:col-span-7 space-y-4">
                    <h3
                      id="modal-project-title"
                      className="font-['Space_Grotesk'] font-semibold tracking-tight text-white text-3xl sm:text-4xl"
                    >
                      {selectedProject.title}
                    </h3>

                    {selectedProject.subtitle && (
                      <p className="text-sm sm:text-base font-mono text-[#BAFDDB]">
                        {selectedProject.subtitle}
                      </p>
                    )}

                    <p className="text-base text-white/80 leading-relaxed font-light">
                      {selectedProject.longDescription || selectedProject.description}
                    </p>

                    {selectedProject.role && (
                      <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm font-mono text-white/60">
                        <span className="text-white/40">Role:</span>
                        <span className="text-purple-300 font-medium">{selectedProject.role}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tech Stack */}
                {selectedProject.tags && selectedProject.tags.length > 0 && (
                  <div className="pt-2">
                    <h4 className="font-['Space_Grotesk'] font-semibold tracking-tight text-white text-xs font-mono uppercase tracking-widest text-white/50 mb-3">
                      Technologies & Tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-white/90 border border-white/10 hover:border-white/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Sticky Footer / Action Bar */}
            <div className="relative z-10 px-6 sm:px-8 py-4 sm:py-5 border-t border-white/10 bg-zinc-950/95 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Prev / Next Switcher */}
              <div className="flex items-center gap-2 order-2 sm:order-1">
                <MagneticElement
                  onClick={() => navigateProject(-1)}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white text-xs font-medium border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Previous Project"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Prev</span>
                </MagneticElement>
                <MagneticElement
                  onClick={() => navigateProject(1)}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white text-xs font-medium border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Next Project"
                >
                  <span>Next</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </MagneticElement>
              </div>

              {/* Action Buttons: View Code & Live Preview */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end order-1 sm:order-2">
                {/* Magnetic View Code Button */}
                <MagneticElement
                  href={selectedProject.codeUrl || 'https://github.com/shubhendugarai'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors shadow-md shadow-white/10 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>View Code</span>
                </MagneticElement>

                {/* Optional Live Demo Link */}
                {selectedProject.liveUrl && (
                  <MagneticElement
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/15 hover:border-white/25 transition-colors cursor-pointer"
                  >
                    <span>Live Demo</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </MagneticElement>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
