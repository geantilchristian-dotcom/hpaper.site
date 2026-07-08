import { useEffect, useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  ArrowLeft,
  X,
  Package,
  Loader2,
  Save,
  Search,
} from 'lucide-react';
import { supabase, type Product, type ProductInput } from '../lib/supabase';
import { CATEGORIES } from '../lib/constants';

type Props = {
  onLogout: () => void;
  onBack: () => void;
};

const EMPTY_FORM: ProductInput = {
  name: '',
  category: '',
  price: '',
  description: '',
  image: '',
};

export default function AdminDashboard({ onLogout, onBack }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductInput>(EMPTY_FORM);
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setProducts(data as Product[]);
    }
    setLoading(false);
  };

  const openCreateForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price || '',
      description: product.description,
      image: product.image || '',
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.description) return;

    setSaving(true);
    if (editingId) {
      await supabase.from('products').update(form).eq('id', editingId);
    } else {
      await supabase.from('products').insert(form);
    }
    setSaving(false);
    closeForm();
    loadProducts();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('products').delete().eq('id', id);
    setConfirmDelete(null);
    loadProducts();
  };

  const filtered = products.filter(
    (p) =>
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-paper-100">
      <header className="sticky top-0 z-30 border-b border-paper-200 bg-paper-50/90 backdrop-blur-xl">
        <div className="container-x flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display text-2xl font-semibold text-ocean-600">H</span>
            <span className="text-lg font-bold text-paper-900">Admin</span>
            <span className="hidden rounded-full bg-ocean-100 px-3 py-1 text-xs font-bold text-ocean-700 sm:inline">
              Tableau de bord
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="btn-ghost"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Voir le site</span>
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container-x py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold text-paper-900">
              Gestion des articles
            </h1>
            <p className="mt-1 text-sm text-paper-500">
              {products.length} article{products.length > 1 ? 's' : ''} dans le catalogue
            </p>
          </div>
          <button onClick={openCreateForm} className="btn-primary">
            <Plus className="h-4 w-4" />
            Nouvel article
          </button>
        </div>

        <div className="mt-6 relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-paper-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="input-field pl-10"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-ocean-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-paper-300 py-20 text-center">
            <Package className="h-12 w-12 text-paper-300" />
            <p className="mt-4 text-paper-500">
              {search ? 'Aucun article trouvé.' : 'Aucun article publié pour le moment.'}
            </p>
            {!search && (
              <button onClick={openCreateForm} className="btn-primary mt-4">
                <Plus className="h-4 w-4" />
                Ajouter un article
              </button>
            )}
          </div>
        ) : (
          <div className="mt-6 grid gap-4">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="card-base flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
                style={{ animation: `fadeUp 0.4s ease-out ${i * 0.05}s both` }}
              >
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-paper-100">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Package className="h-6 w-6 text-paper-300" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-paper-900">{product.name}</h3>
                    <span className="rounded-full bg-ocean-50 px-2.5 py-0.5 text-xs font-bold text-ocean-700">
                      {product.category}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-paper-500 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="mt-1 text-sm font-bold text-ocean-600">
                    {product.price || 'Prix sur demande'}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditForm(product)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-paper-100 text-paper-700 transition-colors hover:bg-ocean-100 hover:text-ocean-700"
                    aria-label="Modifier"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(product.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors hover:bg-red-100"
                    aria-label="Supprimer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-paper-900/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="w-full max-w-lg animate-fade-up rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-paper-900">
                {editingId ? 'Modifier' : 'Nouvel article'}
              </h2>
              <button
                onClick={closeForm}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-paper-500 transition-colors hover:bg-paper-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-paper-700">
                  Nom de l'article
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ex: Papier A4 80g"
                  className="input-field"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-paper-700">
                  Catégorie
                </label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="input-field"
                >
                  <option value="">Choisir une catégorie</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-paper-700">
                  Prix ou indication
                </label>
                <input
                  type="text"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="Ex: Sur devis, 5$ le rame..."
                  className="input-field"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-paper-700">
                  Lien image (optionnel)
                </label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                  className="input-field"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-paper-700">
                  Description
                </label>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Description de l'article"
                  rows={4}
                  className="input-field resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm} className="btn-secondary flex-1">
                  Annuler
                </button>
                <button type="submit" disabled={saving} className="btn-primary flex-1">
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {editingId ? 'Modifier' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-paper-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm animate-scale-in rounded-3xl bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="h-7 w-7 text-red-600" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-paper-900">
              Supprimer cet article ?
            </h3>
            <p className="mt-1 text-sm text-paper-500">Cette action est irréversible.</p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="btn-secondary flex-1"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-red-700 active:scale-95"
              >
                <Trash2 className="h-4 w-4" />
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
