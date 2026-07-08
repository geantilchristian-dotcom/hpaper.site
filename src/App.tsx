import { useEffect, useState } from 'react';
import Storefront from './components/Storefront';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

type View = 'storefront' | 'admin-login' | 'admin-dashboard';

function getInitialView(): View {
  const hash = window.location.hash;
  if (hash === '#admin' || hash === '#/admin') return 'admin-login';
  return 'storefront';
}

export default function App() {
  const [view, setView] = useState<View>(getInitialView);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin' || hash === '#/admin') {
        setView('admin-login');
      } else if (view !== 'storefront') {
        setView('storefront');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [view]);

  const goAdmin = () => {
    window.location.hash = '#admin';
    setView('admin-login');
  };

  const goStorefront = () => {
    window.location.hash = '';
    setView('storefront');
  };

  if (view === 'admin-login') {
    return <AdminLogin onLogin={() => setView('admin-dashboard')} onBack={goStorefront} />;
  }

  if (view === 'admin-dashboard') {
    return <AdminDashboard onLogout={goAdmin} onBack={goStorefront} />;
  }

  return <Storefront />;
}
