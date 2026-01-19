import React from 'react';

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  sellerId: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g., Acheteur, Vendeur
  text: string;
  initials: string;
}

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  isPrimary?: boolean; // For the FAB button on mobile
}