import React from "react";
import "./cta.css";
import Image from "next/image";
import Button from "@/components/shared/button/button";

const Cta = () => {
    return (
        <section className="cta-section">
            <div className="cta-content">
                <p className="cta-label">Passez à la vitesse supérieure</p>
                <h2>
                    Donnez de la visibilité à vos{" "}
                    <span className="main-color">menus</span>
                </h2>
                <p>
                    Offrez à vos clients une expérience simple et rapide : menus
                    en ligne, commandes via WhatsApp et suivi des ventes en un
                    seul endroit. Notre solution vous aide à gagner du temps,
                    attirer plus de clients et booster vos revenus.
                </p>
                <Button>Commencez maintenant</Button>
            </div>
            <Image
                src="/plat.webp"
                alt="Call to Action"
                width={500}
                height={500}
                className="cta-image"
            />
        </section>
    );
};

export default Cta;
