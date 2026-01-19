import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './ui/Button';
import { Page } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  navigate: (page: Page) => void;
  currentPage: Page;
}

export const Layout: React.FC<LayoutProps> = ({ children, navigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Masquer la navbar sur les pages de login, register et onboarding
  const showNavbar = !['login', 'register', 'onboarding'].includes(currentPage);

  const handleNavigation = (action: string) => {
    setIsMenuOpen(false);
    
    switch (action) {
      case 'about':
        if (currentPage !== 'home') {
          navigate('home');
          setTimeout(() => {
            const el = document.getElementById('how-it-works');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          const el = document.getElementById('how-it-works');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'market':
        navigate('register');
        break;
      case 'sell':
        navigate('register');
        break;
      case 'contact':
        if (currentPage !== 'home') {
          navigate('home');
          setTimeout(() => {
            const el = document.getElementById('footer');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          const el = document.getElementById('footer');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
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
      default:
        navigate('error');
    }
  };

  const navLinks = [
    { name: 'À propos', action: 'about' },
    { name: 'Marché', action: 'market' },
    { name: 'Vendre', action: 'sell' },
    { name: 'Contact', action: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-white font-body text-soko-dark flex flex-col">
      {/* ================= NAVBAR ================= */}
      {showNavbar && (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-50">
          <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
            
            {/* 1. Logo (Left) */}
            <button onClick={() => handleNavigation('home')} className="flex-shrink-0 hover:opacity-80 transition-opacity text-left">
              <Logo />
            </button>

            {/* 2. Links (Center) - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
              {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => handleNavigation(link.action)}
                  className="text-sm font-medium text-gray-500 hover:text-soko-dark transition-colors font-display"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* 3. Buttons (Right) - Hidden on mobile */}
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

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-4 shadow-xl md:hidden">
              {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => handleNavigation(link.action)}
                  className="text-lg font-medium text-gray-800 py-2 text-left"
                >
                  {link.name}
                </button>
              ))}
              <div className="h-px bg-gray-100 my-2"></div>
              <Button variant="ghost" fullWidth onClick={() => handleNavigation('login')}>Se connecter</Button>
              <Button variant="primary" fullWidth onClick={() => handleNavigation('register')}>Commencer</Button>
            </div>
          )}
        </nav>
      )}

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};