import React, { useState } from 'react';
import { Menu, X, Bell, ShoppingCart, User, Settings, LogOut, RefreshCw } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './ui/Button';
import { Footer } from './Footer';
import { Page } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  navigate: (page: Page) => void;
  currentPage: Page;
  cartItemCount?: number;
}

export const Layout: React.FC<LayoutProps> = ({ children, navigate, currentPage, cartItemCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Masquer la navbar principale sur les pages d'auth
  const isAuthPage = ['login', 'register', 'onboarding'].includes(currentPage);
  const isDashboard = ['buyer-dashboard', 'seller-dashboard', 'cart', 'notifications', 'settings', 'listing', 'product-details', 'seller-profile'].includes(currentPage);

  const handleNavigation = (action: string) => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    
    switch (action) {
      case 'about':
        if (currentPage !== 'home') {
          navigate('home');
          setTimeout(() => {
            document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        } else {
          document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'market':
        navigate('listing');
        break;
      case 'sell':
        navigate('register');
        break;
      case 'contact':
        if (currentPage !== 'home') {
          navigate('home');
          setTimeout(() => {
            document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        } else {
          document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'login':
        navigate('login');
        break;
      case 'register':
        navigate('register');
        break;
      case 'home':
        navigate('home');
        break;
      case 'dashboard':
         navigate('buyer-dashboard'); 
         break;
      case 'cart':
         navigate('cart');
         break;
      case 'notifications':
         navigate('notifications');
         break;
      case 'settings':
         navigate('settings');
         break;
      case 'profile':
         navigate('settings');
         break;
      case 'switch_account':
         navigate('login');
         break;
      default:
        navigate('error');
    }
  };

  return (
    <div className="min-h-screen bg-white font-body text-soko-dark flex flex-col overflow-x-hidden">
      {/* ================= NAVBAR (FIXED) ================= */}
      {!isAuthPage && (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-50 transition-all duration-200 shadow-sm">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-20 flex items-center justify-between relative">
            
            {/* 1. Logo (Left) */}
            <button onClick={() => handleNavigation(isDashboard ? 'dashboard' : 'home')} className="flex-shrink-0 hover:opacity-80 transition-opacity text-left">
              <Logo />
            </button>

            {/* 2. Links (Center) - Hidden on mobile, only show on Home */}
            {!isDashboard && (
              <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
                <button onClick={() => handleNavigation('about')} className="text-sm font-medium text-gray-500 hover:text-soko-dark transition-colors font-display">À propos</button>
                <button onClick={() => handleNavigation('market')} className="text-sm font-medium text-gray-500 hover:text-soko-dark transition-colors font-display">Marché</button>
                <button onClick={() => handleNavigation('sell')} className="text-sm font-medium text-gray-500 hover:text-soko-dark transition-colors font-display">Vendre</button>
                <button onClick={() => handleNavigation('contact')} className="text-sm font-medium text-gray-500 hover:text-soko-dark transition-colors font-display">Contact</button>
              </div>
            )}

            {/* 3. Buttons/Icons (Right) */}
            <div className="flex items-center gap-2 md:gap-4">
              
              {/* DASHBOARD ICONS */}
              {isDashboard ? (
                <div className="flex items-center gap-3 md:gap-5">
                   {/* Notifications */}
                   <button 
                      onClick={() => handleNavigation('notifications')}
                      className={`relative text-gray-500 hover:text-soko-dark transition-colors p-1 ${currentPage === 'notifications' ? 'text-soko-orange bg-orange-50 rounded-full' : ''}`}
                    >
                     <Bell size={22} />
                     <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                   </button>
                   
                   {/* Cart */}
                   <button 
                      onClick={() => handleNavigation('cart')}
                      className={`relative text-gray-500 hover:text-soko-dark transition-colors p-1 mr-1 ${currentPage === 'cart' ? 'text-soko-orange bg-orange-50 rounded-full' : ''}`}
                    >
                     <ShoppingCart size={22} />
                     {cartItemCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-soko-orange text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white animate-fade-in-up">
                          {cartItemCount}
                        </span>
                     )}
                   </button>
                   
                   {/* Profile Dropdown */}
                   <div className="relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsProfileOpen(!isProfileOpen);
                        }}
                        className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden hover:ring-2 hover:ring-soko-orange/20 transition-all focus:outline-none"
                      >
                        <img src="https://ui-avatars.com/api/?name=User&background=01003c&color=fff" alt="Profile" className="w-full h-full object-cover" />
                      </button>

                      {isProfileOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-40 w-screen h-screen cursor-default" 
                            onClick={() => setIsProfileOpen(false)}
                          ></div>
                          
                          <div className="absolute right-0 top-14 w-64 bg-white rounded-xl shadow-xl py-2 text-soko-dark z-50 animate-fade-in-up border border-gray-100 ring-1 ring-black/5">
                            <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-100"></div>
                            
                            <div className="px-4 py-3 border-b border-gray-50 mb-1 relative z-10 bg-white rounded-t-xl">
                              <p className="font-bold text-sm">Mon Compte</p>
                              <p className="text-xs text-gray-500 truncate">user@sokolink.com</p>
                            </div>
                            
                            <button 
                              onClick={() => handleNavigation('profile')}
                              className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700 relative z-10"
                            >
                              <User size={18} className="text-gray-400" /> 
                              <span>Mon Profil</span>
                            </button>
                            
                            <button 
                              onClick={() => handleNavigation('switch_account')}
                              className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700 relative z-10"
                            >
                              <RefreshCw size={18} className="text-gray-400" /> 
                              <span>Changer de compte</span>
                            </button>

                            <button 
                              onClick={() => handleNavigation('settings')}
                              className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700 relative z-10"
                            >
                              <Settings size={18} className="text-gray-400" /> 
                              <span>Paramètres</span>
                            </button>

                            <div className="h-px bg-gray-100 my-1"></div>
                            
                            <button 
                              onClick={() => handleNavigation('home')}
                              className="w-full px-4 py-2.5 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-3 relative z-10"
                            >
                              <LogOut size={18} /> 
                              <span>Déconnexion</span>
                            </button>
                          </div>
                        </>
                      )}
                   </div>
                </div>
              ) : (
                <>
                  <div className="hidden md:flex items-center gap-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="bg-gray-50 hover:bg-gray-100 text-gray-600 font-semibold px-6"
                      onClick={() => handleNavigation('login')}
                    >
                      Se connecter
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="px-6 shadow-none"
                      onClick={() => handleNavigation('register')}
                    >
                      Commencer
                    </Button>
                  </div>
                  <button 
                    className="md:hidden p-2 text-gray-800"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </>
              )}
            </div>
          </div>

          {isMenuOpen && !isDashboard && (
            <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-4 shadow-xl md:hidden animate-fade-in-up">
              <Button variant="ghost" fullWidth onClick={() => handleNavigation('login')}>Se connecter</Button>
              <Button variant="primary" fullWidth onClick={() => handleNavigation('register')}>Commencer</Button>
            </div>
          )}
        </nav>
      )}

      {/* Main Container with Padding for Fixed Navbar */}
      <main className={`flex-grow w-full max-w-[100vw] overflow-x-hidden ${!isAuthPage ? 'pt-20' : ''}`}>
        {children}
      </main>

      {/* Global Footer (only if not auth page) */}
      {!isAuthPage && <Footer navigate={navigate} />}
    </div>
  );
};
