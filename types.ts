import React from 'react';

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  sellerId: string;
  discount?: number; // Percentage off, e.g., 20 for -20%
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentCode: string;
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

export type Page = 'home' | 'login' | 'register' | 'onboarding' | 'buyer-dashboard' | 'seller-dashboard' | 'cart' | 'notifications' | 'settings' | 'error' | 'listing' | 'product-details' | 'seller-profile' | 'checkout' | 'order-confirmation' | 'order-details';
