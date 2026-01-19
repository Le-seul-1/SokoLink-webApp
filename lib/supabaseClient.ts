import { createClient } from '@supabase/supabase-js';

// Clés de configuration fournies
const FALLBACK_URL = 'https://qfntsypificfdhsuqmnm.supabase.co';
const FALLBACK_KEY = 'sb_publishable_oi4eBQ-xWezmj_qv2S13sA_n5R12GTw';

// Récupération sécurisée des variables d'environnement avec fallback
let supabaseUrl = FALLBACK_URL;
let supabaseAnonKey = FALLBACK_KEY;

try {
  // On tente de lire depuis l'environnement si disponible (local dev)
  // @ts-ignore
  const env = (import.meta as any).env || {};
  if (env.VITE_SUPABASE_URL) supabaseUrl = env.VITE_SUPABASE_URL;
  if (env.VITE_SUPABASE_ANON_KEY) supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;
} catch (error) {
  // En cas d'erreur (ex: import.meta n'existe pas), on garde les valeurs de fallback
  console.log('Utilisation des clés Supabase par défaut');
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Attention: Les clés Supabase sont manquantes.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);