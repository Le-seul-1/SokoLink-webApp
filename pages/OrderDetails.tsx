import React from 'react';
import { Page } from '../App';
import { Order } from '../types';
import { ArrowLeft, Package, Calendar, MapPin, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';

interface OrderDetailsProps {
  navigate: (page: Page) => void;
  order: Order | null;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ navigate, order }) => {
  if (!order) {
    setTimeout(() => navigate('settings'), 0);
    return null;
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'En attente de validation', color: 'bg-yellow-100 text-yellow-700', icon: Clock, desc: 'Paiement en cours de vérification par l\'administrateur.' };
      case 'confirmed':
        return { label: 'Confirmée', color: 'bg-blue-100 text-blue-700', icon: CheckCircle, desc: 'Commande validée, en préparation chez le vendeur.' };
      case 'shipped':
        return { label: 'En livraison', color: 'bg-purple-100 text-purple-700', icon: Truck, desc: 'Votre commande est en route.' };
      case 'delivered':
        return { label: 'Livrée', color: 'bg-green-100 text-green-700', icon: CheckCircle, desc: 'Commande reçue.' };
      default:
        return { label: 'Annulée', color: 'bg-red-100 text-red-700', icon: XCircle, desc: 'Commande annulée.' };
    }
  };

  const statusInfo = getStatusInfo(order.status);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header */}
      <div className="bg-[#01003c] text-white pt-8 pb-16 px-4">
        <div className="max-w-[800px] mx-auto">
           <button 
             onClick={() => navigate('settings')}
             className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-4 text-sm"
           >
             <ArrowLeft size={16} /> Retour à mes commandes
           </button>
           <div className="flex flex-wrap items-center justify-between gap-4">
             <div>
               <h1 className="text-2xl font-display font-bold">Détails de la commande</h1>
               <p className="text-blue-200 font-mono mt-1">#{order.id}</p>
             </div>
             <div className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 ${statusInfo.color}`}>
                <statusInfo.icon size={16} />
                {statusInfo.label}
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 -mt-8 space-y-6">
        
        {/* Status Box */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
           <h3 className="font-bold text-soko-dark mb-2">État du suivi</h3>
           <p className="text-gray-500 text-sm">{statusInfo.desc}</p>
           {order.status === 'pending' && (
             <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-xs rounded-lg border border-blue-100">
               <strong>Info:</strong> Votre paiement (Code: {order.paymentCode}) est en cours d'examen. Vous recevrez une notification dès validation.
             </div>
           )}
        </div>

        {/* Items List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center gap-2">
               <Package size={20} className="text-gray-400" />
               <h3 className="font-bold text-soko-dark">Articles commandés ({order.items.length})</h3>
            </div>
            <div className="divide-y divide-gray-50">
               {order.items.map((item) => (
                 <div key={item.id} className="p-4 flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                       <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                       <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
                       <p className="text-xs text-gray-500">Catégorie: {item.category}</p>
                       <div className="flex justify-between items-center mt-2">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">Qté: {item.quantity}</span>
                          <span className="font-bold text-soko-dark">{(item.price * item.quantity).toLocaleString()} Fbu</span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
           <h3 className="font-bold text-soko-dark mb-4">Résumé financier</h3>
           <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                 <span>Sous-total</span>
                 <span>{(order.total - 2000).toLocaleString()} Fbu</span>
              </div>
              <div className="flex justify-between text-gray-500">
                 <span>Livraison (Zone B)</span>
                 <span>2 000 Fbu</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg text-soko-dark">
                 <span>Total payé</span>
                 <span>{order.total.toLocaleString()} Fbu</span>
              </div>
           </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
           <MapPin size={24} className="text-gray-400 mt-1" />
           <div>
              <h3 className="font-bold text-soko-dark text-sm">Adresse de livraison</h3>
              <p className="text-gray-500 text-sm mt-1">Jean Dupont<br/>Quartier Rohero, Avenue des Manguiers<br/>Bujumbura, Zone B</p>
           </div>
        </div>

        <div className="flex justify-center text-xs text-gray-400 pb-8">
           <p>Commande passée le {order.date}</p>
        </div>

      </div>
    </div>
  );
};
