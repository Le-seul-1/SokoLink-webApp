import React, { useState, useEffect, useRef } from 'react';
import { Page } from '../App';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { getPlaceholderImage } from '../utils/images';
import { Search, MapPin, Shirt, Smartphone, Armchair, Car, Utensils, Wrench, Gamepad2, LayoutGrid, ArrowRight, ArrowLeft, Star, Clock, ChevronDown, ChevronUp } from 'lucide-react';

// --- MOCK DATA ---

const CATEGORIES = [
  { id: 'mode', label: 'Mode', icon: Shirt, color: 'bg-orange-100 text-orange-600' },
  { id: 'tech', label: 'High-Tech', icon: Smartphone, color: 'bg-blue-100 text-blue-600' },
  { id: 'maison', label: 'Maison', icon: Armchair, color: 'bg-amber-100 text-amber-600' },
  { id: 'vehicules', label: 'Véhicules', icon: Car, color: 'bg-slate-100 text-slate-600' },
  { id: 'alim', label: 'Alimentation', icon: Utensils, color: 'bg-green-100 text-green-600' },
  { id: 'services', label: 'Services', icon: Wrench, color: 'bg-purple-100 text-purple-600' },
  { id: 'loisirs', label: 'Loisirs', icon: Gamepad2, color: 'bg-pink-100 text-pink-600' },
  { id: 'immo', label: 'Immobilier', icon: MapPin, color: 'bg-indigo-100 text-indigo-600' },
];

// Expanded Mock Data Pool to allow testing of limits (4 and 8)
const ALL_PRODUCTS_POOL: Product[] = [
  { id: '201', title: 'Nike Run', price: 85000, category: 'Mode', image: getPlaceholderImage('Mode', 'Nike'), sellerId: 's5' },
  { id: '202', title: 'Canapé Cuir', price: 450000, category: 'Maison', image: getPlaceholderImage('Maison', 'SofaLeather'), sellerId: 's6' },
  { id: '203', title: 'Manette PS5', price: 75000, category: 'Loisirs', image: getPlaceholderImage('Tech', 'PS5Controller'), sellerId: 's7' },
  { id: '204', title: 'MacBook Air', price: 2500000, category: 'Tech', image: getPlaceholderImage('Tech', 'Laptop'), sellerId: 's8' },
  { id: '205', title: 'Vase Artisanal', price: 25000, category: 'Maison', image: getPlaceholderImage('Maison', 'Vase'), sellerId: 's9' },
  { id: '101', title: 'Montre Connectée', price: 45000, discount: 20, category: 'Tech', image: getPlaceholderImage('Tech', 'Smartwatch'), sellerId: 's1' },
  { id: '102', title: 'Sneakers Sport', price: 35000, discount: 15, category: 'Mode', image: getPlaceholderImage('Mode', 'SneakersRed'), sellerId: 's2' },
  { id: '304', title: 'Moto KTM 390', price: 2500000, isNew: true, category: 'Véhicules', image: getPlaceholderImage('Véhicules', 'Moto'), sellerId: 's10' },
  { id: '305', title: 'Table Basse', price: 65000, category: 'Maison', image: getPlaceholderImage('Maison', 'Table'), sellerId: 's11' },
  { id: '306', title: 'Écouteurs', price: 15000, category: 'Tech', image: getPlaceholderImage('Tech', 'Headphones'), sellerId: 's12' },
  { id: '307', title: 'Robe Été', price: 25000, category: 'Mode', image: getPlaceholderImage('Mode', 'Dress'), sellerId: 's13' },
  { id: '308', title: 'Chaise Bureau', price: 120000, category: 'Maison', image: getPlaceholderImage('Maison', 'Chair'), sellerId: 's14' },
];

interface BuyerDashboardProps {
  navigate: (page: Page) => void;
  navigateToListing?: (type: 'search' | 'category' | 'collection', value: string) => void;
  navigateToProduct?: (product: Product) => void;
  addToCart?: (product: Product) => void;
}

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ navigate, navigateToListing, navigateToProduct, addToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  
  // Carousel State
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  
  const autoScrollRef = useRef<number | null>(null);

  // --- FILTER & LIMIT LOGIC ---

  // 1. Best Sellers (Carousel)
  const filteredBestSellers = selectedLocation === 'all' ? ALL_PRODUCTS_POOL.slice(0, 6) : ALL_PRODUCTS_POOL.slice(0, 4);
  
  // 2. Special Offers (Strict Limit: 4 displayed)
  // Logic: Get all matching offers first to check total count, then slice top 4 for display.
  // For Mock: We treat items with ID starting with '1' or '2' as special offers for demo
  const allSpecialOffers = selectedLocation === 'all' 
     ? ALL_PRODUCTS_POOL 
     : ALL_PRODUCTS_POOL.slice(0, 6); // Mock filtering
  
  const specialOffersLimit = 4;
  const visibleSpecialOffers = allSpecialOffers.slice(0, specialOffersLimit);
  const showSpecialOffersButton = allSpecialOffers.length > specialOffersLimit;


  // 3. New Arrivals (Strict Limit: 8 displayed)
  // For Mock: We treat all pool as new arrivals
  const allNewArrivals = selectedLocation === 'all' 
     ? ALL_PRODUCTS_POOL // 12 items
     : ALL_PRODUCTS_POOL.slice(0, 8); // Mock filtering

  const newArrivalsLimit = 8;
  const visibleNewArrivals = allNewArrivals.slice(0, newArrivalsLimit);
  const showNewArrivalsButton = allNewArrivals.length > newArrivalsLimit;

  // ---------------------------

  const mobileLimit = 7;
  const visibleCategories = isCategoriesExpanded ? CATEGORIES : CATEGORIES.slice(0, mobileLimit);
  const hasMoreCategories = CATEGORIES.length > mobileLimit;

  // Helper for Adaptive Grid Classes
  const getAdaptiveGridClass = (count: number) => {
    if (count === 1) return 'grid-cols-1 max-w-sm mx-auto';
    if (count === 2) return 'grid-cols-1 sm:grid-cols-2';
    if (count === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
  };

  const handleSearch = () => {
    if (searchQuery.trim() && navigateToListing) {
      navigateToListing('search', searchQuery);
    }
  };

  const handleCategoryClick = (catId: string) => {
    if (navigateToListing) {
      navigateToListing('category', catId);
    }
  };

  const handleProductClick = (product: Product) => {
    if (navigateToProduct) {
      navigateToProduct(product);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(window.innerWidth < 768 ? 1 : 3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Infinite Loop Logic
  const extendedItems = [...filteredBestSellers, ...filteredBestSellers.slice(0, itemsPerSlide)];

  const handleNext = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    startAutoScroll(); 
    if (currentIndex >= filteredBestSellers.length) return; 
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    startAutoScroll();
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(filteredBestSellers.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setCurrentIndex(filteredBestSellers.length - 1);
        });
      });
    } else {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    if (currentIndex === filteredBestSellers.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 700); 
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, filteredBestSellers.length]);

  const startAutoScroll = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = window.setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev + 1);
    }, 3000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#01003c] via-[#0a0a5c] to-[#4354ff] text-white pt-10 pb-24 px-4 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
         <div className="max-w-[1200px] mx-auto relative z-10">
           <div className="flex justify-between items-center mb-8 md:mb-12">
            <div>
              <h1 className="text-xl md:text-2xl font-display font-bold">Bonjour, Acheteur 👋</h1>
              <div className="flex items-center gap-1 text-blue-200 text-sm mt-1">
                <MapPin size={14} />
                <span>
                   {selectedLocation === 'all' ? 'Tout Bujumbura' : 
                    selectedLocation === 'zone-a' ? 'Zone A (Muha)' : 
                    selectedLocation === 'zone-b' ? 'Zone B (Mukaza)' : 'Zone C (Ntahangwa)'}
                </span>
              </div>
            </div>
          </div>

            <div className="text-center mb-10">
              <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 tracking-tight leading-tight">
                Trouvez ce qu'il vous faut <br />
                <span className="text-soko-orange">près de chez vous</span>
              </h2>
            </div>

            <div className="bg-white p-2 rounded-2xl shadow-2xl shadow-blue-900/30 max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-2 animate-fade-in-up">
              <div className="flex-grow w-full relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Que recherchez-vous ?" 
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-none focus:ring-0 text-gray-800 placeholder-gray-400 font-body bg-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              
              <div className="hidden md:block w-px h-8 bg-gray-200"></div>
              
              <div className="w-full md:w-auto relative flex items-center">
                 <MapPin className="absolute left-4 text-gray-400" size={18} />
                 <select 
                    className="w-full md:w-40 pl-10 pr-8 py-3 bg-transparent border-none text-gray-600 font-medium focus:ring-0 cursor-pointer appearance-none"
                    value={selectedLocation}
                    onChange={(e) => {
                      setSelectedLocation(e.target.value);
                      setCurrentIndex(0); // Reset carousel
                    }}
                 >
                   <option value="all">Toute la ville</option>
                   <option value="zone-a">Zone A</option>
                   <option value="zone-b">Zone B</option>
                   <option value="zone-c">Zone C</option>
                 </select>
              </div>

              <button onClick={handleSearch} className="w-full md:w-auto bg-soko-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-orange-500/30">
                Rechercher
              </button>
            </div>
         </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 -mt-10 relative z-20 space-y-16 pb-20">
        
        {/* Categories */}
        <section className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-soko-orange"><LayoutGrid size={20} /></span>
              <h2 className="font-display font-bold text-lg text-soko-dark">Explorer par catégories</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
            {visibleCategories.map((cat) => (
              <button onClick={() => handleCategoryClick(cat.id)} key={cat.id} className="group flex flex-col items-center gap-2 md:gap-3 p-1 md:p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center ${cat.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
                  <cat.icon size={20} className="md:w-6 md:h-6" />
                </div>
                <span className="text-[10px] md:text-xs font-medium text-gray-600 group-hover:text-soko-dark text-center truncate w-full">{cat.label}</span>
              </button>
            ))}
            {hasMoreCategories && (
              <button 
                onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
                className="group flex flex-col items-center gap-2 md:gap-3 p-1 md:p-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center bg-gray-100 text-gray-600 group-hover:scale-110 transition-transform duration-300`}>
                  {isCategoriesExpanded ? <ChevronUp size={20} className="md:w-6 md:h-6" /> : <ChevronDown size={20} className="md:w-6 md:h-6" />}
                </div>
                <span className="text-[10px] md:text-xs font-medium text-gray-600 group-hover:text-soko-dark text-center truncate w-full">
                  {isCategoriesExpanded ? 'Voir moins' : 'Tout voir'}
                </span>
              </button>
            )}
          </div>
        </section>

        {/* Best Sellers Carousel */}
        <section className="bg-[#01003c] rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden text-white shadow-2xl shadow-blue-900/20">
           <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="relative z-10">
             <div className="flex justify-between items-center mb-6">
               <div className="flex items-center gap-3">
                 <div className="text-orange-500"><Star size={24} fill="currentColor" /></div>
                 <div>
                    <h2 className="font-display font-bold text-xl md:text-3xl leading-none">Les plus vendus</h2>
                    <p className="text-blue-200 text-xs md:text-sm mt-1 font-light">
                      {selectedLocation === 'all' ? 'Top de la semaine' : `Top en ${selectedLocation}`}
                    </p>
                 </div>
               </div>
               <div className="flex gap-2">
                 <button onClick={handlePrev} className="p-2 rounded-full border border-white/20 hover:bg-white/10 text-white transition-colors"><ArrowLeft size={18} /></button>
                 <button onClick={handleNext} className="p-2 rounded-full border border-white/20 hover:bg-white/10 text-white transition-colors"><ArrowRight size={18} /></button>
               </div>
             </div>

             <div className="relative w-full overflow-hidden h-[280px] md:h-[320px]">
                <div 
                  className={`flex h-full ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
                  style={{ transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)` }}
                >
                  {extendedItems.map((product, index) => {
                    const realIndex = index % filteredBestSellers.length;
                    return (
                    <div 
                      key={`${product.id}-${index}`} 
                      onClick={() => handleProductClick(product)}
                      className={`flex-shrink-0 px-2 h-full ${itemsPerSlide === 1 ? 'w-full' : 'w-1/3'}`}
                    >
                      <div className="group relative h-full rounded-3xl overflow-hidden cursor-pointer bg-white/5 border border-white/10">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#01003c] via-transparent to-transparent"></div>
                        <div className="absolute top-4 left-4 text-7xl font-display font-black text-white/10 italic select-none z-0">
                          {realIndex + 1}
                        </div>
                        <div className="absolute bottom-0 left-0 p-6 w-full z-10">
                          <div className="bg-soko-orange text-white text-[10px] font-bold px-2 py-0.5 rounded w-fit mb-2 shadow-sm">TOP {realIndex + 1}</div>
                          <h3 className="font-display font-bold text-xl mb-1 text-white">{product.title}</h3>
                          <p className="text-blue-200 font-bold">{product.price.toLocaleString()} Fbu</p>
                        </div>
                      </div>
                    </div>
                  )})}
                </div>
             </div>
           </div>
        </section>

        {/* Special Offers (Adaptive Grid, Limited to 4) */}
        <section className="bg-orange-50/50 rounded-[2.5rem] p-8 border border-orange-100">
           <div className="flex justify-between items-end mb-8">
             <div>
               <div className="flex items-center gap-2 text-soko-orange mb-1">
                 <Clock size={18} />
                 <span className="text-sm font-bold uppercase tracking-wider">Temps limité !</span>
               </div>
               <h2 className="font-display font-bold text-3xl text-soko-dark">Offres Spéciales</h2>
               <p className="text-gray-500 text-sm mt-1">Profitez de réductions exclusives.</p>
             </div>
             
             {/* Only show 'See All' if there are more than 4 items */}
             {showSpecialOffersButton && (
               <button 
                 onClick={() => navigateToListing && navigateToListing('collection', 'special-offers')} 
                 className="text-soko-orange font-bold text-sm hover:underline flex items-center gap-1"
               >
                 Voir tout <ArrowRight size={16} />
               </button>
             )}
           </div>

           {/* Adaptive Grid */}
           <div className={`grid gap-6 ${getAdaptiveGridClass(visibleSpecialOffers.length)}`}>
             {visibleSpecialOffers.map(product => (
               <div key={product.id} onClick={() => handleProductClick(product)} className="h-full">
                 <ProductCard product={product} onAddToCart={addToCart} />
               </div>
             ))}
           </div>
        </section>

        {/* New Arrivals (Adaptive Grid, Limited to 8) */}
        <section className="pb-10">
          <div className="flex justify-between items-center mb-8">
             <h2 className="font-display font-bold text-2xl text-soko-dark">Nouvelles Annonces</h2>
             {showNewArrivalsButton && (
               <button 
                 onClick={() => navigateToListing && navigateToListing('collection', 'new-arrivals')}
                 className="text-soko-orange font-bold text-sm hover:underline flex items-center gap-1"
               >
                 Voir tout <ArrowRight size={16} />
               </button>
             )}
          </div>
          
          <div className={`grid gap-6 ${getAdaptiveGridClass(visibleNewArrivals.length)}`}>
             {visibleNewArrivals.map(product => (
               <div key={product.id} onClick={() => handleProductClick(product)} className="h-full">
                 <ProductCard product={product} onAddToCart={addToCart} />
               </div>
             ))}
           </div>
        </section>

      </div>
    </div>
  );
};
