import React, { useState } from 'react';
import { Page } from '../App';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { getPlaceholderImage } from '../utils/images';
import { ArrowLeft, ChevronDown, Filter, Clock, Star, Zap, Layers } from 'lucide-react';

interface ListingProps {
  navigate: (page: Page) => void;
  config: { type: 'search' | 'category' | 'collection' | 'similar'; value: string; productName?: string };
  onProductClick: (product: Product) => void;
  addToCart: (product: Product) => void;
}

// Expanded Mock Data to demonstrate "See All" functionality
const ALL_MOCK_PRODUCTS: Product[] = [
  { id: '101', title: 'Montre Connectée Pro', price: 45000, discount: 20, category: 'Tech', image: getPlaceholderImage('Tech', 'Smartwatch'), sellerId: 's1' },
  { id: '102', title: 'Sneakers Sport Run', price: 35000, discount: 15, category: 'Mode', image: getPlaceholderImage('Mode', 'Sneakers'), sellerId: 's2' },
  { id: '103', title: 'Casque Audio BT', price: 25000, discount: 10, category: 'Tech', image: getPlaceholderImage('Tech', 'Headphones'), sellerId: 's3' },
  { id: '104', title: 'Sac à dos Urbain', price: 40000, discount: 25, category: 'Mode', image: getPlaceholderImage('Mode', 'Bag'), sellerId: 's4' },
  { id: '105', title: 'Tablette Graphique', price: 150000, discount: 5, category: 'Tech', image: getPlaceholderImage('Tech', 'Tablet'), sellerId: 's5' },
  { id: '201', title: 'Nike Air Max', price: 120000, category: 'Mode', image: getPlaceholderImage('Mode', 'Nike'), sellerId: 's5' },
  { id: '202', title: 'Canapé Cuir', price: 450000, category: 'Maison', image: getPlaceholderImage('Maison', 'Sofa'), sellerId: 's6' },
  { id: '203', title: 'Manette PS5', price: 75000, category: 'Loisirs', image: getPlaceholderImage('Tech', 'PS5'), sellerId: 's7' },
  { id: '204', title: 'MacBook Air', price: 2500000, category: 'Tech', image: getPlaceholderImage('Tech', 'Laptop'), sellerId: 's8' },
  { id: '205', title: 'Vase Artisanal', price: 25000, category: 'Maison', image: getPlaceholderImage('Maison', 'Vase'), sellerId: 's9' },
  { id: '206', title: 'Lunettes Soleil', price: 20000, category: 'Mode', image: getPlaceholderImage('Mode', 'Glasses'), sellerId: 's6' },
  { id: '207', title: 'T-Shirt Cotton', price: 15000, category: 'Mode', image: getPlaceholderImage('Mode', 'TShirt'), sellerId: 's1' },
  { id: '208', title: 'Jean Denim', price: 45000, category: 'Mode', image: getPlaceholderImage('Mode', 'Jeans'), sellerId: 's2' },
  { id: '304', title: 'Moto KTM 390', price: 2500000, isNew: true, category: 'Véhicules', image: getPlaceholderImage('Véhicules', 'Moto'), sellerId: 's10' },
  { id: '305', title: 'Table Basse', price: 65000, category: 'Maison', image: getPlaceholderImage('Maison', 'Table'), sellerId: 's11' },
];

export const Listing: React.FC<ListingProps> = ({ navigate, config, onProductClick, addToCart }) => {
  const [filters, setFilters] = useState({
    price: 'all',
    zone: 'all',
    condition: 'all',
    sort: 'relevance'
  });

  // Local state for quick filters in "New Announcements"
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  // Filter Logic based on Config
  const getFilteredProducts = () => {
    let products = ALL_MOCK_PRODUCTS;

    if (config.type === 'search') {
      products = products.filter(p => p.title.toLowerCase().includes(config.value.toLowerCase()));
    } else if (config.type === 'category') {
      if (config.value !== 'all') {
         products = products.filter(p => p.category.toLowerCase() === config.value.toLowerCase());
      }
    } else if (config.type === 'collection') {
      if (config.value === 'special-offers') {
        // Mock logic: items with discount
        products = products.filter(p => (p.discount || 0) > 0);
      }
      
      // Additional local filtering for "New Announcements" header buttons
      if (config.value === 'new-arrivals') {
          if (activeCategoryFilter !== 'All') {
            products = products.filter(p => p.category === activeCategoryFilter);
          }
      }
    } else if (config.type === 'similar') {
      // Mock logic: Show items of same category or random mix for demo
      // In real app, filter by category of reference product
      products = products.filter(p => p.id !== config.value); // Exclude current
    }
    return products;
  };

  const displayedProducts = getFilteredProducts();
  const isSpecialOffers = config.type === 'collection' && config.value === 'special-offers';
  const isNewArrivals = config.type === 'collection' && config.value === 'new-arrivals';
  const isSimilar = config.type === 'similar';

  // Simple handler for inputs
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const renderHeader = () => {
    if (isSpecialOffers) {
      return (
        <div className="bg-orange-50/70 border-b border-orange-100 pb-8 pt-8 px-4 mb-6">
           <div className="max-w-[1440px] mx-auto">
              <div className="flex items-center gap-2 mb-4">
                 <button onClick={() => navigate('buyer-dashboard')} className="p-2 bg-white rounded-full text-gray-500 hover:text-soko-dark transition-colors shadow-sm">
                   <ArrowLeft size={20} />
                 </button>
                 <span className="text-sm font-bold text-soko-orange uppercase tracking-wider flex items-center gap-1">
                   <Clock size={16} /> Temps limité
                 </span>
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-soko-dark mb-2">
                Offres Spéciales
              </h1>
              <p className="text-gray-600 max-w-xl text-lg">
                Profitez de réductions exclusives sur une sélection de produits de qualité. Stocks limités.
              </p>
           </div>
        </div>
      );
    }

    if (isNewArrivals) {
      return (
        <div className="relative bg-gradient-to-r from-[#01003c] to-[#4354ff] text-white pb-12 pt-10 px-4 mb-6 overflow-hidden">
           {/* Decorative elements */}
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-soko-orange/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

           <div className="max-w-[1440px] mx-auto relative z-10">
              <div className="flex items-center justify-between mb-6">
                 <button onClick={() => navigate('buyer-dashboard')} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm">
                   <ArrowLeft size={20} />
                 </button>
              </div>
              
              <div className="flex items-center gap-2 mb-3 text-soko-orange">
                 <Zap size={20} fill="currentColor" />
                 <span className="font-bold uppercase tracking-wide text-sm">Nouveautés</span>
              </div>
              
              <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-4 leading-tight">
                Nouvelles Annonces
              </h1>
              
              <p className="text-blue-100 text-lg max-w-2xl mb-8 font-light">
                Découvrez les derniers produits ajoutés par la communauté dans votre zone. Soyez le premier à commander.
              </p>

              {/* Functional Category Chips */}
              <div className="flex flex-wrap gap-3">
                 {['All', 'Mode', 'Tech', 'Maison', 'Véhicules'].map((cat) => (
                    <button 
                        key={cat}
                        onClick={() => setActiveCategoryFilter(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                            activeCategoryFilter === cat 
                            ? 'bg-white text-soko-dark shadow-lg scale-105' 
                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                        }`}
                    >
                        {cat === 'All' ? 'Toutes les catégories' : cat}
                    </button>
                 ))}
              </div>
           </div>
        </div>
      );
    }

    if (isSimilar) {
       return (
        <div className="bg-white shadow-sm border-b border-gray-100 pt-8 pb-6 px-4">
          <div className="max-w-[1440px] mx-auto">
             <div className="flex items-center gap-3 mb-6">
                 <button onClick={() => navigate('product-details')} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors -ml-2">
                   <ArrowLeft size={22} />
                 </button>
                 <div>
                   <div className="flex items-center gap-2 text-soko-orange text-xs font-bold uppercase mb-1">
                      <Layers size={14} /> Recommandations
                   </div>
                   <h1 className="font-display font-bold text-2xl text-soko-dark leading-none">
                     Produits similaires à "{config.productName || 'cet article'}"
                   </h1>
                 </div>
             </div>
          </div>
        </div>
      );
    }

    // Default Header
    const title = config.type === 'search' 
      ? `Résultats pour "${config.value}"` 
      : config.value === 'all' ? 'Tous les produits' : config.value.charAt(0).toUpperCase() + config.value.slice(1);

    return (
      <div className="bg-white shadow-sm border-b border-gray-100 pt-8 pb-6 px-4">
        <div className="max-w-[1440px] mx-auto">
           <div className="flex items-center gap-3 mb-6">
               <button onClick={() => navigate('buyer-dashboard')} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors -ml-2">
                 <ArrowLeft size={22} />
               </button>
               <div>
                 <h1 className="font-display font-bold text-2xl text-soko-dark leading-none">{title}</h1>
                 <p className="text-xs text-gray-500 font-medium mt-1">{displayedProducts.length} produits trouvés</p>
               </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {renderHeader()}

      {/* Filters (only show if standard listing or if user wants filters on collections) */}
      <div className="max-w-[1440px] mx-auto px-4 mb-6">
         <div className="flex flex-wrap gap-3 items-center">
            {/* Backend-ready Filters */}
            <div className="relative">
              <select 
                className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-3 pr-8 py-2.5 focus:ring-2 focus:ring-soko-orange/20 focus:border-soko-orange outline-none cursor-pointer font-medium shadow-sm"
                onChange={(e) => handleFilterChange('price', e.target.value)}
                value={filters.price}
              >
                <option value="all">Prix: Tout</option>
                <option value="asc">Prix croissant</option>
                <option value="desc">Prix décroissant</option>
                <option value="under-50k">- 50,000 Fbu</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select 
                className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-3 pr-8 py-2.5 focus:ring-2 focus:ring-soko-orange/20 focus:border-soko-orange outline-none cursor-pointer font-medium shadow-sm"
                onChange={(e) => handleFilterChange('condition', e.target.value)}
                value={filters.condition}
              >
                <option value="all">État: Tout</option>
                <option value="new">Neuf</option>
                <option value="used">Occasion</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select 
                className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-3 pr-8 py-2.5 focus:ring-2 focus:ring-soko-orange/20 focus:border-soko-orange outline-none cursor-pointer font-medium shadow-sm"
                onChange={(e) => handleFilterChange('zone', e.target.value)}
                value={filters.zone}
              >
                <option value="all">Zone: Toutes</option>
                <option value="A">Zone A (Muha)</option>
                <option value="B">Zone B (Mukaza)</option>
                <option value="C">Zone C (Ntahangwa)</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
         </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4">
         {displayedProducts.length > 0 ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up">
              {displayedProducts.map(product => (
                <div key={product.id} onClick={() => onProductClick(product)} className="cursor-pointer h-full">
                  <ProductCard product={product} onAddToCart={addToCart} />
                </div>
              ))}
           </div>
         ) : (
           <div className="text-center py-20">
             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
               <Filter size={24} />
             </div>
             <h3 className="font-bold text-gray-900 mb-2">Aucun résultat trouvé</h3>
             <p className="text-gray-500 text-sm">Essayez de modifier vos filtres ou de changer de catégorie.</p>
           </div>
         )}
      </div>
    </div>
  );
};
