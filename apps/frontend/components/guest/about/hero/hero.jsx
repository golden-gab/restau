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
                src="/plat.png"
                alt="hero section image"
                width={500}
                height={500}
                className="about-hero-img"
            />
            <Image
                src="/plat.png"
                alt="hero section image"
                width={500}
                height={500}
                className="about-hero-img2"
            />
            <motion.div
                className="about-hero-container"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 60,
                }}
            >
                <p className="about-hero-label">
                    Gérez vos menus, simplifiez vos commandes
                </p>
                <h1>
                    Une plateforme{" "}
                    <span className="main-color">simple et rapide</span> pour
                    votre restaurant
                </h1>
                <p>
                    Mettez en ligne vos menus en quelques clics, recevez vos
                    commandes directement sur WhatsApp et gagnez du temps au
                    quotidien. Offrez à vos clients une expérience fluide, sans
                    complication technique.
                </p>
                <div className="about-hero-cta">
                    <Link href={"/"} className="button glass-btn">
                        Recherchez un restaurant{" "}
                        <i className="fi fi-rr-search"></i>
                    </Link>
                    <Button>
                        commencer dès maintenant{" "}
                        <i className="fi fi-rr-play"></i>
                    </Button>
                </div>
            </motion.div>
            <div className="about-hero-footer">
                <i className="fi fi-rr-arrow-down"></i>
            </div>
        </div>
    );
};

export default Hero;
