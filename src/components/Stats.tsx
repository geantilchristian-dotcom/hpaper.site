import { STATS } from '../lib/constants';

export default function Stats() {
  return (
    <section className="border-y border-paper-200/70 bg-white">
      <div className="container-x py-10">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center lg:text-left"
              style={{ animation: `fadeUp 0.6s ease-out ${i * 0.1}s both` }}
            >
              <p className="font-display text-4xl font-semibold text-ocean-600 lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-paper-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
