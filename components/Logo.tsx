import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', className = '' }) => {
  const isLight = variant === 'light';
  
  return (
    <div className={`flex items-center gap-3 ${className} select-none`}>
      {/* Icon Graphic - Square style based on screenshot */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isLight ? 'bg-white text-soko-dark' : 'bg-soko-dark text-white'}`}>
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-5 h-5"
        >
           <circle cx="9" cy="21" r="1" />
           <circle cx="20" cy="21" r="1" />
           <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      </div>
      
      {/* Text Typography */}
      <div className={`font-display font-bold text-xl tracking-wide ${isLight ? 'text-white' : 'text-soko-dark'}`}>
        SOKOLINK
      </div>
    </div>
  );
};