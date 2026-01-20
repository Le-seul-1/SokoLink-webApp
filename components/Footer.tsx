import React from 'react';
import { Page } from '../App';

interface FooterProps {
  navigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-white pb-12 pt-16 border-t border-gray-100 text-sm mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
         <div className="col-span-1">
           <h4 className="font-display font-bold mb-4 text-soko-dark text-lg">SOKOLINK</h4>
           <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
             La marketplace locale nouvelle génération à Bujumbura. Simple. Rapide. Sécurisée.
           </p>
         </div>
         <div>
           <h4 className="font-bold mb-4 text-soko-dark">Plateforme</h4>
           <ul className="space-y-3 text-gray-500 text-xs">
             <li><button onClick={() => navigate('home')} className="hover:text-soko-orange transition-colors">Accueil</button></li>
             <li><button onClick={() => navigate('listing')} className="hover:text-soko-orange transition-colors">Explorer les produits</button></li>
             <li><button onClick={() => navigate('register')} className="hover:text-soko-orange transition-colors">Vendre sur SokoLink</button></li>
           </ul>
         </div>
         <div>
           <h4 className="font-bold mb-4 text-soko-dark">Support</h4>
           <ul className="space-y-3 text-gray-500 text-xs">
             <li><button onClick={() => navigate('settings')} className="hover:text-soko-orange transition-colors">Centre d'aide</button></li>
             <li><button className="hover:text-soko-orange transition-colors">Règles de communauté</button></li>
             <li><button className="hover:text-soko-orange transition-colors">Sécurité</button></li>
           </ul>
         </div>
         <div>
           <h4 className="font-bold mb-4 text-soko-dark">Contact & Légal</h4>
           <ul className="space-y-3 text-gray-500 text-xs">
             <li className="flex items-center gap-2">contact@sokolink.com</li>
             <li>+257 69 00 00 00</li>
             <li><button className="hover:text-soko-orange transition-colors">Mentions légales</button></li>
           </ul>
         </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4 border-t border-gray-50 pt-8">
        <div>© 2025 SOKOLINK. Tous droits réservés.</div>
        <div className="flex gap-6">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Muha</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Mukaza</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Ntahangwa</span>
        </div>
      </div>
    </footer>
  );
};
