import { MessageCircle } from 'lucide-react';
import { CONTACT } from '../lib/constants';

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${CONTACT.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-forest-500 px-5 py-3.5 font-bold text-white shadow-xl shadow-forest-500/40 transition-all duration-300 hover:bg-forest-600 hover:shadow-2xl hover:shadow-forest-500/50 active:scale-95"
      aria-label="Contact WhatsApp"
    >
      <MessageCircle className="h-5 w-5 animate-pulse-soft" />
      <span className="hidden text-sm sm:inline">WhatsApp</span>
    </a>
  );
}
