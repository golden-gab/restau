import React from "react";
import "./restoInfo.css";
import Image from "next/image";
import Link from "next/link";

const RestoInfo = ({ data }) => {

    return (
        <div className="resto-info">
            <Image
                src={
                    data.logoPath
                        ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${data.logoPath}`
                        : `${process.env.NEXT_PUBLIC_STORAGE_URL}/restaurants/logos/default.jpg`
                }
                alt="logo-du-restaurant"
                height={300}
                width={300}
                className="resto-logo"
            />
            <div className="resto-text">
                <p className="resto-name">{data.name}</p>
                <div className="resto-details">
                    {data.ville && (
                        <p className="resto-detail">
                            <i className="fi fi-rr-marker"></i>
                            <span>{data.ville}</span>
                        </p>
                    )}
                    {data.phone && (
                        <p className="resto-detail">
                            <i className="fi fi-rr-phone-flip"></i>
                            <span>{data.phone}</span>
                        </p>
                    )}
                    {data.openingHours && (
                        <Link href={"#horaires"} className="resto-detail">
                            <i className="fi fi-rr-clock-three"></i>
                            <span>
                                <u>Horaires</u>
                            </span>
                        </Link>
                    )}
                </div>
                <p className="resto-description">{data.description}</p>
            </div>
        </div>
    );
};

export default RestoInfo;
