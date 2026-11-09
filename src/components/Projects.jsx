import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { siteConfig } from '../data/siteConfig';

export default function Projects() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);

  // GSAP animations
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], { y: 50 });
      gsap.set(cardsRef.current, { y: 40, scale: 0.98 });

      // Scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse',
        },
        defaults: { 
          duration: siteConfig.animation.duration, 
          ease: siteConfig.animation.ease 
        }
      });

      tl.to(titleRef.current, { y: 0 })
        .to(subtitleRef.current, { y: 0 }, '-=0.4')
        .to(cardsRef.current, {
          y: 0,
          scale: 1,
          stagger: siteConfig.animation.stagger,
        }, '-=0.3');

      // Hover animations for cards
      cardsRef.current.forEach((card) => {
        if (!card) return;
        
        const image = card.querySelector('.project-image');
        const content = card.querySelector('.project-content');
        const tags = card.querySelectorAll('.project-tag');
        const link = card.querySelector('.project-link');

        card.addEventListener('mouseenter', () => {
          gsap.to(image, { scale: 1.05, duration: 0.5, ease: 'power2.out' });
          gsap.to(content, { y: -5, duration: 0.3, ease: 'power2.out' });
          gsap.to(tags, { y: -3, opacity: 1, stagger: 0.05, duration: 0.3, ease: 'power2.out' });
          gsap.to(link, { x: 5, duration: 0.3, ease: 'power2.out' });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(image, { scale: 1, duration: 0.5, ease: 'power2.out' });
          gsap.to(content, { y: 0, duration: 0.3, ease: 'power2.out' });
          gsap.to(tags, { y: 0, opacity: 0.7, stagger: 0.05, duration: 0.3, ease: 'power2.out' });
          gsap.to(link, { x: 0, duration: 0.3, ease: 'power2.out' });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 md:py-32 px-6 bg-black"
      aria-labelledby="projects-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            ref={titleRef}
            id="projects-title"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
          >
            {siteConfig.projects.title}
          </h2>
          <p
            ref={subtitleRef}
            className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-light"
          >
            {siteConfig.projects.subtitle}
          </p>
        </div>

        {/* Projects Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          role="list"
          aria-label="Projects"
        >
          {siteConfig.projects.items.map((project, index) => (
            <article
              key={project.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500"
              role="listitem"
            >
              {/* Project Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div
                  className="project-image absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent transition-transform duration-500 ease-out"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  aria-hidden="true"
                />
                {project.featured && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-sm text-white/80 text-xs font-medium rounded-full border border-white/20">
                    Featured
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Project Content */}
              <div className="project-content p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Project tags">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="project-tag text-xs px-3 py-1 bg-white/5 text-white/60 rounded-full border border-white/10 transition-all duration-300 opacity-70"
                      role="listitem"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-white/60 leading-relaxed mb-6 font-light">
                  {project.description}
                </p>

                <a
                  href={project.link}
                  className="project-link inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-all duration-300"
                  aria-label={`View ${project.title} project`}
                >
                  View Project
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}