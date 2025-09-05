import React from "react";
import "./cardRestau.css";
import Image from "next/image";

const CardRestau = ({userPosition}) => {
    return (
        <div className="restaurant-card">
            <div className="restaurant-details">
                <Image
                    src={"/logo-white.png"}
                    width={500}
                    height={500}
                    alt="restaurant-logo"
                    className="restaurant-logo"
                />
                <div className="restaurant-info">
                    <p className="restaurant-name">Le Petit Gourmet</p>
                    <span className="restaurant-number">+237 00 00 00 00</span>
                </div>
            </div>
            <div className="restaurant-actions">
                <i className="fi fi-sr-up-right-from-square" title="En savoir plus"></i>
                <i className="fi fi-sr-diamond-turn-right" title="Itinéraire"></i>
            </div>
        </div>
    );
};

export default CardRestau;
