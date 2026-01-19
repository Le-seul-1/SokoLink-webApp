// Ce fichier génère des images SVG encodées en base64 pour garantir qu'il n'y a aucun lien brisé
// et que l'application charge instantanément sans dépendances externes.

const SOKO_COLORS = {
  dark: '#01003c',
  orange: '#ff8a00',
  blue: '#4354ff',
  light: '#f8fafc',
  green: '#10b981', // Pour les légumes
  red: '#ef4444',
};

// Fonction utilitaire pour encoder une chaîne Unicode (avec emojis) en Base64 de manière sécurisée
const encodeSVG = (svg: string) => {
  // Utilisation de encodeURIComponent + replace pour convertir les caractères Unicode en séquence d'octets lisibles par btoa
  const encoded = btoa(
    encodeURIComponent(svg).replace(/%([0-9A-F]{2})/g, (match, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );
  return `data:image/svg+xml;base64,${encoded}`;
};

export const getPlaceholderImage = (category: string, title: string, width = 600, height = 800) => {
  let bgGradientStart = SOKO_COLORS.dark;
  let bgGradientEnd = SOKO_COLORS.blue;
  let icon = '📦';

  // Personnalisation basée sur la catégorie pour un look visuel distinct
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes('légume') || lowerCat.includes('alimentation')) {
    bgGradientStart = '#065f46'; // Dark Green
    bgGradientEnd = '#34d399'; // Light Green
    icon = '🥬';
  } else if (lowerCat.includes('poulet') || lowerCat.includes('élevage')) {
    bgGradientStart = '#9a3412'; // Dark Orange
    bgGradientEnd = SOKO_COLORS.orange;
    icon = '🐔';
  } else if (lowerCat.includes('tech') || lowerCat.includes('phone')) {
    bgGradientStart = '#1e3a8a'; // Dark Blue
    bgGradientEnd = '#3b82f6'; // Blue
    icon = '📱';
  } else if (lowerCat.includes('mode') || lowerCat.includes('vêtement')) {
    bgGradientStart = '#4c1d95'; // Dark Purple
    bgGradientEnd = '#a78bfa'; // Purple
    icon = '👟';
  } else if (lowerCat.includes('photo') || lowerCat.includes('camera')) {
    bgGradientStart = '#374151'; // Gray
    bgGradientEnd = '#9ca3af'; // Light Gray
    icon = '📷';
  }

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad-${title.replace(/\s/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${bgGradientStart};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${bgGradientEnd};stop-opacity:1" />
      </linearGradient>
      <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.1)" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad-${title.replace(/\s/g, '')})" />
    <rect width="100%" height="100%" fill="url(#pattern)" />
    
    <g transform="translate(${width/2}, ${height/2})">
      <circle cx="0" cy="0" r="60" fill="rgba(255,255,255,0.2)" />
      <text x="0" y="10" font-family="sans-serif" font-size="60" text-anchor="middle" dominant-baseline="middle">${icon}</text>
    </g>
    
    <text x="${width/2}" y="${height - 40}" font-family="sans-serif" font-weight="bold" font-size="24" fill="rgba(255,255,255,0.9)" text-anchor="middle">${category}</text>
  </svg>
  `;

  return encodeSVG(svg);
};

export const getHeroImage = (type: 'shoes' | 'clothes' | 'camera') => {
  let icon = '';
  let color1 = '';
  let color2 = '';

  if (type === 'shoes') {
    icon = '👟';
    color1 = '#f97316';
    color2 = '#fff7ed';
  } else if (type === 'clothes') {
    icon = '👕';
    color1 = '#3b82f6';
    color2 = '#eff6ff';
  } else {
    icon = '📷';
    color1 = '#64748b';
    color2 = '#f8fafc';
  }

  const svg = `
  <svg width="600" height="800" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${color2}"/>
    <rect width="100%" height="100%" fill="url(#grid)"/>
    <text x="50%" y="50%" font-size="100" text-anchor="middle" dominant-baseline="middle">${icon}</text>
  </svg>
  `;
  return encodeSVG(svg);
};

export const getAuthImage = (type: 'login' | 'register') => {
  const isLogin = type === 'login';
  const title = isLogin ? 'CONNEXION' : 'INSCRIPTION';
  
  const svg = `
  <svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="authGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${SOKO_COLORS.dark};stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1e1b4b;stop-opacity:1" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#authGrad)" />
    <rect width="100%" height="100%" fill="url(#grid)" />
    
    <!-- Abstract Shapes -->
    <circle cx="10%" cy="10%" r="300" fill="${SOKO_COLORS.orange}" opacity="0.1" />
    <circle cx="90%" cy="90%" r="400" fill="${SOKO_COLORS.blue}" opacity="0.1" />
    
    <text x="50%" y="50%" font-family="sans-serif" font-weight="900" font-size="120" fill="rgba(255,255,255,0.05)" text-anchor="middle" dominant-baseline="middle" transform="rotate(-5, 800, 450)">
      SOKOLINK
    </text>
  </svg>
  `;
  return encodeSVG(svg);
};