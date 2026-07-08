import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { CONTACT } from '../lib/constants';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', phone: '', email: '', message: '' });
    }, 4000);
  };

  const contactItems = [
    {
      icon: Phone,
      label: 'Téléphone',
      value: CONTACT.phone,
      href: `tel:${CONTACT.phone.replace(/\s/g, '')}`,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: CONTACT.phone,
      href: `https://wa.me/${CONTACT.whatsapp}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    {
      icon: MapPin,
      label: 'Adresse',
      value: CONTACT.address,
      href: '#',
    },
  ];

  return (
    <section id="contact" className="bg-paper-100 py-20 lg:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Contact</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper-900 text-balance sm:text-4xl lg:text-5xl">
            Demandez votre devis maintenant
          </h2>
          <p className="mt-4 text-lg text-paper-600">
            Remplissez le formulaire ou contactez-nous directement. Réponse en moins de 24h.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="card-base group flex items-center gap-4 p-5 hover:-translate-y-0.5 hover:shadow-md"
                  style={{ animation: `slideRight 0.5s ease-out ${i * 0.1}s both` }}
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-ocean-100 transition-colors group-hover:bg-ocean-600">
                    <Icon className="h-6 w-6 text-ocean-600 transition-colors group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-paper-400">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-paper-800">{item.value}</p>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="card-base p-8">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-forest-100">
                  <CheckCircle className="h-8 w-8 text-forest-600" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-paper-900">
                  Demande envoyée !
                </h3>
                <p className="mt-2 text-sm text-paper-600">
                  Nous vous contacterons dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-paper-700">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Votre nom"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-paper-700">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+243 ..."
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-paper-700">
                    Email (optionnel)
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="votre@email.com"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-paper-700">
                    Votre demande
                  </label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Quel type de papier cherchez-vous ? Quantité, format, délai..."
                    rows={5}
                    className="input-field resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  <Send className="h-4 w-4" />
                  Envoyer la demande
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
