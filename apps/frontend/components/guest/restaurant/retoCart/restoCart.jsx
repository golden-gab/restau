"use client";
import React, { useRef } from "react";
import "./restoCart.css";
import Button from "@/components/shared/button/button";
import { useCart } from "@/context/CartContext";
import { useParams } from "next/navigation";
import { sendRequest, tarif } from "@/helpers/function";
import useSWRMutation from "swr/mutation";
import { toast } from "sonner";
import Spinner from "@/components/shared/spinner/spinner";

const RestoCart = ({ tel, restoId }) => {
    const { slug } = useParams();
    const nav = useRef();
    const shadow = useRef();
    const { trigger, isMutating } = useSWRMutation(
        `${process.env.NEXT_PUBLIC_API_URL}/commandes`,
        sendRequest,
    );
    const { carts, removeFromCart, addToCart, getTotal, getTotalItem } =
        useCart();
    const cart = carts[slug] || [];

    const message =
        `Bonjour, je souhaite commander :\n` +
        cart
            .map(
                (item) =>
                    `- ${item.plat.name}${item.accompagnement ? ` (${item.accompagnement.designation})` : ""} x${item.qty} (${tarif(item.plat.price * item.qty)})`,
            )
            .join("\n") +
        `\nTotal : ${tarif(getTotal(slug))} \n` +
        `\nCommande générée depuis Mealop`;

    const whatsappUrl = `https://wa.me/${tel}?text=${encodeURIComponent(
        message,
    )}`;
    function handleOrder() {
        try {
            const result = trigger({
                restaurant_id: restoId,
                plats: cart.map((item) => ({
                    platId: item.plat.id,
                    accompagnementId: item.accompagnement?.id ?? null,
                    quantite: item.qty,
                })),
            });
            if (result) {
                window.open(whatsappUrl, "_blank");
            }
        } catch (error) {
            toast.error("Erreur lors de la commande ");
            alert("Erreur lors de la commande. Veuillez réessayer.");
        }
    }
    function handleCart() {
        nav.current.classList.toggle("active");
        shadow.current.classList.toggle("active");
    }
    return (
        <>
            <div className="resto-cart-container" ref={nav}>
                <div className="resto-cart">
                    <div className="resto-cart-header">
                        <h3>Panier</h3>
                    </div>
                    <ul className="resto-cart-list">
                        {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <li className="resto-cart-item" key={item.key}>
                                    <div className="resto-cart-item-text">
                                        <p>
                                            {item.plat.name} -{" "}
                                            {item.accompagnement && (
                                                <span className="resto-cart-item-acc">
                                                    {
                                                        item.accompagnement
                                                            .designation
                                                    }
                                                </span>
                                            )}
                                        </p>

                                        <span className="resto-cart-item-prix">
                                            {tarif(item.plat.price)}
                                        </span>
                                    </div>
                                    <div className="resto-cart-item-footer">
                                        <div className="resto-cart-item-action">
                                            <i
                                                className="fi fi-sr-minus-circle"
                                                onClick={() =>
                                                    removeFromCart(
                                                        slug,
                                                        item.key,
                                                    )
                                                }
                                            ></i>
                                            <div>{item.qty}</div>
                                            <i
                                                className="fi fi-sr-add"
                                                onClick={() =>
                                                    addToCart(
                                                        slug,
                                                        item.plat,
                                                        item.accompagnement,
                                                    )
                                                }
                                            ></i>
                                        </div>
                                        <span className="main-color">
                                            {tarif(item.plat.price * item.qty)}
                                        </span>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <div className="cart-empty">
                                <i className="fi fi-rr-shopping-cart"></i>
                                <p>Votre panier est vide</p>
                            </div>
                        )}
                    </ul>
                    <div className="resto-cart-footer">
                        <div className="reto-cart-total">
                            <p>Total</p>
                            <p className="reto-cart-total-prix">
                                {tarif(getTotal(slug))}
                            </p>
                        </div>
                        {cart.length > 0 && (
                            <Button onClick={handleOrder} disabled={isMutating}>
                                {isMutating ? (
                                    <Spinner />
                                ) : (
                                    "Commander sur WhatsApp"
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <div className="card-shadow" ref={shadow}></div>
            <Button type="full-btn btn-card" onClick={handleCart}>
                <i className="fi fi-rr-shopping-cart"></i>
                <div className="btn-card-quantite">{getTotalItem(slug)}</div>
            </Button>
        </>
    );
};

export default RestoCart;
