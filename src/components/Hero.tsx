import { ArrowRight, FileText, Sparkles, Truck } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24"
    >
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-ocean-200/40 blur-3xl" />
      <div className="absolute -left-20 top-40 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />

      <div className="container-x relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-ocean-200 bg-ocean-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-ocean-700">
              <Sparkles className="h-3.5 w-3.5" />
              Fournisseur de papiers professionnels
            </span>

            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-paper-900 text-balance sm:text-5xl lg:text-6xl">
              Hpaper, votre partenaire pour{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-ocean-600">tous types de papiers</span>
                <svg
                  className="absolute -bottom-1 left-0 z-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9C50 4 150 2 298 6"
                    stroke="#fbbf24"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper-600">
              Nous sommes spécialisés dans la vente de toutes sortes de papiers : papiers
              bureautiques, papiers d'impression, papiers cartonnés, papiers photo, papiers
              autocopiants, papiers d'emballage et plus encore.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact" className="btn-primary group">
                Demander un devis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#produits" className="btn-secondary">
                Voir nos produits
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-paper-600">
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-ocean-500" />
                Large choix de papiers
              </span>
              <span className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-ocean-500" />
                Livraison rapide
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-ocean-500" />
                Qualité garantie
              </span>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="relative rounded-3xl bg-gradient-to-br from-paper-900 to-paper-800 p-8 shadow-2xl shadow-paper-900/20">
              <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400 text-2xl font-bold text-paper-900 shadow-lg">
                H
              </div>

              <h3 className="font-display text-2xl font-semibold text-white">
                Qualité • Rapidité • Prix sérieux
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-paper-300">
                Des papiers adaptés aux entreprises, écoles, imprimeries, bureaux, commerces et
                organisations.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  { label: 'Papier bureautique', value: 'A4 / A3' },
                  { label: 'Papier impression', value: 'Couché / Photo' },
                  { label: 'Papier emballage', value: 'Kraft' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 transition-colors hover:bg-white/10"
                  >
                    <span className="text-sm text-paper-200">{item.label}</span>
                    <span className="text-sm font-bold text-amber-300">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-paper-200 bg-white p-5 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-100">
                  <Truck className="h-6 w-6 text-forest-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-paper-900">Livraison</p>
                  <p className="text-xs text-paper-500">Bukavu & environs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
