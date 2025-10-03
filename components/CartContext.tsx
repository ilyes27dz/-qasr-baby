import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type CartItem = {
  id: string;
  name: string;
  price?: string;
  qty: number;
  // يمكنك إضافة حقول أخرى مثل image, sku, meta...
};

type CartContextType = {
  items: CartItem[];
  cartCount: number;
  addToCart: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toastPayload: { title: string } | null;
  hideToast: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

const STORAGE_KEY = "qasr_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [toastPayload, setToastPayload] = useState<{ title: string } | null>(null);
  const [toastTimer, setToastTimer] = useState<number | null>(null);

  // load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setItems(JSON.parse(raw));
      }
    } catch (e) {
      console.warn("Failed to load cart from localStorage", e);
    }
  }, []);

  // persist when items change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Failed to save cart to localStorage", e);
    }
  }, [items]);

  const cartCount = items.reduce((s, it) => s + (it.qty || 0), 0);

  const hideToast = useCallback(() => {
    setToastPayload(null);
    if (toastTimer) {
      window.clearTimeout(toastTimer);
      setToastTimer(null);
    }
  }, [toastTimer]);

  const addToCart = useCallback((item: Omit<CartItem, "qty"> & { qty?: number }) => {
    setItems(prev => {
      const qtyToAdd = item.qty && item.qty > 0 ? item.qty : 1;
      // try find by id
      const idx = prev.findIndex(p => p.id === item.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qtyToAdd };
        return copy;
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: qtyToAdd }];
    });

    setToastPayload({ title: item.name || "منتج" });
    if (toastTimer) {
      window.clearTimeout(toastTimer);
    }
    const t = window.setTimeout(() => {
      setToastPayload(null);
      setToastTimer(null);
    }, 4000);
    setToastTimer(t);
  }, [toastTimer]);

  const removeFromCart = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.id !== id));
      return;
    }
    setItems(prev => prev.map(i => (i.id === id ? { ...i, qty } : i)));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <CartContext.Provider value={{
      items,
      cartCount,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toastPayload,
      hideToast
    }}>
      {children}
    </CartContext.Provider>
  );
}