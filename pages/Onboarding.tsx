import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Page } from '../App';
import { Store, ShoppingBag, MapPin, Check, ArrowLeft } from 'lucide-react';
import { getAuthImage } from '../utils/images';
import { Logo } from '../components/Logo';

interface OnboardingProps {
  navigate: (page: Page) => void;
}

type Step = 1 | 2;
type Role = 'buyer' | 'seller' | null;
type Zone = 'A' | 'B' | 'C' | null;

export const Onboarding: React.FC<OnboardingProps> = ({ navigate }) => {
  const [step, setStep] = useState<Step>(1);
  const [role, setRole] = useState<Role>(null);
  const [zone, setZone] = useState<Zone>(null);
  
  // Reuse the same background image style as Register for consistency
  const bgImage = getAuthImage('register');

  const zones = [
    { id: 'A', name: 'Zone A', location: 'Muha', desc: 'Sud de Bujumbura' },
    { id: 'B', name: 'Zone B', location: 'Mukaza', desc: 'Centre de Bujumbura' },
    { id: 'C', name: 'Zone C', location: 'Ntahangwa', desc: 'Nord de Bujumbura' },
  ];

  const handleFinish = () => {
    // Redirection basée sur le rôle choisi
    if (role === 'seller') {
      navigate('seller-dashboard');
    } else {
      navigate('buyer-dashboard');
    }
  };

  return (
    <div className="min-h-screen flex relative">
       {/* Bouton retour (seulement si step 2 pour revenir au step 1, sinon on ne retourne pas à register pour éviter confusion) */}
       {step === 2 && (
        <button 
          onClick={() => setStep(1)} 
          className="absolute top-8 left-8 z-20 flex items-center gap-2 text-sm text-gray-500 hover:text-soko-dark transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100"
        >
          <ArrowLeft size={16} /> Retour
        </button>
       )}

       {/* Right Side - Image/Branding (Identique à Register pour la continuité) */}
       <div className="hidden lg:flex w-1/2 bg-gray-900 relative items-center justify-center overflow-hidden order-last">
          <div 
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: `url("${bgImage}")` }}
          ></div>
          <div className="relative z-10 p-12 text-white max-w-lg text-center">
             <h1 className="text-4xl font-display font-bold mb-6">Quelques détails de plus.</h1>
             <p className="text-lg text-gray-300 leading-relaxed mb-8">
               Nous personnalisons votre expérience SokoLink en fonction de vos besoins et de votre localisation.
             </p>
             
             {/* Progress Steps Visual (Vertical on Desktop sidebar similar to previous design but integrated) */}
             <div className="flex flex-col items-start gap-6 bg-white/10 p-8 rounded-3xl backdrop-blur-sm text-left w-full max-w-sm mx-auto">
                <div className={`flex items-center gap-4 transition-opacity duration-300 ${step === 1 ? 'opacity-100' : 'opacity-50'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border ${step === 1 ? 'bg-soko-orange border-soko-orange text-white' : 'border-white text-white'}`}>
                    {step > 1 ? <Check size={16} /> : '1'}
                  </div>
                  <span className="font-bold">Votre Rôle</span>
                </div>
                
                {/* Connector Line */}
                <div className="w-0.5 h-6 bg-white/20 ml-4 -my-2"></div>

                <div className={`flex items-center gap-4 transition-opacity duration-300 ${step === 2 ? 'opacity-100' : 'opacity-50'}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border ${step === 2 ? 'bg-soko-orange border-soko-orange text-white' : 'border-white text-white'}`}>
                    2
                  </div>
                  <span className="font-bold">Votre Zone</span>
                </div>
             </div>
          </div>
       </div>

       {/* Left Side - Content Forms */}
       <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-8">
          <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50">
             
             <div className="text-center mb-8">
                <Logo className="mx-auto mb-6 justify-center" />
                <h2 className="text-2xl font-extrabold font-display text-soko-dark mb-2">
                  {step === 1 ? 'Votre profil' : 'Votre localisation'}
                </h2>
                <p className="text-sm text-gray-500">
                  Étape {step} sur 2
                </p>
             </div>

             {/* STEP 1: ROLE */}
             {step === 1 && (
               <div className="space-y-4 animate-fade-in-up">
                 <button 
                    onClick={() => setRole('buyer')}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 hover:shadow-md text-left ${role === 'buyer' ? 'border-soko-orange bg-orange-50/50' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${role === 'buyer' ? 'bg-soko-orange text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <ShoppingBag size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-soko-dark">Acheteur</h4>
                      <p className="text-xs text-gray-500">Je veux acheter des produits.</p>
                    </div>
                    {role === 'buyer' && <Check className="ml-auto text-soko-orange" size={20} />}
                  </button>

                  <button 
                    onClick={() => setRole('seller')}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 hover:shadow-md text-left ${role === 'seller' ? 'border-soko-orange bg-orange-50/50' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${role === 'seller' ? 'bg-soko-orange text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <Store size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-soko-dark">Vendeur</h4>
                      <p className="text-xs text-gray-500">Je veux vendre mes produits.</p>
                    </div>
                     {role === 'seller' && <Check className="ml-auto text-soko-orange" size={20} />}
                  </button>

                  <Button 
                    variant="primary" 
                    fullWidth 
                    size="lg" 
                    className="mt-6 shadow-orange-500/25"
                    disabled={!role}
                    onClick={() => setStep(2)}
                  >
                    Continuer
                  </Button>
               </div>
             )}

             {/* STEP 2: ZONE */}
             {step === 2 && (
               <div className="space-y-4 animate-fade-in-up">
                  {zones.map((z) => (
                    <button 
                      key={z.id}
                      onClick={() => setZone(z.id as Zone)}
                      className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all hover:shadow-md text-left ${zone === z.id ? 'border-soko-orange bg-orange-50/30' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${zone === z.id ? 'bg-soko-orange text-white' : 'bg-gray-100 text-gray-400'}`}>
                        <MapPin size={18} />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-soko-dark">{z.name}</span>
                          <span className="text-[10px] font-semibold bg-gray-100 px-2 py-1 rounded text-gray-600 uppercase">{z.location}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{z.desc}</p>
                      </div>
                      {zone === z.id && <Check className="text-soko-orange" size={20} />}
                    </button>
                  ))}

                  <Button 
                    variant="primary" 
                    fullWidth 
                    size="lg" 
                    className="mt-6 shadow-orange-500/25"
                    disabled={!zone}
                    onClick={handleFinish}
                  >
                    Terminer
                  </Button>
               </div>
             )}

          </div>
       </div>
    </div>
  );
};
