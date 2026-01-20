import React from 'react';
import { Page } from '../App';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Star, MapPin, CheckCircle, Package, MessageCircle } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { getPlaceholderImage } from '../utils/images';
import { Product } from '../types';

interface PublicSellerProfileProps {
  navigate: (page: Page) => void;
}

// Mock Seller Products
const SELLER_PRODUCTS: Product[] = [
  { id: '101', title: 'Montre Connectée Pro', price: 45000, discount: 20, category: 'Tech', image: getPlaceholderImage('Tech', 'Smartwatch'), sellerId: 's1' },
  { id: '103', title: 'Casque Audio BT', price: 25000, discount: 10, category: 'Tech', image: getPlaceholderImage('Tech', 'Headphones'), sellerId: 's1' },
];

export const PublicSellerProfile: React.FC<PublicSellerProfileProps> = ({ navigate }) => {
  const whatsappMessage = `Bonjour, je vous contacte via votre profil SokoLink.`;
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-r from-soko-dark to-blue-900 w-full relative">
        <button 
          onClick={() => navigate('buyer-dashboard')} 
          className="absolute top-8 left-8 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 -mt-16 relative z-10">
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
           <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
              <img src="https://ui-avatars.com/api/?name=Tech+Connect&background=01003c&color=fff" alt="Seller" className="w-full h-full rounded-full object-cover" />
           </div>
           
           <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-display font-bold text-soko-dark">TechConnect Bujumbura</h1>
                <CheckCircle size={18} className="text-blue-500 fill-blue-50" />
              </div>
              <p className="text-gray-500 text-sm mb-3">Spécialiste High-Tech & Accessoires</p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                   <Star size={16} fill="currentColor" /> 4.8 <span className="text-gray-400 font-normal">(124 avis)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                   <MapPin size={16} /> Zone B, Mukaza
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                   <Package size={16} /> 45 ventes
                </div>
              </div>
           </div>

           <Button onClick={() => window.open(whatsappLink, '_blank')} className="gap-2">
             <MessageCircle size={18} /> Contacter
           </Button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Sidebar Info */}
           <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                 <h3 className="font-bold text-soko-dark mb-4">À propos</h3>
                 <p className="text-sm text-gray-500 leading-relaxed">
                   Vendeur passionné de technologie basé au centre-ville. Je propose des produits importés de qualité, vérifiés et garantis. Livraison rapide dans tout Bujumbura.
                 </p>
                 <div className="mt-4 pt-4 border-t border-gray-50 text-xs text-gray-400">
                   Membre depuis Oct. 2023
                 </div>
              </div>
           </div>

           {/* Listings */}
           <div className="md:col-span-2">
              <h2 className="font-bold text-xl text-soko-dark mb-6">En vente (2)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {SELLER_PRODUCTS.map(p => (
                   <ProductCard key={p.id} product={p} />
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
