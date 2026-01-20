import React, { useState } from 'react';
import { Page } from '../App';
import { Button } from '../components/ui/Button';
import { ArrowLeft, User, Shield, Bell, Smartphone, MapPin, CheckCircle, AlertCircle, Package, HelpCircle, ChevronDown, ChevronUp, Mail, Clock, Truck, XCircle } from 'lucide-react';
import { Order } from '../types';

interface SettingsProps {
  navigate: (page: Page) => void;
  orders: Order[];
  navigateToOrder: (order: Order) => void;
}

export const Settings: React.FC<SettingsProps> = ({ navigate, orders, navigateToOrder }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [zoneRequestStatus, setZoneRequestStatus] = useState<'idle' | 'sent'>('idle');
  const [notifOrders, setNotifOrders] = useState(true);
  const [notifPromos, setNotifPromos] = useState(false);
  
  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleZoneRequest = () => setZoneRequestStatus('sent');

  const tabs = [
    { id: 'profile', label: 'Mon Profil', icon: User },
    { id: 'orders', label: 'Mes Commandes', icon: Package },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'help', label: 'Centre d\'aide', icon: HelpCircle },
  ];

  // Helper for Order Status Badge
  const getStatusBadge = (status: string) => {
    const styles = {
        pending: 'bg-yellow-100 text-yellow-700',
        confirmed: 'bg-blue-100 text-blue-700',
        shipped: 'bg-purple-100 text-purple-700',
        delivered: 'bg-green-100 text-green-700',
        cancelled: 'bg-red-100 text-red-700'
    };
    
    const labels = {
        pending: 'En attente',
        confirmed: 'Confirmée',
        shipped: 'Expédiée',
        delivered: 'Livrée',
        cancelled: 'Annulée'
    };
    
    // @ts-ignore
    const style = styles[status] || styles.pending;
    // @ts-ignore
    const label = labels[status] || status;
    
    return <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${style}`}>{label}</span>;
  };

  // Mock FAQ
  const faqs = [
    { q: "Comment modifier ma zone de livraison ?", a: "Pour changer votre zone (A, B ou C), vous devez en faire la demande dans l'onglet 'Mon Profil'. Un administrateur validera votre demande sous 24h." },
    { q: "Les paiements sont-ils sécurisés ?", a: "Oui, SokoLink utilise un système de séquestre. L'argent n'est versé au vendeur que lorsque vous confirmez la bonne réception du produit." },
    { q: "Comment contacter un vendeur ?", a: "Sur chaque page produit, vous trouverez un bouton 'Discuter sur WhatsApp' pour échanger directement avec le vendeur." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header */}
      <div className="bg-[#01003c] text-white pt-8 pb-24 px-4">
        <div className="max-w-[1000px] mx-auto">
           <button 
             onClick={() => navigate('buyer-dashboard')}
             className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6 text-sm"
           >
             <ArrowLeft size={16} /> Retour au tableau de bord
           </button>
           <h1 className="text-3xl font-display font-bold">Paramètres du compte</h1>
           <p className="text-blue-200 mt-2">Gérez vos informations personnelles, vos commandes et vos préférences.</p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 -mt-12 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
             {tabs.map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-orange-50 text-soko-orange border-l-4 border-soko-orange' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}
               >
                 <tab.icon size={18} />
                 {tab.label}
               </button>
             ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 animate-fade-in-up min-h-[400px]">
              
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-white shadow-md overflow-hidden">
                       <img src="https://ui-avatars.com/api/?name=User&background=01003c&color=fff&size=128" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Changer la photo</Button>
                      <p className="text-xs text-gray-400 mt-2">JPG, GIF ou PNG. Max 2MB.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Prénom</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input type="text" defaultValue="Jean" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-soko-orange/20 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nom</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input type="text" defaultValue="Dupont" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-soko-orange/20 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input type="email" defaultValue="user@sokolink.com" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-soko-orange/20 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Numéro WhatsApp</label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input type="tel" defaultValue="+257 79 00 00 00" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-soko-orange/20 outline-none" />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                       <label className="block text-sm font-bold text-gray-700 mb-2">Localisation (Zone)</label>
                       <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input 
                          type="text" 
                          value="Zone B (Mukaza)" 
                          disabled 
                          className="w-full pl-10 pr-36 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" 
                        />
                        <div className="absolute right-2 top-2">
                          {zoneRequestStatus === 'idle' ? (
                            <Button size="sm" variant="secondary" className="h-8 text-xs px-3 bg-soko-dark text-white" onClick={handleZoneRequest}>
                              Demander changement
                            </Button>
                          ) : (
                            <span className="flex items-center gap-1 text-xs text-green-600 font-bold bg-green-50 px-3 py-2 rounded-lg border border-green-100 h-8">
                              <CheckCircle size={14} /> Demande envoyée
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-100 flex justify-end">
                    <Button variant="primary">Enregistrer</Button>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Historique des commandes</h3>
                  {orders.length === 0 ? (
                      <div className="text-center py-10">
                          <Package size={48} className="mx-auto text-gray-200 mb-4" />
                          <p className="text-gray-500">Vous n'avez pas encore passé de commande.</p>
                          <Button size="sm" className="mt-4" onClick={() => navigate('buyer-dashboard')}>Commencer mes achats</Button>
                      </div>
                  ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                        <div key={order.id} className="border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-gray-50 transition-colors">
                            <div>
                            <div className="flex items-center gap-3 mb-1">
                                <span className="font-bold text-soko-dark">{order.id}</span>
                                {getStatusBadge(order.status)}
                            </div>
                            <p className="text-sm text-gray-500 truncate max-w-[200px]">
                                {order.items.length} article(s): {order.items[0].title} {order.items.length > 1 ? `+${order.items.length - 1} autre(s)` : ''}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{order.date}</p>
                            </div>
                            <div className="mt-4 sm:mt-0 text-right">
                            <p className="font-bold text-soko-orange">{order.total.toLocaleString()} Fbu</p>
                            <button 
                                onClick={() => navigateToOrder(order)}
                                className="text-xs text-soko-blue font-bold hover:underline mt-1"
                            >
                                Voir détails
                            </button>
                            </div>
                        </div>
                        ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'security' && (
                 <div className="text-center py-12">
                   <Shield size={48} className="mx-auto text-gray-300 mb-4" />
                   <h3 className="text-xl font-bold text-gray-800">Paramètres de sécurité</h3>
                   <p className="text-gray-500">Changez votre mot de passe ou activez la double authentification.</p>
                   <Button variant="outline" className="mt-6">Modifier le mot de passe</Button>
                 </div>
              )}

              {activeTab === 'notifications' && (
                 <div className="space-y-4">
                   <h3 className="font-bold text-lg text-gray-800 mb-4">Préférences</h3>
                   <button onClick={() => setNotifOrders(!notifOrders)} className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left">
                      <div><p className="font-bold text-gray-700">Commandes</p><p className="text-xs text-gray-500">Alertes de suivi</p></div>
                      <div className={`w-12 h-6 rounded-full relative transition-colors ${notifOrders ? 'bg-soko-orange' : 'bg-gray-300'}`}><div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${notifOrders ? 'right-0.5' : 'left-0.5'}`}></div></div>
                   </button>
                   <button onClick={() => setNotifPromos(!notifPromos)} className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left">
                      <div><p className="font-bold text-gray-700">Promotions</p><p className="text-xs text-gray-500">Offres spéciales</p></div>
                      <div className={`w-12 h-6 rounded-full relative transition-colors ${notifPromos ? 'bg-soko-orange' : 'bg-gray-300'}`}><div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${notifPromos ? 'right-0.5' : 'left-0.5'}`}></div></div>
                   </button>
                 </div>
              )}

              {activeTab === 'help' && (
                <div>
                   <h3 className="text-xl font-bold text-gray-800 mb-6">Foire Aux Questions</h3>
                   <div className="space-y-3">
                      {faqs.map((item, index) => (
                        <div key={index} className="border border-gray-100 rounded-xl overflow-hidden">
                          <button 
                            onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors bg-white"
                          >
                            <span className="font-bold text-gray-700 text-sm">{item.q}</span>
                            {openFaqIndex === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                          {openFaqIndex === index && (
                            <div className="p-4 pt-0 text-sm text-gray-500 bg-white border-t border-gray-50 leading-relaxed">
                              {item.a}
                            </div>
                          )}
                        </div>
                      ))}
                   </div>
                   <div className="mt-8 bg-blue-50 p-6 rounded-2xl text-center">
                      <p className="font-bold text-soko-dark mb-2">Besoin de plus d'aide ?</p>
                      <p className="text-sm text-gray-600 mb-4">Notre équipe de support est disponible 7j/7.</p>
                      <Button size="sm">Contacter le support</Button>
                   </div>
                </div>
              )}

           </div>
        </div>

      </div>
    </div>
  );
};
