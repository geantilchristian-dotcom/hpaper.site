import { Layers, BadgePercent, Zap, Truck } from 'lucide-react';
import { SERVICES } from '../lib/constants';

const ICONS: Record<string, typeof Layers> = {
  Layers,
  BadgePercent,
  Zap,
  Truck,
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-paper-900 py-20 text-white lg:py-28"
    >
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-ocean-600/20 blur-3xl" />
      <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
            Pourquoi choisir Hpaper ?
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Une solution fiable pour vos besoins en papier
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Layers;
            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/30 hover:bg-white/10"
                style={{ animation: `fadeUp 0.6s ease-out ${i * 0.1}s both` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ocean-500 to-ocean-700 shadow-lg shadow-ocean-600/30 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper-300">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
