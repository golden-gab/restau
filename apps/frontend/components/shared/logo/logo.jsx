import React from "react";
// import logo from '../../../assets/logo.png';
import "./logo.css";
import Image from "next/image";
import logo from "@/public/logo2.png";

const Logo = () => {
    return (
        <div className="logo-container">
            <Image
                src="/logo3.png"
                alt="Logo"
                width={140}
                priority          
                height={140}
                className="logo-img"
            />
           
        </div>
    );
};

export default Logo;
