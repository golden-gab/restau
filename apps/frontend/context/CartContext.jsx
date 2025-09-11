"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    // Structure : { [restaurantSlug]: [ { plat, qty }, ... ] }
    const [carts, setCarts] = useState({});

    function addToCart(restaurant, plat) {
        setCarts((prev) => {
            const cart = prev[restaurant] || [];
            const found = cart.find((item) => item.plat.id === plat.id);
            let newCart;
            if (found) {
                newCart = cart.map((item) =>
                    item.plat.id === plat.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            } else {
                newCart = [...cart, { plat, qty: 1 }];
            }
            return { ...prev, [restaurant]: newCart };
        });
    }

    function removeFromCart(restaurant, platId) {
        setCarts((prev) => {
            const cart = prev[restaurant] || [];
            const newCart = cart
                .map((item) =>
                    item.plat.id === platId
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
        let somme = 0;
        const cart = carts[restaurantSlug] || []
        cart.map(
            (item) => (somme += item.plat.price * item.qty)
        );
        return somme;
    }
    return (
        <CartContext.Provider
            value={{ carts, addToCart, removeFromCart, clearCart, getTotal }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
