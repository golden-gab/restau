import React from "react";
import "./cardRestau.css";
import Image from "next/image";
import Link from "next/link"; 

const CardRestau = ({ userPosition,data }) => {
   
    return (
        <div className="restaurant-card">
            <div className="restaurant-details">
                <Image
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${data.logoPath}`}
                    width={500}
                    height={500}
                    alt="restaurant-logo"
                    className="restaurant-logo"
                />
                <div className="restaurant-info">
                    <p className="restaurant-name">{data.name}</p>
                    <span className="restaurant-number">{data.phone}</span>
                </div>
            </div>
            <div className="restaurant-actions">
                <Link href={"/restaurants/"+data.slug}>
                    <i
                        className="fi fi-sr-up-right-from-square"
                        title="En savoir plus"
                    ></i>
                </Link>

                <i
                    className="fi fi-sr-diamond-turn-right"
                    title="Itinéraire"
                ></i>
            </div>
        </div>
    );
};

export default CardRestau;
