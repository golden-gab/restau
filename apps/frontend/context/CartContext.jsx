"use client";
import { createContext, useContext, useState } from "react";
const CartContext = createContext();

export function CartProvider({ children }) {
    const [carts, setCarts] = useState({});

    function getItemKey(platId, accompagnementId) {
        return `${platId}_${accompagnementId ?? "none"}`;
    }

    function addToCart(restaurant, plat, accompagnement = null) {
        setCarts((prev) => {
            const cart = prev[restaurant] || [];
            const key = getItemKey(plat.id, accompagnement?.id);
            const found = cart.find((item) => item.key === key);
            let newCart;
            if (found) {
                newCart = cart.map((item) =>
                    item.key === key
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            } else {
                newCart = [...cart, { key, plat, accompagnement, qty: 1 }];
            }
            return { ...prev, [restaurant]: newCart };
        });
    }

    function removeFromCart(restaurant, key) {
        setCarts((prev) => {
            const cart = prev[restaurant] || [];
            const newCart = cart
                .map((item) =>
                    item.key === key
                        ? { ...item, qty: item.qty - 1 }
                        : item
                )
                .filter((item) => item.qty > 0);
            return { ...prev, [restaurant]: newCart };
        });
    }

    function clearCart(restaurant) {
        setCarts((prev) => {
            const newCarts = { ...prev };
            delete newCarts[restaurant];
            return newCarts;
        });
    }

    function getTotal(restaurantSlug) {
        const cart = carts[restaurantSlug] || [];
        return cart.reduce((somme, item) => somme + item.plat.price * item.qty, 0);
    }

    function getTotalItem(restaurantSlug) {
        const cart = carts[restaurantSlug] || [];
        return cart.reduce((somme, item) => somme + item.qty, 0);
    }

    return (
        <CartContext.Provider
            value={{ carts, addToCart, removeFromCart, clearCart, getTotal, getTotalItem }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}