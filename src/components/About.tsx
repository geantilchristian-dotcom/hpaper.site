import { CheckCircle, Users } from 'lucide-react';
import { CLIENTS } from '../lib/constants';

export default function About() {
  return (
    <section id="apropos" className="py-20 lg:py-28">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div className="animate-fade-up">
            <p className="section-eyebrow">À propos de nous</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper-900 text-balance sm:text-4xl lg:text-5xl">
              Hpaper, spécialiste de la vente de papiers
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-paper-600">
              Hpaper est une entreprise spécialisée dans la fourniture de papiers pour les besoins
              bureautiques, scolaires, commerciaux, administratifs et professionnels.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-paper-600">
              Notre mission est simple : aider les entreprises, écoles, imprimeries, commerces,
              églises et organisations à trouver rapidement le papier adapté à leurs travaux.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                'Stock régulier',
                'Devis gratuit',
                'Conseils personnalisés',
                'Livraison locale',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-forest-500" />
                  <span className="text-sm font-medium text-paper-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-scale-in">
            <div className="card-base p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ocean-100">
                  <Users className="h-6 w-6 text-ocean-600" />
                </div>
                <h3 className="font-display text-xl font-semibold text-paper-900">
                  Nos clients
                </h3>
              </div>

              <ul className="mt-6 space-y-3">
                {CLIENTS.map((client, i) => (
                  <li
                    key={client}
                    className="flex items-center gap-3 rounded-xl border border-paper-100 bg-paper-50 px-4 py-3 transition-colors hover:border-ocean-200 hover:bg-ocean-50"
                    style={{ animation: `slideRight 0.4s ease-out ${i * 0.08}s both` }}
                  >
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-ocean-600 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-paper-800">{client}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
