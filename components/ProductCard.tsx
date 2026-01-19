import React from 'react';
import { Product } from '../types';
import { MessageCircle, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const whatsappMessage = `Bonjour, je suis intéressé par votre article : ${product.title} (ID: ${product.id}) vu sur SokoLink. Est-il toujours disponible ?`;
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

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
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-soko-dark shadow-sm font-display tracking-wide uppercase">
          {product.category}
        </div>

        {/* Like Button */}
        <button className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-colors duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
          <Heart size={18} />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
           <h3 className="font-display font-bold text-gray-900 text-lg leading-tight truncate pr-2">{product.title}</h3>
           <span className="font-display font-bold text-soko-orange text-lg whitespace-nowrap">{product.price.toLocaleString('fr-FR')} €</span>
        </div>
        
        <p className="text-sm text-gray-500 font-body mb-4 line-clamp-2">Vendu par un voisin de confiance.</p>
        
        <div className="mt-auto pt-4 border-t border-gray-50">
           <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-gray-50 hover:bg-green-50 text-gray-700 hover:text-green-600 rounded-xl transition-all duration-300 text-sm font-semibold group-hover:shadow-md"
          >
            <MessageCircle size={18} />
            <span className="font-display">Discuter</span>
          </a>
        </div>
      </div>
    </div>
  );
};