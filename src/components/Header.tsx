import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { CONTACT } from '../lib/constants';

const NAV_LINKS = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#produits', label: 'Produits' },
  { href: '#services', label: 'Services' },
  { href: '#apropos', label: 'À propos' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-paper-200/70 bg-paper-50/85 backdrop-blur-xl shadow-sm'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between lg:h-20">
        <a
          href="#accueil"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#accueil');
          }}
          className="flex items-baseline gap-0.5 text-2xl font-extrabold tracking-tight text-paper-900 transition-transform hover:scale-105"
        >
          <span className="font-display text-3xl text-ocean-600">H</span>
          <span className="font-semibold text-paper-800">paper</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="group relative px-4 py-2 text-sm font-semibold text-paper-700 transition-colors hover:text-ocean-600"
            >
              {link.label}
              <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-ocean-600 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 text-sm font-semibold text-paper-700 transition-colors hover:text-ocean-600"
          >
            <Phone className="h-4 w-4" />
            {CONTACT.phone}
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="btn-primary"
          >
            Demander un devis
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-paper-800 transition-colors hover:bg-paper-100 lg:hidden"
          aria-label="Menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-paper-200/70 bg-paper-50/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container-x flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="rounded-lg px-4 py-3 text-sm font-semibold text-paper-700 transition-colors hover:bg-ocean-50 hover:text-ocean-600"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="btn-primary mt-2"
          >
            Demander un devis
          </a>
        </nav>
      </div>
    </header>
  );
}
