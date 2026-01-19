import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Page } from '../App';
import { Store, ShoppingBag, MapPin, Check } from 'lucide-react';

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

  const zones = [
    { id: 'A', name: 'Zone A', location: 'Muha', desc: 'Sud de Bujumbura' },
    { id: 'B', name: 'Zone B', location: 'Mukaza', desc: 'Centre de Bujumbura' },
    { id: 'C', name: 'Zone C', location: 'Ntahangwa', desc: 'Nord de Bujumbura' },
  ];

  const handleFinish = () => {
    // Ici, on enverrait les données au backend (rôle + zone)
    console.log('Onboarding complete:', { role, zone });
    navigate('home');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Sidebar / Progress */}
        <div className="w-full md:w-1/3 bg-[#01003c] p-10 flex flex-col justify-between text-white relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-[#01003c] to-[#01003c]"></div>
           <div className="relative z-10">
             <h2 className="text-2xl font-display font-bold mb-2">Configuration</h2>
             <p className="text-blue-200 text-sm">Finalisons votre profil pour une meilleure expérience.</p>
           </div>
           
           <div className="relative z-10 space-y-8 my-8">
              <div className={`flex items-center gap-4 ${step === 1 ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step === 1 ? 'border-soko-orange text-soko-orange bg-white' : 'border-gray-500 text-gray-500'}`}>
                  {step > 1 ? <Check size={20} /> : '1'}
                </div>
                <div className="font-bold">Votre Rôle</div>
              </div>
              <div className={`flex items-center gap-4 ${step === 2 ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step === 2 ? 'border-soko-orange text-soko-orange bg-white' : 'border-gray-500 text-gray-500'}`}>
                  2
                </div>
                <div className="font-bold">Votre Zone</div>
              </div>
           </div>

           <div className="relative z-10 text-xs text-blue-200/60">
             Étape {step} sur 2
           </div>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-2/3 p-10 md:p-14 flex flex-col items-center justify-center bg-white relative">
           
           {/* Step 1: Role Selection */}
           {step === 1 && (
             <div className="w-full animate-fade-in-up">
               <h3 className="text-2xl font-bold font-display text-soko-dark mb-8 text-center">Comment souhaitez-vous utiliser SokoLink ?</h3>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  <button 
                    onClick={() => setRole('buyer')}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center text-center gap-4 hover:shadow-lg ${role === 'buyer' ? 'border-soko-orange bg-orange-50/50' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${role === 'buyer' ? 'bg-soko-orange text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <ShoppingBag size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-soko-dark text-lg">Acheteur</h4>
                      <p className="text-xs text-gray-500 mt-1">Je veux découvrir et acheter des produits locaux.</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => setRole('seller')}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center text-center gap-4 hover:shadow-lg ${role === 'seller' ? 'border-soko-orange bg-orange-50/50' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${role === 'seller' ? 'bg-soko-orange text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <Store size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-soko-dark text-lg">Vendeur</h4>
                      <p className="text-xs text-gray-500 mt-1">Je veux vendre mes produits à la communauté.</p>
                    </div>
                  </button>
               </div>

               <Button 
                variant="primary" 
                fullWidth 
                size="lg" 
                disabled={!role}
                onClick={() => setStep(2)}
               >
                 Continuer
               </Button>
             </div>
           )}

           {/* Step 2: Zone Selection */}
           {step === 2 && (
             <div className="w-full animate-fade-in-up">
               <button onClick={() => setStep(1)} className="text-sm text-gray-400 mb-6 hover:text-soko-dark">← Retour</button>
               <h3 className="text-2xl font-bold font-display text-soko-dark mb-2 text-center">Où êtes-vous situé ?</h3>
               <p className="text-center text-gray-500 mb-8 text-sm">Cela nous aide à vous montrer les offres les plus proches.</p>
               
               <div className="space-y-4 mb-10">
                  {zones.map((z) => (
                    <button 
                      key={z.id}
                      onClick={() => setZone(z.id as Zone)}
                      className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all hover:shadow-md text-left ${zone === z.id ? 'border-soko-orange bg-orange-50/30' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${zone === z.id ? 'bg-soko-orange text-white' : 'bg-gray-100 text-gray-400'}`}>
                        <MapPin size={20} />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-soko-dark">{z.name}</span>
                          <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded text-gray-600">{z.location}</span>
                        </div>
                        <p className="text-xs text-gray-500">{z.desc}</p>
                      </div>
                      {zone === z.id && <Check className="text-soko-orange" size={20} />}
                    </button>
                  ))}
               </div>

               <Button 
                variant="primary" 
                fullWidth 
                size="lg" 
                disabled={!zone}
                onClick={handleFinish}
               >
                 Terminer l'inscription
               </Button>
             </div>
           )}

        </div>
      </div>
    </div>
  );
};