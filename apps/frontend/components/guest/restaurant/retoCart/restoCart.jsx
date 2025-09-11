import React from "react";
import "./restoCart.css";
import Button from "@/components/shared/button/button";
import { useCart } from "@/context/CartContext";
import { useParams } from "next/navigation";
import { tarif } from "@/helpers/function";

const RestoCart = ({tel}) => {
    const { slug } = useParams();
    const { carts, removeFromCart, addToCart, getTotal } = useCart();
    const cart = carts[slug] || [];
    const message =  `Bonjour, je souhaite commander :\n` +
          cart
              .map(
                  (item) =>
                      `- ${item.plat.name} x${item.qty} (${tarif(
                          item.plat.price * item.qty
                      )})`
              )
              .join("\n") +
          `\nTotal : ${tarif(getTotal(slug))} \n`+
          `\nCommande générée depuis ...`

    const whatsappUrl = `https://wa.me/${tel}?text=${encodeURIComponent(
        message
    )}`;
    return (
        <div className="resto-cart-container">
            <div className="resto-cart">
                <div className="resto-cart-header">
                    <h3>- Panier</h3>
                </div>
                <ul className="resto-cart-list">
                    {cart.length > 0 ?
                        cart.map((item, index) => (
                            <li className="resto-cart-item" key={index}>
                                <div className="resto-cart-item-text">
                                    <p>{item.plat.name}</p>
                                    <span className="resto-cart-item-prix">
                                        {tarif( item.plat.price)}
                                    </span>
                                </div>
                                <div className="resto-cart-item-footer">
                                    <div className="resto-cart-item-action">
                                        <i
                                            className="fi fi-sr-minus-circle"
                                            onClick={() =>
                                                removeFromCart(slug, item.plat.id)
                                            }
                                        ></i>
                                        <div>{item.qty}</div>
                                        <i
                                            className="fi fi-sr-add"
                                            onClick={() =>
                                                addToCart(slug, item.plat)
                                            }
                                        ></i>
                                    </div>
                                    <span className="main-color">
                                        {tarif(item.plat.price * item.qty)}
                                    </span>
                                </div>
                            </li>
                        )):
                        <div className="cart-empty">
                            <i className="fi fi-rr-shopping-cart"></i>
                            <p>Votre panier est vide</p>
                        </div>
                    }
                </ul>
                <div className="resto-cart-footer">
                    <div className="reto-cart-total">
                        <p>Total</p>
                        <p className="reto-cart-total-prix">{tarif(getTotal(slug))}</p>
                    </div>
                    {cart.length > 0 && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <Button>
                            Commander sur WhatsApp
                        </Button>
                    </a>}
                    
                </div>
            </div>
        </div>
    );
};

export default RestoCart;
