import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Onboarding } from './pages/Onboarding';
import { BuyerDashboard } from './pages/BuyerDashboard';
import { SellerDashboard } from './pages/SellerDashboard';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { OrderDetails } from './pages/OrderDetails';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { Listing } from './pages/Listing';
import { ProductDetails } from './pages/ProductDetails';
import { PublicSellerProfile } from './pages/PublicSellerProfile';
import { ErrorPage } from './pages/ErrorPage';
import { supabase } from './lib/supabaseClient';
import { Product, CartItem, Order } from './types';
import { getPlaceholderImage } from './utils/images';

export type Page = 'home' | 'login' | 'register' | 'onboarding' | 'buyer-dashboard' | 'seller-dashboard' | 'cart' | 'notifications' | 'settings' | 'error' | 'listing' | 'product-details' | 'seller-profile' | 'checkout' | 'order-confirmation' | 'order-details';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [session, setSession] = useState<any>(null);
  
  // Navigation State
  const [listingConfig, setListingConfig] = useState<{type: 'search' | 'category' | 'collection' | 'similar', value: string, productName?: string}>({ type: 'category', value: 'all' });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Cart State (Lifted Up)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '101', title: 'Montre Connectée Pro', price: 45000, discount: 20, category: 'Tech', image: getPlaceholderImage('Tech', 'Smartwatch'), sellerId: 's1', quantity: 1 },
    { id: '102', title: 'Sneakers Sport Run', price: 35000, discount: 15, category: 'Mode', image: getPlaceholderImage('Mode', 'Sneakers'), sellerId: 's2', quantity: 2 },
  ]);

  // Orders State (History)
  const [orders, setOrders] = useState<Order[]>([
    // Mock History Order
    {
        id: 'CMD-OLD-1',
        date: '15 Oct 2024',
        status: 'delivered',
        total: 12500,
        paymentCode: 'OLD-PAY',
        items: [{ id: '999', title: 'T-shirt Coton Bio', price: 12500, category: 'Mode', image: getPlaceholderImage('Mode', 'TShirt'), sellerId: 's1', quantity: 1 }]
    }
  ]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session && (currentPage === 'login' || currentPage === 'register')) {
           setCurrentPage('home');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session && (currentPage === 'login' || currentPage === 'register')) {
        setCurrentPage('onboarding');
      }
    });

    return () => subscription.unsubscribe();
  }, [currentPage]);

  const navigate = (page: Page) => {
    window.scrollTo({ top: 0, behavior: 'auto' }); 
    setCurrentPage(page);
  };

  const navigateToListing = (type: 'search' | 'category' | 'collection' | 'similar', value: string, productName?: string) => {
    setListingConfig({ type, value, productName });
    navigate('listing');
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    navigate('product-details');
  };

  const navigateToOrder = (order: Order) => {
    setSelectedOrder(order);
    navigate('order-details');
  };

  // Cart Actions
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: string, change: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + change;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addOrder = (items: CartItem[], total: number, paymentCode: string) => {
    const newOrder: Order = {
        id: `CMD-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: [...items], // Copy items
        total: total,
        status: 'pending',
        paymentCode: paymentCode
    };
    setOrders(prev => [newOrder, ...prev]);
    setSelectedOrder(newOrder); // Set as current for confirmation/details page
    return newOrder;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigate={navigate} addToCart={addToCart} />;
      case 'login':
        return <Login navigate={navigate} />;
      case 'register':
        return <Register navigate={navigate} />;
      case 'onboarding':
        return <Onboarding navigate={navigate} />;
      case 'buyer-dashboard':
        return (
          <BuyerDashboard 
            navigate={navigate} 
            navigateToListing={navigateToListing} 
            navigateToProduct={navigateToProduct}
            addToCart={addToCart}
          />
        );
      case 'seller-dashboard':
        return <SellerDashboard navigate={navigate} />;
      case 'cart':
        return (
          <Cart 
            navigate={navigate} 
            items={cartItems} 
            updateQuantity={updateCartQuantity} 
            removeItem={removeFromCart} 
          />
        );
      case 'checkout':
        return (
          <Checkout 
            navigate={navigate}
            items={cartItems}
            clearCart={clearCart}
            addOrder={addOrder}
          />
        );
      case 'order-confirmation':
        return (
            <OrderConfirmation 
                navigate={navigate} 
                lastOrder={selectedOrder} 
            />
        );
      case 'order-details':
        return (
            <OrderDetails 
                navigate={navigate} 
                order={selectedOrder}
            />
        );
      case 'notifications':
        return <Notifications navigate={navigate} />;
      case 'settings':
        return (
            <Settings 
                navigate={navigate} 
                orders={orders} 
                navigateToOrder={navigateToOrder}
            />
        );
      case 'listing':
        return (
          <Listing 
            navigate={navigate} 
            config={listingConfig} 
            onProductClick={navigateToProduct} 
            addToCart={addToCart}
          />
        );
      case 'product-details':
        return (
          <ProductDetails 
            navigate={navigate} 
            product={selectedProduct} 
            navigateToListing={navigateToListing}
            addToCart={addToCart}
            navigateToProduct={navigateToProduct}
          />
        );
      case 'seller-profile':
        return <PublicSellerProfile navigate={navigate} />;
      case 'error':
        return <ErrorPage navigate={navigate} />;
      default:
        return <ErrorPage navigate={navigate} />;
    }
  };

  return (
    <Layout navigate={navigate} currentPage={currentPage} cartItemCount={cartItems.length}>
      {renderPage()}
    </Layout>
  );
};

export default App;
