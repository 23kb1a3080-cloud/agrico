import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('agriconnect_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 101,
        title: "100% Certified Organic Fresh Tomatoes",
        price: 45,
        unit: "KG",
        quantity: 10,
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
        farmerId: 1,
        farmerName: "Ramesh Patel",
        farmingType: "ORGANIC"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('agriconnect_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += Number(quantity);
        return updated;
      }
      return [...prev, {
        id: product.id,
        title: product.title,
        price: product.price,
        unit: product.unit,
        quantity: Number(quantity),
        image: product.image,
        farmerId: product.farmerId,
        farmerName: product.farmerName,
        farmingType: product.farmingType
      }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.id === productId ? { ...item, quantity: Number(newQuantity) } : item)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

