import React from 'react';
import { Page } from '../App';
import { Button } from '../components/ui/Button';
import { Check, Package, ArrowRight, Calendar, FileText } from 'lucide-react';
import { Order } from '../types';

interface OrderConfirmationProps {
  navigate: (page: Page) => void;
  lastOrder: Order | null;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ navigate, lastOrder }) => {
  const orderNumber = lastOrder ? lastOrder.id : `CMD-${Math.floor(1000 + Math.random() * 9000)}`;
  const date = lastOrder ? lastOrder.date : new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center animate-fade-in-up">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
           <Check size={40} strokeWidth={3} />
        </div>

        <h1 className="text-2xl font-display font-bold text-soko-dark mb-2">Commande Reçue !</h1>
        <p className="text-gray-500 text-sm mb-8">
          Votre paiement est en attente de validation par l'administrateur. Vous recevrez une confirmation sous peu.
        </p>

        {/* Order Details Box */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left border border-gray-100">
           <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
              <span className="text-xs font-bold text-gray-400 uppercase">Commande</span>
              <span className="font-mono font-bold text-soko-dark">#{orderNumber}</span>
           </div>
           
           <div className="space-y-3">
              <div className="flex items-start gap-3">
                 <Calendar size={18} className="text-soko-orange mt-0.5" />
                 <div>
                    <p className="text-xs font-bold text-gray-700">Date</p>
                    <p className="text-sm text-gray-600">{date}</p>
                 </div>
              </div>
              <div className="flex items-start gap-3">
                 <Package size={18} className="text-soko-blue mt-0.5" />
                 <div>
                    <p className="text-xs font-bold text-gray-700">Statut</p>
                    <p className="text-sm text-yellow-600 font-bold">En attente de validation</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-3">
            <Button fullWidth size="lg" onClick={() => navigate('order-details')} className="group bg-soko-dark text-white hover:bg-soko-blue shadow-none">
                <FileText size={18} className="mr-2" /> Voir les détails complets
            </Button>
            
            <Button variant="outline" fullWidth size="lg" onClick={() => navigate('buyer-dashboard')} className="group">
                Continuer mes achats <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
        </div>
      </div>
    </div>
  );
};
