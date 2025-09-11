import React from "react";
import "./restoInfo.css";
import Image from "next/image";
import Link from "next/link";

const RestoInfo = () => {
    return (
        <div className="resto-info">
            <Image
                src={"/logo-noir.png"}
                alt="logo-du-restaurant"
                height={300}
                width={300}
                className="resto-logo"
            />
            <div className="resto-text">
                <p className="resto-name">Le petit Gourmet</p>
                <div className="resto-details">
                    <p className="resto-detail">
                        <i className="fi fi-rr-marker"></i>
                        <span>Douala</span>
                    </p>
                    <p className="resto-detail">
                        <i className="fi fi-rr-phone-flip"></i>
                        <span>+237 670 00 00 00</span>
                    </p>
                    <Link href={"#horaires"} className="resto-detail">
                        <i className="fi fi-rr-clock-three"></i>
                        <span><u>Horaires</u></span>
                    </Link>
                </div>
                <p className="resto-description">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Dicta soluta beatae error maxime delectus porro ratione,
                </p>
            </div>
        </div>
    );
};

export default RestoInfo;
