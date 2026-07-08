import { useEffect, useState } from 'react';
import { Package, Loader2, Search, Filter } from 'lucide-react';
import { supabase, type Product } from '../lib/supabase';
import { CATALOG, CATEGORIES } from '../lib/constants';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('Tous');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      setProducts(data as Product[]);
    }
    setLoading(false);
  };

  const displayProducts =
    products.length > 0
      ? products
      : CATALOG.map((c, i) => ({
          id: `catalog-${i}`,
          name: c.name,
          category: c.category,
          price: 'Sur devis',
          description: c.description,
          image: c.image,
          created_at: new Date().toISOString(),
        }));

  const filtered = displayProducts.filter((p) => {
    const matchCat = activeCategory === 'Tous' || p.category === activeCategory;
    const matchSearch =
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const allCategories = ['Tous', ...CATEGORIES];

  return (
    <section id="produits" className="py-20 lg:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Notre catalogue</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper-900 text-balance sm:text-4xl lg:text-5xl">
            Nos principaux types de papiers
          </h2>
          <p className="mt-4 text-lg text-paper-600">
            Découvrez notre sélection de papiers professionnels pour tous vos besoins.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-paper-400" />
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-ocean-600 text-white shadow-md shadow-ocean-600/25'
                    : 'bg-paper-100 text-paper-600 hover:bg-paper-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-paper-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un papier..."
              className="input-field pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-ocean-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Package className="h-12 w-12 text-paper-300" />
            <p className="mt-4 text-paper-500">Aucun article trouvé pour cette recherche.</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, i) => (
              <article
                key={product.id}
                className="card-base group overflow-hidden hover:-translate-y-1.5 hover:shadow-xl hover:shadow-paper-900/5"
                style={{ animation: `fadeUp 0.5s ease-out ${i * 0.06}s both` }}
              >
                <div className="relative h-48 overflow-hidden bg-paper-100">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-paper-100 to-paper-200">
                      <Package className="h-12 w-12 text-paper-300" />
                    </div>
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ocean-700 backdrop-blur-sm">
                    {product.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-paper-900">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper-600 line-clamp-3">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-paper-100 pt-4">
                    <span className="text-sm font-bold text-ocean-600">
                      {product.price || 'Prix sur demande'}
                    </span>
                    <a
                      href="#contact"
                      className="text-sm font-semibold text-paper-700 transition-colors hover:text-ocean-600"
                    >
                      Demander →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
