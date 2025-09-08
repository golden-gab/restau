import Image from "next/image";
import React from "react";
import "./plat.css";
import Button from "../button/button";

const Plat = ({ data }) => {
    return (
        <div className="plat-card">
            <Image
                src={data.image}
                alt="image-du-plat"
                height={400}
                width={400}
                className="plat-image"
            />
            <span className="plat-category">{data.categorie}</span>
            <p className="plat-name">{data.name}</p>
            <p className="plat-description">{data.description}</p>
            <div className="plat-footer">
                <p className="plat-prix">{data.prix} FCFA</p>
                <Button>
                    <i className="fi fi-sr-shopping-cart"></i>
                </Button>
            </div>
        </div>
    );
};

export default Plat;
