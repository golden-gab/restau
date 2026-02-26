import React from "react";
import "./restoInfo.css";
import Image from "next/image";
import Link from "next/link";
import { seeMore } from "@/helpers/function";
import { toast } from "sonner";

const RestoInfo = ({ data }) => {
     function share() {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Lien copié dans le presse papier");
    }
    console.log(data)
    return (
        <div className="resto-section"> 
            <Image
                alt="Image du restaurant"
                height={500}
                width={800}
                src={
                            data.banniere
                                ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${data.banniere}`
                                : `${process.env.NEXT_PUBLIC_STORAGE_URL}/restaurants/bannieres/default.jpg`
                        }
                className="resto-img"
            />
            <div className="resto-overlay"></div>
            <div className="resto-container">
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
                        <div className="resto-name-ville">
                            <span className="resto-name">{data.name}</span>
                            {data.ville && (
                                <p className="resto-detail resto-location">
                                    <i className="fi fi-rr-marker"></i>
                                    <span>{data.ville}</span>
                                </p>
                            )}
                        
                        </div>
                        <div className="resto-specialities">
                            {
                                data.specialities && data.specialities.map((speciality, index) => (
                                    <div key={index} className="resto-speciality">
                                        {speciality.designation}
                                    </div>
                                ))
                            }
                        </div>
                        <p className="resto-description">{seeMore(data.description,150) }</p>
                    </div>
                </div>
                <div className="resto-actions">
                    <Link href={"#horaires"} className="resto-action">
                        <i className="fi fi-rr-clock-three"></i>
                    </Link>
                    <div className="resto-action" onClick={share}>
                        <i className="fi fi-rr-share"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestoInfo;
