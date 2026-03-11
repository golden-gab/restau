import React from "react";
// import logo from '../../../assets/logo.png';
import "./logo.css";
import Image from "next/image";

const Logo = () => {
    return (
        <div className="logo-container">
            <Image
                src="/logo3.png"
                alt="Logo"
                width={140}
                height={140}
                priority
                className="logo-img"
            />
        </div>
    );
};

export default Logo;
