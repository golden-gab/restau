import React from "react";
import "./hero.css";
import Image from "next/image";
import * as motion from "motion/react-client";
import Button from "@/components/shared/button/button";
import Input from "@/components/shared/input/input";
import Link from "next/link";

const Hero = () => {
    return (
        <div className="about-hero">
            <Image
                src="/plat.webp"
                alt="Image of a dish"
                width={500}
                height={500}
                className="about-hero-img"
            />
            <Image
                src="/plat.webp" 
                alt="Image of a dish"
                width={500}
                height={500}
                className="about-hero-img2"
            />
            <div
                className="about-hero-container"
              
            >
                <p className="about-hero-label">
                    Gérez vos menus, simplifiez vos commandes
                </p>
                <h1>
                    Une plateforme <span className="main-color">simple</span>{" "}
                    pour gérer votre{" "}
                    <span className="main-color">restaurant</span>
                </h1>
                <p>
                    Mettez en ligne vos menus en quelques clics, recevez vos
                    commandes directement sur WhatsApp et gagnez du temps au
                    quotidien. Offrez à vos clients une expérience fluide, sans
                    complication technique.
                </p>
                <div className="about-hero-cta">
                    <Link href={"/"} className="button glass-btn">
                        Retrouver un restaurant{" "}
                        <i className="fi fi-rr-search"></i>
                    </Link>
                    <Link href={"/register"} className="button full-btn">
                        commencer maintenant <i className="fi fi-rr-play"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;
