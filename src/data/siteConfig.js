import project1Image from '../assets/project_1.png'
import project2Image from '../assets/project_2.png'

// Site configuration - All content easily changeable from here
export const siteConfig = {
  // Brand
  brand: {
    name: 'shubhendu',
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
      line1: 'glow into',
      line2: 'digital',
      line3: 'reality',
    },
    subtitle: 'Build expressive digital experiences where design, technology, and a little bit of magic meet.',
    cta: {
      primary: { label: 'View Work', href: '#projects' },
      secondary: { label: 'Get in Touch', href: '#contact' },
    },
  },

  // Projects Section - To add a new project, simply append an object to the items array below.
  projects: {
    badge: 'SELECTED WORK',
    title: 'Featured Projects',
    subtitle: 'A curated showcase of intelligent systems, modern web engineering, and interactive digital experiences.',
    filterOptions: ['All', 'Development', 'ML Project', 'GenAI Project'],
    items: [
      {
        id: 'label-lens',
        title: 'LabelLens',
        subtitle: 'AI-Powered Legal Metrology & Compliance Verification Platform',
        category: 'GenAI & Full Stack',
        types: ['Development', 'GenAI Project'],
        year: '2025',
        role: 'Full-Stack & AI Developer',
        description: 'An AI-powered compliance platform that verifies packaging label details against Legal Metrology rules, detecting mandatory declarations such as MRP, Expiry Date, Net Quantity, and Manufacturer details.',
        longDescription: 'LabelLens is an intelligent verification platform engineered to audit product packaging against Legal Metrology compliance standards. Utilizing Gemini OCR and multimodal intelligence, it inspects uploaded labels to instantly determine which mandatory declarations (such as MRP, Expiry Date, Batch Number, Net Quantity, and Manufacturing Information) are present or missing. Backed by the MERN stack with ImageKit cloud storage, LabelLens streamlines compliance verification for brands and regulatory reviewers.',
        tags: ['MERN Stack', 'Gemini OCR', 'ImageKit', 'React', 'Node.js', 'MongoDB', 'Express'],
        image: project1Image,
        accentColor: '#BAFDDB',
        codeUrl: 'https://github.com/shubhendu-the-artist/labellens',
        liveUrl: 'https://labellensapp.onrender.com/',
        featured: true,
      },
      {
        id: 'mindly-predictor',
        title: 'Mindly',
        subtitle: 'ML-Based Mental Health Predictor & Wellness Companion',
        category: 'Machine Learning',
        types: ['Development', 'ML Project'],
        year: '2025',
        role: 'ML Engineer & Developer',
        description: 'A machine learning-driven mental health predictor built with FastAPI to forecast emotional distress, assess cognitive burnout risk, and offer personalized guidance.',
        longDescription: 'Mindly is an accessible mental health assessment and prediction tool powered by trained machine learning algorithms. Built with a high-performance FastAPI backend paired with clean, responsive HTML, CSS, and modern JavaScript, Mindly analyzes user inputs and psychological markers to predict stress and burnout risk, delivering actionable self-care insights and recommendations.',
        tags: ['FastAPI', 'Machine Learning', 'Python', 'HTML5', 'CSS3', 'JavaScript'],
        image: project2Image,
        accentColor: '#ad91ff',
        codeUrl: 'https://github.com/shubhendu-the-artist/mindly',
        liveUrl: 'https://shubhendu-the-artist.github.io/mindly/',
        featured: true,
      },
    ],
  },

  // Contact Section
  contact: {
    title: 'Have something good in mind?',
    subtitle: 'Whether it\'s a new project, a collaboration, or just a hello — my inbox is open.',
    email: 'shubhendu.garai99.9@gmail.com',
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
      { name: 'Instagram', href: 'https://www.instagram.com/the_.subhendu._', icon: 'instagram' },
      { name: 'GitHub', href: 'https://github.com/shubhendu-the-artist', icon: 'github' },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/shubhendu-garai/', icon: 'linkedin' },
    ],
  },

  // Footer
  footer: {
    copyright: '© 2026 Shubhendu\'s Portfolio. Crafted with intention.',
    links: [
      { label: 'Privacy', href: '#privacy' },
      { label: 'Terms', href: '#terms' },
    ],
  },

  // Animation settings
  animation: {
    duration: 1.2,
    ease: 'power3.out',
    stagger: 0.1,
  },
};