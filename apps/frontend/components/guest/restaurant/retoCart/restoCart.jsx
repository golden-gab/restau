import React from "react";
import "./restoCart.css";
import Button from "@/components/shared/button/button";

const RestoCart = () => {
    return (
        <div className="resto-cart-container">
            <div className="resto-cart">
                <div className="resto-cart-header">
                    <h3>- Panier</h3>
                </div>
                <ul className="resto-cart-list">
                    <li className="resto-cart-item">
                        <div className="resto-cart-item-text">
                            <p>Poulet braîsé accompagné de la sauce du chef</p>
                            <span className="resto-cart-item-prix">
                                1 500 FCFA
                            </span>
                        </div>
                        <div className="resto-cart-item-footer">
                            <div className="resto-cart-item-action">
                                <i className="fi fi-sr-minus-circle"></i>
                                <div>2</div>
                                <i className="fi fi-sr-add"></i>
                            </div>
                            <span className="main-color">3 000 FCA</span>
                        </div>
                    </li>
                    <li className="resto-cart-item">
                        <div className="resto-cart-item-text">
                            <p>Rôti de boeuf</p>
                            <span className="resto-cart-item-prix">
                                1 500 FCFA
                            </span>
                        </div>
                        <div className="resto-cart-item-footer">
                            <div className="resto-cart-item-action">
                                <i className="fi fi-sr-minus-circle"></i>
                                <div>2</div>
                                <i className="fi fi-sr-add"></i>
                            </div>
                            <span className="main-color">3 000 FCA</span>
                        </div>
                    </li>
                </ul>
                <div className="resto-cart-footer">
                    <div className="reto-cart-total">
                        <p>Total</p>
                        <p className="reto-cart-total-prix">6 000 FCFA</p>
                    </div>
                    <Button>Commander</Button>
                </div>
            </div>
        </div>
    );
};

export default RestoCart;
