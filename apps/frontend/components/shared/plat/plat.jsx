"use client";
import Image from "next/image";
import React, { useState } from "react";
import "./plat.css";
import Button from "../button/button";
import { useCart } from "@/context/CartContext";
import { useParams } from "next/navigation";
import { seeMore, tarif } from "@/helpers/function";

const Plat = ({ data, acceptOrder }) => {
    const { addToCart } = useCart();
    const { slug } = useParams();
    const [seeMoreNb, setSeeMoreNb] = useState(120);
    const [activeAcc, setActiveAcc] = useState(
        data.accompagnements ? data.accompagnements[0] : null,
    );
   
    return (
        <div className="plat-card">
            <Image
                src={
                    data.imagePath
                        ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${data.imagePath}`
                        : `${process.env.NEXT_PUBLIC_STORAGE_URL}/restaurants/plats/default.jpg`
                }
                alt="image-du-plat"
                height={400}
                width={400}
                className="plat-image"
            />
            <span className="plat-category">{data.categorie.designation}</span>
            <p className="plat-name">{data.name}</p>
            <p className="plat-description" onClick={() => setSeeMoreNb(500)}>
                {seeMore(data.description, seeMoreNb)}
            </p>
            <div className="accompagnements">
                {data.accompagnements?.map((ac) => (
                    <span
                        key={ac.id}
                        onClick={() => setActiveAcc(ac)}
                        className={
                            activeAcc.id == ac.id
                                ? "accompagnement active"
                                : "accompagnement"
                        }
                    >
                        {ac.designation}
                    </span>
                ))}
            </div>

            <div className="plat-footer">
                <p className="plat-prix">{tarif(data.price)}</p>
                {acceptOrder === 1 && (
                    <Button onClick={() => addToCart(slug, data, activeAcc)}>
                        <i className="fi fi-sr-shopping-cart"></i>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Plat;
