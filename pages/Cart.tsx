import React from 'react';
import { Page } from '../App';
import { Button } from '../components/ui/Button';
import { CartItem } from '../types';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

interface CartProps {
  navigate: (page: Page) => void;
  items: CartItem[];
  updateQuantity: (id: string, change: number) => void;
  removeItem: (id: string) => void;
}

export const Cart: React.FC<CartProps> = ({ navigate, items, updateQuantity, removeItem }) => {

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = items.length > 0 ? 2000 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header */}
      <div className="bg-[#01003c] text-white pt-8 pb-16 px-4">
        <div className="max-w-[1200px] mx-auto">
           <button 
             onClick={() => navigate('buyer-dashboard')}
             className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-4 text-sm"
           >
             <ArrowLeft size={16} /> Continuer vos achats
           </button>
           <h1 className="text-3xl font-display font-bold">Votre Panier</h1>
           <p className="text-blue-200 text-sm mt-1">{items.length} articles sélectionnés</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 -mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 animate-fade-in-up">
                {/* Image */}
                <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                
                {/* Details */}
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-soko-dark">{item.title}</h3>
                      <p className="text-soko-orange font-bold text-sm">{item.price.toLocaleString()} Fbu</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-soko-dark"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-soko-dark"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      {(item.price * item.quantity).toLocaleString()} Fbu
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
             <div className="bg-white p-12 rounded-2xl text-center shadow-sm">
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                 <Trash2 size={24} />
               </div>
               <h3 className="font-bold text-gray-900 mb-2">Votre panier est vide</h3>
               <p className="text-gray-500 text-sm mb-6">Explorez le marché pour trouver des produits locaux incroyables.</p>
               <Button onClick={() => navigate('buyer-dashboard')}>Découvrir des produits</Button>
             </div>
          )}
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
            <h3 className="font-bold text-lg text-soko-dark mb-6">Résumé de la commande</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Sous-total</span>
                <span>{subtotal.toLocaleString()} Fbu</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Livraison estimée</span>
                <span>{deliveryFee.toLocaleString()} Fbu</span>
              </div>
              <div className="h-px bg-gray-100 my-2"></div>
              <div className="flex justify-between font-bold text-lg text-soko-dark">
                <span>Total</span>
                <span>{total.toLocaleString()} Fbu</span>
              </div>
            </div>

            <Button 
              fullWidth 
              size="lg" 
              className="mb-4 group" 
              disabled={items.length === 0}
              onClick={() => navigate('checkout')}
            >
              Procéder à la validation <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
              <ShieldCheck size={14} className="text-green-500" />
              <span>Paiement 100% sécurisé</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
