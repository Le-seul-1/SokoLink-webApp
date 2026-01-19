import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Onboarding } from './pages/Onboarding';
import { ErrorPage } from './pages/ErrorPage';
import { supabase } from './lib/supabaseClient';

export type Page = 'home' | 'login' | 'register' | 'onboarding' | 'error';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // 1. Vérifier la session active au chargement (ex: après redirection Google)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        // Si l'utilisateur est connecté et était sur login/register, on le redirige
        // Idéalement on vérifierait si c'est la première connexion pour aller sur 'onboarding'
        if (currentPage === 'login' || currentPage === 'register') {
           setCurrentPage('home');
        }
      }
    });

    // 2. Écouter les changements d'état (connexion, déconnexion)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session && (currentPage === 'login' || currentPage === 'register')) {
        setCurrentPage('onboarding'); // Rediriger vers onboarding après connexion
      }
    });

    return () => subscription.unsubscribe();
  }, [currentPage]);

  // Fonction de navigation transmise à toute l'application
  const navigate = (page: Page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigate={navigate} />;
      case 'login':
        return <Login navigate={navigate} />;
      case 'register':
        return <Register navigate={navigate} />;
      case 'onboarding':
        return <Onboarding navigate={navigate} />;
      case 'error':
        return <ErrorPage navigate={navigate} />;
      default:
        return <ErrorPage navigate={navigate} />;
    }
  };

  return (
    <Layout navigate={navigate} currentPage={currentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;