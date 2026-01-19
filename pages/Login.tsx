import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Page } from '../App';
import { ArrowLeft, Mail, Lock, AlertCircle } from 'lucide-react';
import { Logo } from '../components/Logo';
import { getAuthImage } from '../utils/images';
import { supabase } from '../lib/supabaseClient';

interface LoginProps {
  navigate: (page: Page) => void;
}

export const Login: React.FC<LoginProps> = ({ navigate }) => {
  const bgImage = getAuthImage('login');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Redirection vers l'URL actuelle après connexion
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setErrorMsg(error.message || "Erreur lors de la connexion Google");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Bouton retour absolu */}
      <button 
        onClick={() => navigate('home')} 
        className="absolute top-8 left-8 z-20 flex items-center gap-2 text-sm text-gray-500 hover:text-soko-dark transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100"
      >
        <ArrowLeft size={16} /> Retour
      </button>

      {/* Left Side - Image/Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-[#01003c] relative items-center justify-center overflow-hidden">
        {/* Utilisation de l'image SVG générée via style inline pour le background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40" 
          style={{ backgroundImage: `url("${bgImage}")` }}
        ></div>
        <div className="relative z-10 p-12 text-white max-w-lg">
           <Logo variant="light" className="mb-8 scale-110 origin-left" />
           <h1 className="text-4xl font-display font-bold mb-6">Bon retour parmi nous.</h1>
           <p className="text-lg text-blue-100/80 leading-relaxed">
             Connectez-vous pour suivre vos commandes, discuter avec vos vendeurs favoris et découvrir les nouveautés de votre zone.
           </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold font-display text-soko-dark mb-2">
              Connexion
            </h2>
            <p className="text-sm text-gray-500">
              Accédez à votre espace SokoLink.
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                <AlertCircle size={16} />
                {errorMsg}
              </div>
            )}

            {/* Google Login Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors bg-white text-gray-700 font-medium text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-gray-300 border-t-soko-orange rounded-full animate-spin"></span>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              {loading ? 'Connexion en cours...' : 'Se connecter avec Google'}
            </button>

            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase">Ou avec email</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail size={20} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none block w-full pl-12 pr-4 py-4 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-soko-orange/20 focus:border-soko-orange transition-all bg-gray-50/50 focus:bg-white"
                  placeholder="Adresse Email"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock size={20} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none block w-full pl-12 pr-4 py-4 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-soko-orange/20 focus:border-soko-orange transition-all bg-gray-50/50 focus:bg-white"
                  placeholder="Mot de passe"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-soko-orange focus:ring-soko-orange border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer select-none">
                  Se souvenir de moi
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-soko-blue hover:text-blue-600 transition-colors">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            <Button variant="primary" fullWidth size="lg" className="shadow-orange-500/25">
              Se connecter
            </Button>
            
            <p className="mt-8 text-center text-sm text-gray-600">
              Pas encore de compte ?{' '}
              <button 
                onClick={() => navigate('register')} 
                className="font-bold text-soko-dark hover:text-soko-orange transition-colors"
              >
                Créer un compte
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};