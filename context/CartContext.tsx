import React, { createContext, useContext, useState } from 'react';

interface CardSet {
  id?: string;
  name: string;
  number?: string;
  series?: string;
  printedTotal?: number;
  releaseDate?: string;
}

interface CardItem {
  id: number;
  name: string;
  set: string | CardSet;
  price: number;
  image: string;
  images?: {
    small: string;
    large: string;
  };
  cardmarket?: {
    prices: {
      averageSellPrice: number;
      lowPrice?: number;
      trendPrice?: number;
      germanProLow?: number | null;
      suggestedPrice?: number | null;
    };
  };
  quantity: number;
}

interface CartContextType {
  cartItems: CardItem[];
  addToCart: (card: Omit<CardItem, 'quantity'>) => void;
  clearCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CardItem[]>([]);

  const addToCart = (card: Omit<CardItem, 'quantity'>) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === card.id);
      if (existing) {
        return prev.map((item) =>
          item.id === card.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...card, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(prev => 
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 