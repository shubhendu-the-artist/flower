import { siteConfig } from '../data/siteConfig';

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-black border-t border-white/10" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-white/40 text-sm font-light">
            {siteConfig.footer.copyright}
          </p>

          {/* Footer Links */}
          <nav className="flex items-center gap-6" aria-label="Footer navigation">
            {siteConfig.footer.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/40 text-sm hover:text-white/70 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to top */}
          <a
            href="#hero"
            className="p-2 bg-white/5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300"
            aria-label="Back to top"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}