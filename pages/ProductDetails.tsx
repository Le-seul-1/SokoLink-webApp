import React, { useState } from 'react';
import { Page } from '../App';
import { Product } from '../types';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/ProductCard';
import { getPlaceholderImage } from '../utils/images';
import { ArrowLeft, MessageCircle, ShoppingCart, Heart, MapPin, ShieldCheck, Truck, Star, Box, User, Calendar, Award, CheckCircle, ArrowRight, X } from 'lucide-react';

interface ProductDetailsProps {
  navigate: (page: Page) => void;
  product: Product | null;
  navigateToListing: (type: 'search' | 'category' | 'collection' | 'similar', value: string, productName?: string) => void;
  addToCart: (product: Product) => void;
  navigateToProduct: (product: Product) => void;
}

// Expanded Mock Similar Products for logic testing
const ALL_SIMILAR_PRODUCTS: Product[] = [
  { id: 's1', title: 'iPhone 13 Pro', price: 420000, category: 'Tech', image: getPlaceholderImage('Tech', 'iPhone13'), sellerId: 's5' },
  { id: 's2', title: 'Samsung S20 FE', price: 280000, category: 'Tech', image: getPlaceholderImage('Tech', 'S20FE'), sellerId: 's6' },
  { id: 's3', title: 'Google Pixel 6', price: 300000, category: 'Tech', image: getPlaceholderImage('Tech', 'Pixel6'), sellerId: 's7' },
  { id: 's4', title: 'OnePlus 9', price: 320000, category: 'Tech', image: getPlaceholderImage('Tech', 'OnePlus'), sellerId: 's8' },
  { id: 's5', title: 'Sony Xperia', price: 250000, category: 'Tech', image: getPlaceholderImage('Tech', 'Xperia'), sellerId: 's9' },
];

export const ProductDetails: React.FC<ProductDetailsProps> = ({ navigate, product, navigateToListing, addToCart, navigateToProduct }) => {
  const [showProtectionModal, setShowProtectionModal] = useState(false);

  if (!product) return null;

  const whatsappMessage = `Bonjour, je suis intéressé par votre article : ${product.title} (ID: ${product.id}) sur SokoLink.`;
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  // Calcul du prix final
  const finalPrice = product.discount ? product.price * (1 - product.discount/100) : product.price;

  // Filter similar products (Mock logic: just exclude current)
  // In real app, filter by category
  const similarProducts = ALL_SIMILAR_PRODUCTS.filter(p => p.id !== product.id);
  const visibleSimilar = similarProducts.slice(0, 4);
  const hasMoreSimilar = similarProducts.length > 4;

  const handleCategoryClick = () => {
    navigateToListing('category', product.category);
  };

  const handleMainAddToCart = () => {
    addToCart(product);
    navigate('cart'); // Requested: Redirect to cart page
  };

  return (
    <div className="bg-gray-50 min-h-screen relative">
       
       {/* Breadcrumbs & Navigation */}
       <div className="bg-white border-b border-gray-100">
         <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-500">
            <button onClick={() => navigate('buyer-dashboard')} className="hover:text-soko-dark">Accueil</button> 
            <span>/</span>
            <button onClick={handleCategoryClick} className="hover:text-soko-dark hover:underline cursor-pointer font-medium text-gray-600">
              {product.category}
            </button>
            <span>/</span>
            <span className="text-soko-dark font-medium truncate max-w-[200px]">{product.title}</span>
         </div>
       </div>

       <div className="max-w-[1200px] mx-auto px-4 py-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            
            {/* LEFT: Image Gallery */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100 overflow-hidden relative group">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                   <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <button className="absolute top-6 right-6 p-3 bg-white rounded-full shadow-lg text-gray-400 hover:text-red-500 transition-colors z-10">
                   <Heart size={20} />
                </button>
                {product.isNew && (
                  <span className="absolute top-6 left-6 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">NEUF</span>
                )}
              </div>
              
              {/* Thumbnails (Mock) */}
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square rounded-xl bg-white border-2 border-transparent hover:border-soko-orange cursor-pointer overflow-hidden transition-all">
                    <img src={product.image} className="w-full h-full object-cover opacity-80 hover:opacity-100" alt="Thumbnail" />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Product Info */}
            <div className="lg:col-span-5 space-y-6">
               <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 h-full flex flex-col">
                  
                  <div className="mb-1 flex items-center gap-2">
                    <span className="bg-orange-50 text-soko-orange text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">{product.category}</span>
                    <span className="text-gray-400 text-xs">Réf: {product.id.toUpperCase()}-2024</span>
                  </div>

                  <h1 className="text-2xl md:text-3xl font-display font-bold text-soko-dark mb-4 leading-tight">
                    {product.title}
                  </h1>

                  <div className="flex items-end gap-3 mb-6 pb-6 border-b border-gray-50">
                    <span className="text-4xl font-bold text-soko-orange">{finalPrice.toLocaleString()} Fbu</span>
                    {product.discount && (
                       <div className="flex flex-col mb-1">
                          <span className="text-sm text-gray-400 line-through">{product.price.toLocaleString()} Fbu</span>
                          <span className="text-xs text-green-600 font-bold">Économisez {product.discount}%</span>
                       </div>
                    )}
                  </div>

                  {/* Badges Info */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                           <Box size={16} />
                        </div>
                        <div>
                           <p className="text-[10px] text-gray-500 font-bold uppercase">Stock</p>
                           <p className="text-sm font-bold text-soko-dark">Disponible (4)</p>
                        </div>
                     </div>
                     <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 text-soko-orange flex items-center justify-center">
                           <MapPin size={16} />
                        </div>
                        <div>
                           <p className="text-[10px] text-gray-500 font-bold uppercase">Lieu</p>
                           <p className="text-sm font-bold text-soko-dark">Zone B, Mukaza</p>
                        </div>
                     </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 mb-8">
                     <Button 
                        size="lg" 
                        fullWidth 
                        className="font-bold text-lg shadow-orange-500/20"
                        onClick={handleMainAddToCart}
                     >
                        <ShoppingCart size={20} className="mr-2" /> Ajouter au panier
                     </Button>
                     <Button variant="outline" size="lg" fullWidth onClick={() => window.open(whatsappLink, '_blank')} className="font-bold border-2">
                        <MessageCircle size={20} className="mr-2" /> Discuter avec le vendeur
                     </Button>
                  </div>

                  {/* Seller Card */}
                  <div className="mt-auto pt-6 border-t border-gray-50">
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Vendeur</span>
                        <button onClick={() => navigate('seller-profile')} className="text-xs text-soko-blue font-bold hover:underline">Voir le profil</button>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-soko-dark border-2 border-white shadow-md overflow-hidden">
                           <img src={`https://ui-avatars.com/api/?name=${product.sellerId}&background=01003c&color=fff`} alt="Seller" />
                        </div>
                        <div className="flex-grow">
                           <h4 className="font-bold text-soko-dark">TechConnect Bujumbura</h4>
                           <div className="flex items-center gap-1 text-xs text-yellow-500">
                              <Star size={12} fill="currentColor" />
                              <Star size={12} fill="currentColor" />
                              <Star size={12} fill="currentColor" />
                              <Star size={12} fill="currentColor" />
                              <span className="text-gray-400 ml-1 font-medium text-xs text-gray-500">4.8 (124 avis)</span>
                           </div>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="bg-gray-50 rounded-lg p-2 text-center">
                           <p className="font-bold text-soko-dark">2 ans</p>
                           <p className="text-[10px] text-gray-500">Membre</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2 text-center">
                           <p className="font-bold text-soko-dark">98%</p>
                           <p className="text-[10px] text-gray-500">Satisfaction</p>
                        </div>
                     </div>
                  </div>

               </div>
            </div>
          </div>

          {/* Bottom Section: Description & Safety */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
             
             {/* Description */}
             <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-1 h-8 bg-soko-orange rounded-full"></div>
                   <h3 className="font-display font-bold text-xl text-soko-dark">Description du produit</h3>
                </div>
                <div className="prose prose-sm text-gray-600 max-w-none leading-relaxed">
                   <p className="mb-4">
                      Découvrez ce produit exceptionnel de la catégorie {product.category}. Conçu pour répondre à vos exigences de qualité et de durabilité.
                      Idéal pour une utilisation quotidienne, ce produit a été soigneusement vérifié par nos équipes ou nos vendeurs certifiés.
                   </p>
                   <p className="mb-4">
                      Avec des caractéristiques techniques avancées et un design moderne, il s'intègre parfaitement à votre style de vie.
                      N'hésitez pas à contacter le vendeur pour plus de photos ou d'informations spécifiques.
                   </p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                      <div className="bg-gray-50 p-4 rounded-xl">
                         <span className="block text-xs font-bold text-gray-400 mb-1 uppercase">État</span>
                         <span className="font-bold text-soko-dark">{product.isNew ? 'Neuf (Scellé)' : 'Occasion (Très bon état)'}</span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl">
                         <span className="block text-xs font-bold text-gray-400 mb-1 uppercase">Garantie</span>
                         <span className="font-bold text-soko-dark">6 Mois Vendeur</span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl">
                         <span className="block text-xs font-bold text-gray-400 mb-1 uppercase">Livraison</span>
                         <span className="font-bold text-soko-dark">24h - 48h</span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl">
                         <span className="block text-xs font-bold text-gray-400 mb-1 uppercase">Origine</span>
                         <span className="font-bold text-soko-dark">Importé</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* Safety Box */}
             <div className="lg:col-span-1">
                <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100 sticky top-24">
                   <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 bg-white rounded-full text-blue-600 shadow-sm">
                         <ShieldCheck size={24} />
                      </div>
                      <div>
                         <h4 className="font-bold text-soko-dark">Achat Sécurisé SokoLink</h4>
                         <p className="text-xs text-blue-800 mt-1">Vos fonds sont conservés jusqu'à la confirmation de réception.</p>
                      </div>
                   </div>
                   <ul className="space-y-3 text-sm text-gray-600 mb-4 pl-2">
                      <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Vendeur vérifié</li>
                      <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Service client 24/7</li>
                      <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Satisfait ou remboursé</li>
                   </ul>
                   <button 
                     onClick={() => setShowProtectionModal(true)}
                     className="text-xs text-blue-600 font-bold hover:underline block text-center w-full"
                   >
                     En savoir plus sur la protection acheteur
                   </button>
                </div>
             </div>
          </div>

          {/* Similar Products (Limited to 4) */}
          <div className="mb-8">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-display font-bold text-2xl text-soko-dark">Produits similaires</h3>
                {hasMoreSimilar && (
                  <button 
                    onClick={() => navigateToListing('similar', product.id, product.title)}
                    className="text-soko-orange font-bold text-sm hover:underline flex items-center gap-1"
                  >
                    Voir plus <ArrowRight size={16} />
                  </button>
                )}
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleSimilar.map((p) => (
                   <div key={p.id} onClick={() => navigateToProduct(p)} className="cursor-pointer">
                     <ProductCard product={p} onAddToCart={addToCart} />
                   </div>
                ))}
             </div>
          </div>

       </div>

       {/* BUYER PROTECTION MODAL */}
       {showProtectionModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowProtectionModal(false)}></div>
           <div className="bg-white rounded-3xl p-8 max-w-lg w-full relative z-10 shadow-2xl animate-fade-in-up">
             <button onClick={() => setShowProtectionModal(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
               <X size={20} />
             </button>
             
             <div className="flex items-center gap-4 mb-6">
               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                 <ShieldCheck size={32} />
               </div>
               <h2 className="text-2xl font-display font-bold text-soko-dark">Protection Acheteur</h2>
             </div>

             <div className="space-y-4 text-gray-600 mb-8">
               <p>
                 Chez SokoLink, votre tranquillité d'esprit est notre priorité. Voici comment nous sécurisons vos achats :
               </p>
               <ul className="space-y-3">
                 <li className="flex gap-3">
                   <CheckCircle className="text-green-500 shrink-0" size={20} />
                   <span><strong>Paiement bloqué :</strong> Votre argent n'est versé au vendeur que lorsque vous confirmez avoir reçu l'article conforme.</span>
                 </li>
                 <li className="flex gap-3">
                   <CheckCircle className="text-green-500 shrink-0" size={20} />
                   <span><strong>Remboursement garanti :</strong> Si l'article ne correspond pas à la description ou n'est jamais livré, nous vous remboursons intégralement.</span>
                 </li>
                 <li className="flex gap-3">
                   <CheckCircle className="text-green-500 shrink-0" size={20} />
                   <span><strong>Support local :</strong> Notre équipe basée à Bujumbura intervient en cas de litige sous 24h.</span>
                 </li>
               </ul>
             </div>

             <Button fullWidth onClick={() => setShowProtectionModal(false)}>J'ai compris</Button>
           </div>
         </div>
       )}
    </div>
  );
};
