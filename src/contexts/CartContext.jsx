import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calcul du total
    const newTotal = cart.reduce((sum, item) => sum + (item.purchasePrice + item.reconditioningCost), 0);
    setTotal(newTotal);
  }, [cart]);

  const addToCart = (phone) => {
    setCart([...cart, phone]);
  };

  const removeFromCart = (phoneId) => {
    setCart(cart.filter(item => item.id !== phoneId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    total,
    addToCart,
    removeFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
