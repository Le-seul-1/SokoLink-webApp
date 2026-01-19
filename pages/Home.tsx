import React from 'react';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { Page } from '../App';
import { getPlaceholderImage, getHeroImage } from '../utils/images';
import { 
  Search, 
  MessageSquare, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  Store, 
  Zap,
} from 'lucide-react';

// Mock Data - Utilisation de getPlaceholderImage pour éviter les liens brisés
const POPULAR_PRODUCTS: Product[] = [
  { id: '1', title: 'Panier Légumes Bio', price: 15000, category: 'Alimentation', image: getPlaceholderImage('Alimentation', 'Legumes'), sellerId: 's1' },
  { id: '2', title: 'Poulet Fermier (Gitega)', price: 25000, category: 'Élevage', image: getPlaceholderImage('Élevage', 'Poulet'), sellerId: 's2' },
  { id: '3', title: 'Smartphone Android', price: 350000, category: 'Tech', image: getPlaceholderImage('Tech', 'Phone'), sellerId: 's3' },
  { id: '4', title: 'Sneakers Mode', price: 85000, category: 'Mode', image: getPlaceholderImage('Mode', 'Sneakers'), sellerId: 's4' },
];

interface HomeProps {
  navigate: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ navigate }) => {
  return (
    <div className="flex flex-col w-full overflow-hidden bg-gray-50/50">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-20 pb-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
        {/* Abstract blurry background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-100/30 rounded-[100%] blur-3xl pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto px-4 relative z-10 text-center">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-[11px] font-bold uppercase tracking-wide mb-8 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-soko-orange"></span>
            Nouveau : Livraison dans tout Bujumbura
          </div>

          {/* Headline */}
          <h1 className="font-display font-black text-5xl md:text-7xl text-soko-dark mb-6 tracking-tight leading-[1.1] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Le marché local de <br />
            <span className="relative inline-block mt-1 px-4 py-1 bg-[#01003c] text-white rounded-lg transform -rotate-1">
              Bujumbura.
            </span>
          </h1>

          {/* Subtext */}
          <p className="font-body text-gray-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Trouvez tout ce dont vous avez besoin : Légumes frais, Électronique, Vêtements et plus encore, directement auprès de vos voisins.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Button 
              variant="primary" 
              size="lg" 
              className="px-8 py-4 text-base font-bold shadow-orange-500/20"
              onClick={() => navigate('register')}
            >
              Explorer le marché
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-base font-bold bg-white hover:bg-gray-50 border-gray-200"
              onClick={() => navigate('register')}
            >
              Vendre un produit
            </Button>
          </div>

          {/* 3 Images Row (Visuels abstraits et stables) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-float">
            
            {/* Image 1 - Vegetables (Left) */}
            <div className="bg-white p-4 pb-8 rounded-[2rem] shadow-xl shadow-gray-200/50 flex flex-col h-full transform md:translate-y-8">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-4">
                 <img src={getPlaceholderImage('Alimentation', 'Légumes')} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Légumes" />
              </div>
              <div className="h-2 w-1/3 bg-gray-100 rounded-full mt-auto mx-auto"></div>
            </div>

            {/* Image 2 - Chicken/Food (Center - Higher) */}
            <div className="bg-white p-4 pb-8 rounded-[2rem] shadow-xl shadow-gray-200/50 flex flex-col h-full relative z-10 transform md:-translate-y-4">
               <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-4">
                 <img src={getPlaceholderImage('Élevage', 'Poulet')} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Poulet" />
               </div>
               <div className="h-2 w-2/3 bg-gray-100 rounded-full mt-auto mx-4"></div>
               <div className="absolute -right-2 bottom-8 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                 <div className="w-3 h-3 bg-soko-orange rounded-full"></div>
               </div>
            </div>

            {/* Image 3 - Tech (Right) */}
            <div className="bg-white p-4 pb-8 rounded-[2rem] shadow-xl shadow-gray-200/50 flex flex-col h-full transform md:translate-y-8">
               <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-4">
                 <img src={getPlaceholderImage('Tech', 'Camera')} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Camera" />
               </div>
               <div className="h-2 w-1/4 bg-gray-100 rounded-full mt-auto ml-4"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="py-24 bg-gray-50/50 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-soko-dark mb-4">Comment ça marche</h2>
          <p className="text-gray-500 mb-20 max-w-xl mx-auto">Lancez-vous en trois étapes simples.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line (Desktop only) */}
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-gray-200 -z-10"></div>

            {[
              { icon: Search, title: "Explorez", desc: "Trouvez des produits disponibles dans votre zone (A, B ou C)." },
              { icon: MessageSquare, title: "Discutez", desc: "Contactez directement le vendeur via WhatsApp ou le chat." },
              { icon: Truck, title: "Commandez & recevez", desc: "Rencontrez-vous en lieu sûr ou utilisez la livraison." }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center bg-transparent">
                <div className="w-20 h-20 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center mb-6 text-soko-orange hover:scale-110 transition-transform duration-300">
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-bold font-display text-soko-dark mb-3">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[250px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA BLUE SECTION ================= */}
      <section className="py-20 bg-[#01003c] text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-[#01003c] to-[#01003c]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">Prêt à commencer ?</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Rejoignez le marché local nouvelle génération et découvrez une nouvelle façon de consommer au Burundi.
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            className="px-10 py-4 font-bold text-base rounded-full shadow-lg shadow-orange-500/20"
            onClick={() => navigate('register')}
          >
            Créer un compte
          </Button>
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section className="py-24 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-soko-dark mb-4">Pourquoi choisir SOKOLINK</h2>
            <p className="text-gray-500">Une plateforme repensée pour vous offrir le meilleur.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Sécurité", desc: "Chaque profil est vérifié par identification pour garantir des échanges sûrs." },
              { icon: Store, title: "Marché local et fiable", desc: "Accédez à une sélection de produits de qualité vendus par des voisins de confiance." },
              { icon: MessageSquare, title: "Discussion directe", desc: "Posez vos questions et négociez en temps réel grâce à notre messagerie." },
              { icon: Truck, title: "Zones Couvertes", desc: "Nous couvrons les zones de Muha, Mukaza et Ntahangwa avec efficacité." },
              { icon: Zap, title: "Simple et rapide", desc: "Une interface intuitive conçue pour que vous trouviez ce que vous voulez en secondes." },
              { icon: CheckCircle2, title: "Garantie SokoLink", desc: "Votre satisfaction est notre priorité absolue sur chaque transaction." }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-100/50 p-8 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-soko-orange mb-4">
                  <item.icon size={20} />
                </div>
                <h3 className="font-bold text-soko-dark mb-3">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= POPULAR ITEMS ================= */}
      <section id="market" className="py-24 bg-white px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold font-display text-soko-dark mb-2">Populaire en ce moment</h2>
            <p className="text-gray-500 text-sm">Découvrez ce que la communauté s'arrache cette semaine.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {POPULAR_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              variant="secondary" 
              className="px-8 rounded-full bg-[#01003c] text-white"
              onClick={() => navigate('register')}
            >
              Voir tout
            </Button>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA / FOOTER ================= */}
      <section className="py-24 bg-white text-center px-4">
        <h2 className="text-3xl md:text-5xl font-display font-black text-soko-dark mb-10 max-w-3xl mx-auto leading-tight">
          Rejoignez le marché local <br /> nouvelle génération.
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
           <Button variant="secondary" size="lg" className="px-10 py-4 font-bold" onClick={() => navigate('register')}>Créer un compte</Button>
           <Button variant="outline" size="lg" className="px-10 py-4 font-bold" onClick={() => {
             const el = document.getElementById('how-it-works');
             if (el) el.scrollIntoView({ behavior: 'smooth' });
           }}>En savoir plus</Button>
        </div>
      </section>

      <footer id="footer" className="bg-white pb-12 pt-12 border-t border-gray-100 text-sm">
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
           <div>
             <h4 className="font-bold mb-4">SOKOLINK</h4>
             <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">La marketplace locale nouvelle génération à Bujumbura. Simple. Rapide. Sécurisée.</p>
           </div>
           <div>
             <h4 className="font-bold mb-4">Plateforme</h4>
             <ul className="space-y-2 text-gray-500 text-xs">
               <li><button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-soko-orange">Comment ça marche</button></li>
               <li><button onClick={() => navigate('register')} className="hover:text-soko-orange">Acheter</button></li>
               <li><button onClick={() => navigate('register')} className="hover:text-soko-orange">Vendre</button></li>
             </ul>
           </div>
           <div>
             <h4 className="font-bold mb-4">Support</h4>
             <ul className="space-y-2 text-gray-500 text-xs">
               <li><button className="hover:text-soko-orange">Centre d'aide</button></li>
               <li><button className="hover:text-soko-orange">Règles de communauté</button></li>
               <li><button className="hover:text-soko-orange">Sécurité</button></li>
             </ul>
           </div>
           <div>
             <h4 className="font-bold mb-4">Contact & Légal</h4>
             <ul className="space-y-2 text-gray-500 text-xs">
               <li>contact@sokolink.com</li>
               <li>+257 69 00 00 00</li>
               <li><button className="hover:text-soko-orange">Mentions légales</button></li>
             </ul>
           </div>
        </div>
        <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center text-xs text-gray-400">
          <div>© 2025 SOKOLINK. Tous droits réservés.</div>
          <div className="flex gap-4">
            <span>Muha</span>
            <span>Mukaza</span>
            <span>Ntahangwa</span>
          </div>
        </div>
      </footer>
    </div>
  );
};