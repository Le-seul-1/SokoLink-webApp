import React from 'react';
import { Product } from '../types';
import { MessageCircle, Heart, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'default', onAddToCart }) => {
  const whatsappMessage = `Bonjour, je suis intéressé par votre article : ${product.title} (ID: ${product.id}) vu sur SokoLink. Est-il toujours disponible ?`;
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  // Calculate discounted price if applicable
  const hasDiscount = product.discount && product.discount > 0;
  const finalPrice = hasDiscount 
    ? product.price * (1 - product.discount! / 100) 
    : product.price;

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating to product details
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 border border-gray-100 flex flex-col h-full relative transform hover:-translate-y-2">
      
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.category && (
            <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-soko-dark shadow-sm font-display tracking-wide uppercase self-start">
              {product.category}
            </div>
          )}
          {product.isNew && (
            <div className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm font-display tracking-wide uppercase self-start">
              NOUVEAU
            </div>
          )}
          {hasDiscount && (
             <div className="bg-soko-orange text-white px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm font-display tracking-wide uppercase self-start">
              -{product.discount}%
            </div>
          )}
        </div>

        {/* Like Button */}
        <button className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-colors duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
          <Heart size={18} />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-col mb-2">
           <h3 className="font-display font-bold text-gray-900 text-lg leading-tight truncate mb-1">{product.title}</h3>
           <div className="flex items-center gap-2">
             <span className="font-display font-bold text-soko-orange text-lg whitespace-nowrap">
               {finalPrice.toLocaleString('fr-FR')} Fbu
             </span>
             {hasDiscount && (
               <span className="text-xs text-gray-400 line-through font-medium">
                 {product.price.toLocaleString('fr-FR')} Fbu
               </span>
             )}
           </div>
        </div>
        
        <p className="text-xs text-gray-400 font-body mb-4 line-clamp-1">Vendu par un voisin de confiance.</p>
        
        <div className="mt-auto pt-4 border-t border-gray-50 flex gap-2">
           <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-green-50 text-gray-700 hover:text-green-600 rounded-xl transition-all duration-300 text-sm font-semibold group-hover:shadow-md"
          >
            <MessageCircle size={18} />
            <span className="font-display">Discuter</span>
          </a>
          <button 
            onClick={handleCartClick}
            className="p-3 bg-soko-dark text-white rounded-xl hover:bg-soko-blue transition-colors active:scale-95"
            title="Ajouter au panier"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
