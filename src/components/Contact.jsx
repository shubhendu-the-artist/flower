import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { siteConfig } from '../data/siteConfig';

export default function Contact() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const emailRef = useRef(null);
  const formRef = useRef(null);
  const formFieldsRef = useRef([]);
  const submitBtnRef = useRef(null);
  const socialRef = useRef(null);
  const socialItemsRef = useRef([]);

  const [formData, setFormData] = useState({});
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

  // GSAP animations
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], { y: 30 });
      gsap.set(emailRef.current, { y: 20 });
      gsap.set(formFieldsRef.current, { y: 20 });
      gsap.set(submitBtnRef.current, { y: 20 });
      gsap.set(socialItemsRef.current, { y: 20, x: -10 });

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
        .to(emailRef.current, { y: 0 }, '-=0.3')
        .to(formFieldsRef.current, {
          y: 0,
          stagger: siteConfig.animation.stagger,
        }, '-=0.2')
        .to(submitBtnRef.current, { y: 0 }, '-=0.2')
        .to(socialItemsRef.current, {
          y: 0,
          x: 0,
          stagger: 0.1,
        }, '-=0.3');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would send the data to your backend here
    console.log('Form submitted:', formData);
    
    setFormStatus('success');
    setFormData({});
    
        // Reset status after 3 seconds
        setTimeout(() => setFormStatus('idle'), 3000);
      };

      return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-12 md:py-12 px-6 bg-linear-to-b from-black to-zinc-950"
      aria-labelledby="contact-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            ref={titleRef}
            id="contact-title"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
          >
            {siteConfig.contact.title}
          </h2>
          <p
            ref={subtitleRef}
            className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-light"
          >
            {siteConfig.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Email & Info */}
          <div className="space-y-10">
            {/* Email Card */}
            <div
              ref={emailRef}
              className="p-8 md:p-10 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Direct Email</h3>
              </div>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-2xl md:text-3xl font-light text-white hover:text-white/80 transition-colors break-all block mb-4"
              >
                {siteConfig.contact.email}
              </a>
              <p className="text-white/50 font-light">
                I read every message personally and typically respond within 24 hours.
              </p>
            </div>

            {/* Social Links */}
            <div ref={socialRef} className="space-y-4" role="list" aria-label="Social links">
              {siteConfig.contact.social.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  ref={(el) => { socialItemsRef.current[index] = el; }}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group"
                  role="listitem"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                    {social.icon === 'twitter' && (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                      </svg>
                    )}
                    {social.icon === 'github' && (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    )}
                    {social.icon === 'linkedin' && (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    )}
                    {social.icon === 'mail' && (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-white font-medium group-hover:text-white/80 transition-colors">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="relative">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-8 md:p-10 bg-white/5 rounded-2xl border border-white/10"
              noValidate
            >
              <div className="space-y-6">
                {siteConfig.contact.form.fields.map((field, index) => (
                  <div
                    key={field.name}
                    ref={(el) => { formFieldsRef.current[index] = el; }}
                    className="relative"
                  >
                    <label
                      htmlFor={field.name}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:-translate-y-1/2 peer-focus:text-white/70 peer-focus:text-sm"
                    >
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        placeholder=" "
                        className="peer w-full h-24 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 resize-none px-4 py-4"
                        onChange={handleInputChange}
                        value={formData[field.name] || ''}
                        required={field.required}
                        aria-required={field.required}
                      />
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        placeholder=" "
                        className="peer w-full bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 px-4 py-4"
                        onChange={handleInputChange}
                        value={formData[field.name] || ''}
                        required={field.required}
                        aria-required={field.required}
                      />
                    )}
                    <div className="absolute inset-0 rounded-xl border border-transparent focus-within:border-white/30 pointer-events-none" aria-hidden="true" />
                  </div>
                ))}

                {/* Submit Button */}
                <button
                  ref={submitBtnRef}
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-4 px-8 bg-white text-black font-medium rounded-xl hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {formStatus === 'submitting' ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : formStatus === 'success' ? (
                      <>
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Sent!
                      </>
                    ) : (
                      <>
                        {siteConfig.contact.form.submitLabel}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}