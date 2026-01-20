import React, { useState } from 'react';
import { Page } from '../App';
import { Button } from '../components/ui/Button';
import { CartItem, Order } from '../types';
import { ArrowLeft, CheckCircle, MapPin, Smartphone, User, DollarSign, Lock } from 'lucide-react';

interface CheckoutProps {
  navigate: (page: Page) => void;
  items: CartItem[];
  clearCart: () => void;
  addOrder: (items: CartItem[], total: number, paymentCode: string) => Order;
}

export const Checkout: React.FC<CheckoutProps> = ({ navigate, items, clearCart, addOrder }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 2000;
  const total = subtotal + deliveryFee;

  // Mock Payment Code
  const [paymentCode] = useState(`SOKO-${Math.floor(Math.random() * 10000)}`);

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // 1. Create the order in history
      addOrder(items, total, paymentCode);
      
      // 2. Clear local cart
      clearCart();
      
      // 3. Stop processing and navigate
      setIsProcessing(false);
      navigate('order-confirmation');
    }, 2000);
  };

  if (items.length === 0) {
    // Redirect if refreshed on empty cart
    setTimeout(() => navigate('cart'), 0);
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header */}
      <div className="bg-[#01003c] text-white pt-8 pb-16 px-4">
        <div className="max-w-[1000px] mx-auto">
           <button 
             onClick={() => navigate('cart')}
             className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-4 text-sm"
           >
             <ArrowLeft size={16} /> Retour au panier
           </button>
           <h1 className="text-3xl font-display font-bold">Validation de la commande</h1>
           <p className="text-blue-200 text-sm mt-1">Vérifiez les détails et effectuez le paiement.</p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 -mt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Main Column */}
        <div className="md:col-span-7 space-y-6">
          
          {/* 1. Recap Commande (Read-only) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-lg text-soko-dark mb-4 flex items-center gap-2">
              <CheckCircle size={20} className="text-green-500" /> Récapitulatif
            </h2>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                     <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                     <p className="text-xs text-gray-500">{item.quantity} x {item.price.toLocaleString()} Fbu</p>
                  </div>
                  <div className="font-bold text-soko-dark text-sm">
                    {(item.price * item.quantity).toLocaleString()} Fbu
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between font-bold text-soko-dark">
               <span>Total à payer</span>
               <span>{total.toLocaleString()} Fbu</span>
            </div>
          </div>

          {/* 2. Zone & Map (Visual Placeholder) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
             <h2 className="font-bold text-lg text-soko-dark mb-4 flex items-center gap-2">
               <MapPin size={20} className="text-soko-orange" /> Lieu de livraison
             </h2>
             <p className="text-sm text-gray-600 mb-4">
               Livraison prévue en <strong>Zone B (Mukaza)</strong>. 
               <br/><span className="text-xs text-gray-400">Basé sur votre profil.</span>
             </p>
             
             {/* Map Placeholder */}
             <div className="w-full h-40 bg-blue-50 rounded-xl relative overflow-hidden flex items-center justify-center border border-blue-100">
               {/* Decorative grid pattern */}
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #4354ff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
               <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent"></div>
               
               {/* Map Pin Visual */}
               <div className="relative z-10 flex flex-col items-center animate-bounce">
                  <MapPin size={32} className="text-red-500 fill-red-100 drop-shadow-lg" />
                  <div className="w-8 h-2 bg-black/20 rounded-full blur-sm mt-1"></div>
               </div>
               <p className="absolute bottom-2 right-3 text-[10px] text-gray-400 font-mono">Map Data © SokoLink</p>
             </div>
          </div>
        </div>

        {/* Sidebar: Payment Instructions */}
        <div className="md:col-span-5">
           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <h2 className="font-bold text-lg text-soko-dark mb-6 flex items-center gap-2">
                 <DollarSign size={20} className="text-soko-blue" /> Paiement
              </h2>

              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6">
                 <p className="text-xs text-orange-800 font-bold uppercase mb-1">Code de paiement unique</p>
                 <div className="text-2xl font-mono font-black text-soko-orange tracking-widest text-center py-2 bg-white rounded-lg border border-orange-200 border-dashed">
                    {paymentCode}
                 </div>
                 <p className="text-[10px] text-center text-orange-600 mt-2">Valide pour 24 heures.</p>
              </div>

              <div className="space-y-4 text-sm text-gray-600 mb-8">
                 <p className="font-medium text-gray-900">Instructions :</p>
                 <ol className="list-decimal pl-4 space-y-2">
                    <li>Rendez-vous chez un agent <strong>Lumicash</strong> ou <strong>Ecocash</strong>.</li>
                    <li>Effectuez un dépôt sur le compte marchand <strong>79 00 00 00</strong>.</li>
                    <li>Indiquez le code <strong>{paymentCode}</strong> comme motif.</li>
                    <li>Une fois le paiement effectué, cliquez sur le bouton ci-dessous.</li>
                 </ol>
              </div>

              <Button 
                fullWidth 
                size="lg" 
                onClick={handlePayment} 
                disabled={isProcessing}
                className="mb-4"
              >
                {isProcessing ? 'Vérification...' : "J'ai effectué le paiement"}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                 <Lock size={12} /> Transaction sécurisée par SokoLink
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
