import heroImage from '../assets/hero.png'

// Site configuration - All content easily changeable from here
export const siteConfig = {
  // Brand
  brand: {
    name: 'FlowARE',
    tagline: 'Where design, technology, and a little bit of magic meet.',
  },

  // Navigation
  nav: {
    links: [
      { label: 'Work', href: '#projects' },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
  },

  // Hero/Landing Section
  hero: {
    title: {
      line1: 'ideas into',
      line2: 'digital',
      line3: 'reality.',
    },
    subtitle: 'Build expressive digital experiences where design, technology, and a little bit of magic meet.',
    cta: {
      primary: { label: 'View Work', href: '#projects' },
      secondary: { label: 'Get in Touch', href: '#contact' },
    },
  },

  // Projects Section
  projects: {
    title: 'Selected Work',
    subtitle: 'A collection of digital experiences crafted with care.',
    items: [
      {
        id: 1,
        title: 'Neural Interface',
        category: 'Web Experience',
        description: 'An immersive 3D visualization exploring the intersection of human cognition and machine learning.',
        image: heroImage,
        tags: ['Three.js', 'GSAP', 'React'],
        link: '#',
        featured: true,
      },
      {
        id: 2,
        title: 'Quantum Dashboard',
        category: 'Data Visualization',
        description: 'Real-time quantum computing metrics dashboard with interactive particle simulations.',
        image: heroImage,
        tags: ['D3.js', 'WebGL', 'TypeScript'],
        link: '#',
        featured: false,
      },
      {
        id: 3,
        title: 'Flow State',
        category: 'Creative Tool',
        description: 'A generative art tool that transforms user input into flowing, organic visual compositions.',
        image: heroImage,
        tags: ['Canvas API', 'Web Workers', 'React'],
        link: '#',
        featured: false,
      },
      {
        id: 4,
        title: 'Echo Chamber',
        category: 'Interactive Installation',
        description: 'An audio-reactive installation that visualizes sound waves in real-time 3D space.',
        image: heroImage,
        tags: ['Web Audio API', 'Three.js', 'GSAP'],
        link: '#',
        featured: true,
      },
    ],
  },

  // Contact Section
  contact: {
    title: 'Have something good in mind?',
    subtitle: 'Whether it\'s a new project, a collaboration, or just a hello — my inbox is open.',
    email: 'hello@floware.studio',
    form: {
      fields: [
        { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', required: true },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', required: true },
        { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Project inquiry / Collaboration / Hello', required: false },
        { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell me about your project...', required: true },
      ],
      submitLabel: 'Send Message',
    },
    social: [
      { name: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
      { name: 'GitHub', href: 'https://github.com', icon: 'github' },
      { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
      { name: 'Email', href: 'mailto:hello@floware.studio', icon: 'mail' },
    ],
  },

  // Footer
  footer: {
    copyright: '© 2024 FlowARE. Crafted with intention.',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },

  // Animation settings
  animation: {
    duration: 1.2,
    ease: 'power3.out',
    stagger: 0.1,
  },
};