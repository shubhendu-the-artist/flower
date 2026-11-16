import { useState, useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'terms' | null

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModal(null);
    };

    if (activeModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModal]);

  const closeModal = () => setActiveModal(null);

  const handleLinkClick = (e, label) => {
    e.preventDefault();
    if (label.toLowerCase().includes('privacy')) {
      setActiveModal('privacy');
    } else if (label.toLowerCase().includes('term')) {
      setActiveModal('terms');
    }
  };

  return (
    <>
      <footer className="py-12 px-6 bg-black border-t border-white/10" role="contentinfo">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p className="text-white/80 text-sm font-light">
              {siteConfig.footer.copyright}
            </p>

            {/* Footer Links */}
            <nav className="flex items-center gap-6" aria-label="Footer navigation">
              {siteConfig.footer.links.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={(e) => handleLinkClick(e, link.label)}
                  className="text-white/80 text-sm hover:text-white transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Back to top */}
            <a
              href="#hero"
              className="p-2 bg-white/5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
              aria-label="Back to top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* Modal Popup for Privacy & Terms */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="footer-modal-title"
        >
          <div
            className="relative w-full max-w-lg max-h-[85vh] flex flex-col bg-zinc-950 border border-white/15 rounded-2xl shadow-2xl p-6 md:p-8 text-white overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <h3
                  id="footer-modal-title"
                  className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-white"
                >
                  {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                </h3>
                <p className="text-xs text-white/50 mt-1">
                  {activeModal === 'privacy' ? 'How your information is protected' : 'Rules and site guidelines'}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="p-2 -mr-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
                aria-label="Close dialog"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto py-5 pr-2 space-y-5 text-sm text-white/70 leading-relaxed font-light">
              {activeModal === 'privacy' ? (
                <>
                  <div>
                    <h4 className="text-white font-medium mb-1">1. Information Collection</h4>
                    <p>
                      When you submit the contact form, we collect your name, email address, inquiry subject, and message. This information is gathered solely to respond to your inquiry.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">2. Data Usage & Security</h4>
                    <p>
                      Your information is directly dispatched via EmailJS to our email inbox ({siteConfig.contact.email}). We never sell, lease, or share your information with advertisers or third parties.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">3. Cookies & Analytics</h4>
                    <p>
                      This website does not use tracking cookies, behavioral profiling, or advertising trackers. All 3D graphics and interactions run locally in your web browser.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">4. Questions & Contact</h4>
                    <p>
                      For any questions or data requests, please feel free to email{' '}
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-white underline hover:text-white/80">
                        {siteConfig.contact.email}
                      </a>.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="text-white font-medium mb-1">1. Acceptance of Terms</h4>
                    <p>
                      By accessing this portfolio, you agree to these terms. This website is presented to exhibit creative engineering, machine learning applications, and interactive web experiences created by Shubhendu.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">2. Intellectual Property</h4>
                    <p>
                      All original codebase, designs, branding, and presentation materials remain the intellectual property of Shubhendu, unless explicitly released under open-source licenses on GitHub.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">3. Permitted Usage</h4>
                    <p>
                      You are welcome to browse, inspect, and evaluate this portfolio for recruitment, personal, or educational review. Automated scraping, malicious probing, or unauthorized cloning is strictly prohibited.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">4. Disclaimer</h4>
                    <p>
                      This website and all interactive demonstrations are provided on an &quot;as-is&quot; basis without warranties of any kind.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="py-2.5 px-6 bg-white text-black font-medium text-sm rounded-xl hover:bg-white/90 transition-all cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}