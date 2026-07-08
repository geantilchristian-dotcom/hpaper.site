import { MessageCircle } from 'lucide-react';
import { CONTACT } from '../lib/constants';

export default function Footer() {
  return (
    <footer className="bg-paper-900 text-paper-300">
      <div className="container-x py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a href="#accueil" className="flex items-baseline gap-0.5">
              <span className="font-display text-3xl font-semibold text-ocean-400">H</span>
              <span className="text-2xl font-bold text-white">paper</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper-400">
              Vente de toutes sortes de papiers professionnels. Fournisseur d'entreprises, écoles,
              imprimeries et organisations à Bukavu, RDC.
            </p>
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-forest-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-forest-700"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: '#accueil', label: 'Accueil' },
                { href: '#produits', label: 'Produits' },
                { href: '#services', label: 'Services' },
                { href: '#apropos', label: 'À propos' },
                { href: '#contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-paper-400 transition-colors hover:text-ocean-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-paper-400">
              <li>{CONTACT.phone}</li>
              <li>{CONTACT.email}</li>
              <li>{CONTACT.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-paper-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Hpaper. Tous droits réservés.</p>
          <p>Vente de papiers professionnels</p>
        </div>
      </div>
    </footer>
  );
}
