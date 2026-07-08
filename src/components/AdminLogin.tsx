import { useState } from 'react';
import { Lock, Mail, ArrowLeft, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { ADMIN_CREDENTIALS } from '../lib/constants';

type Props = {
  onLogin: () => void;
  onBack: () => void;
};

export default function AdminLogin({ onLogin, onBack }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setError('');
      onLogin();
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper-100 px-4">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-ocean-200/40 blur-3xl" />
      <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />

      <div className="relative w-full max-w-md animate-scale-in">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-paper-600 transition-colors hover:text-ocean-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au site
        </button>

        <div className="card-base p-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ocean-600 shadow-lg shadow-ocean-600/30">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>
            <h1 className="mt-5 font-display text-2xl font-semibold text-paper-900">
              Administration Hpaper
            </h1>
            <p className="mt-1 text-sm text-paper-500">Connectez-vous pour gérer le catalogue</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-paper-700">
                Email admin
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-paper-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hpaper.com"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-paper-700">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-paper-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field px-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-paper-400 transition-colors hover:text-paper-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary w-full">
              Se connecter
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-paper-400">
            Accès réservé à l'administrateur du site
          </p>
        </div>
      </div>
    </div>
  );
}
