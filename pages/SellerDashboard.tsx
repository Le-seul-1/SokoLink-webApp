import React from 'react';
import { Page } from '../App';
import { Product } from '../types';
import { Button } from '../components/ui/Button';
import { getPlaceholderImage } from '../utils/images';
import { Plus, TrendingUp, Package, DollarSign, Eye, MoreHorizontal } from 'lucide-react';

// Mock Data for seller's products
const MY_PRODUCTS: Product[] = [
  { id: '1', title: 'Panier Légumes Bio', price: 15000, category: 'Alimentation', image: getPlaceholderImage('Alimentation', 'Legumes'), sellerId: 's1' },
  { id: '7', title: 'Tomates Fraîches', price: 5000, category: 'Alimentation', image: getPlaceholderImage('Alimentation', 'Tomatoes'), sellerId: 's1' },
];

interface SellerDashboardProps {
  navigate: (page: Page) => void;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-100 pt-8 pb-6 px-6">
        <div className="max-w-[1440px] mx-auto flex justify-between items-end">
          <div>
            <p className="text-gray-500 text-sm mb-1">Espace Vendeur</p>
            <h1 className="text-3xl font-display font-bold text-soko-dark">Tableau de bord</h1>
          </div>
          <Button variant="primary" size="sm" className="gap-2 shadow-none">
            <Plus size={18} />
            <span className="hidden sm:inline">Ajouter un produit</span>
          </Button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 mt-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#01003c] text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="flex items-center gap-3 text-blue-200 mb-2">
              <DollarSign size={20} />
              <span className="text-sm font-medium">Revenus (Ce mois)</span>
            </div>
            <div className="text-3xl font-display font-bold">150,000 Fbu</div>
            <div className="mt-4 text-xs bg-white/10 inline-block px-2 py-1 rounded text-green-300">
              +12% vs mois dernier
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 text-gray-500 mb-2">
              <Package size={20} />
              <span className="text-sm font-medium">Produits Actifs</span>
            </div>
            <div className="text-3xl font-display font-bold text-soko-dark">12</div>
            <div className="mt-4 text-xs text-gray-400">
              4 en rupture de stock
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 text-gray-500 mb-2">
              <Eye size={20} />
              <span className="text-sm font-medium">Vues Totales</span>
            </div>
            <div className="text-3xl font-display font-bold text-soko-dark">1.2k</div>
            <div className="mt-4 text-xs text-green-600 flex items-center gap-1">
              <TrendingUp size={12} /> +85 cette semaine
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-display font-bold text-lg text-soko-dark">Vos Produits Récents</h2>
            <button className="text-sm text-soko-blue font-medium hover:underline">Tout voir</button>
          </div>
          
          <div className="divide-y divide-gray-50">
            {MY_PRODUCTS.map((product) => (
              <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-900">{product.title}</h3>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>

                <div className="text-right mr-4 hidden sm:block">
                  <div className="font-bold text-soko-dark">{product.price.toLocaleString()} Fbu</div>
                  <div className="text-xs text-green-600">En stock</div>
                </div>

                <button className="p-2 hover:bg-gray-200 rounded-full text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};