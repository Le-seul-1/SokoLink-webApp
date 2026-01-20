import React from 'react';
import { Page } from '../App';
import { ArrowLeft, MessageSquare, Tag, Truck, CheckCircle, Info } from 'lucide-react';

interface NotificationsProps {
  navigate: (page: Page) => void;
}

// Mock Notifications
const NOTIFICATIONS = [
  { id: 1, type: 'message', sender: 'Vendeur (Jean)', title: 'Nouveau message', text: 'Bonjour, votre commande est prête à être livrée !', time: 'Il y a 2 min', read: false },
  { id: 2, type: 'promo', sender: 'SokoLink', title: 'Baisse de prix', text: 'Le prix de "PlayStation 5" a baissé de 10%.', time: 'Il y a 1 heure', read: false },
  { id: 3, type: 'order', sender: 'Système', title: 'Commande confirmée', text: 'Votre commande #4582 a bien été validée.', time: 'Hier', read: true },
  { id: 4, type: 'info', sender: 'SokoLink', title: 'Bienvenue', text: 'Bienvenue sur SokoLink ! Complétez votre profil pour commencer.', time: 'Il y a 2 jours', read: true },
];

export const Notifications: React.FC<NotificationsProps> = ({ navigate }) => {
  
  const getIcon = (type: string) => {
    switch(type) {
      case 'message': return <MessageSquare size={18} className="text-blue-500" />;
      case 'promo': return <Tag size={18} className="text-orange-500" />;
      case 'order': return <Truck size={18} className="text-green-500" />;
      default: return <Info size={18} className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-100 pt-8 pb-4 px-4 sticky top-0 z-30">
        <div className="max-w-[800px] mx-auto flex items-center gap-4">
           <button 
             onClick={() => navigate('buyer-dashboard')}
             className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
           >
             <ArrowLeft size={20} />
           </button>
           <h1 className="text-xl font-display font-bold text-soko-dark">Notifications</h1>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 mt-6 space-y-3">
        {NOTIFICATIONS.map((notif) => (
          <div 
            key={notif.id} 
            className={`p-4 rounded-xl border flex gap-4 transition-all hover:bg-white hover:shadow-sm cursor-pointer ${notif.read ? 'bg-white border-gray-100 opacity-80' : 'bg-blue-50/30 border-blue-100'}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notif.read ? 'bg-gray-100' : 'bg-white shadow-sm'}`}>
              {getIcon(notif.type)}
            </div>
            
            <div className="flex-grow">
              <div className="flex justify-between items-start mb-1">
                <span className={`text-xs font-bold ${notif.read ? 'text-gray-500' : 'text-soko-blue'}`}>{notif.sender}</span>
                <span className="text-[10px] text-gray-400">{notif.time}</span>
              </div>
              <h3 className={`text-sm font-bold mb-1 ${notif.read ? 'text-gray-700' : 'text-soko-dark'}`}>{notif.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{notif.text}</p>
            </div>

            {!notif.read && (
              <div className="self-center">
                <div className="w-2 h-2 rounded-full bg-soko-orange"></div>
              </div>
            )}
          </div>
        ))}
        
        <div className="text-center pt-8 text-gray-400 text-xs">
          <p>Vous avez vu toutes vos notifications récentes.</p>
        </div>
      </div>
    </div>
  );
};
