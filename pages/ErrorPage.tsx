import React from 'react';
import { Button } from '../components/ui/Button';
import { Page } from '../App';
import { AlertTriangle } from 'lucide-react';

interface ErrorPageProps {
  navigate: (page: Page) => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ navigate }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-gray-50">
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-8 animate-bounce">
        <AlertTriangle size={48} />
      </div>
      
      <h1 className="font-display font-black text-4xl md:text-5xl text-soko-dark mb-4">
        Oups, un problème est survenu.
      </h1>
      
      <p className="font-body text-gray-500 text-lg max-w-lg mb-10">
        La page que vous recherchez semble introuvable ou une erreur s'est produite. Ne vous inquiétez pas, vous pouvez revenir en lieu sûr.
      </p>
      
      <div className="flex gap-4">
        <Button variant="primary" size="lg" onClick={() => navigate('home')}>
          Retour à l'accueil
        </Button>
        <Button variant="outline" size="lg" onClick={() => window.location.reload()}>
          Recharger la page
        </Button>
      </div>
    </div>
  );
};