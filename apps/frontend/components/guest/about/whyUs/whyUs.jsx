import React from "react";
import "./whyUs.css";
import * as motion from "motion/react-client";
import SectionTItre from "@/components/shared/sectionTItre/sectionTItre";

const WhyUs = () => {
    const data = [
        {
            icone: "fi fi-rr-time-fast",
            nom: "Gain de temps",
            description:
                "Gérez vos menus en ligne et commandes en quelques clics, sans perte de temps. Notre plateforme optimise chaque étape pour vous permettre de vous concentrer sur l’essentiel.",
        },
        {
            icone: "fi fi-rr-globe",
            nom: "Audience plus large",
            description:
                "Touchez de nouveaux clients et augmentez votre visibilité grâce à une présence en ligne de vos différents types de menu.",
        },
        {
            icone: "fi fi-rr-snap",
            nom: "Simplicité",
            description:
                "Profitez d’une interface intuitive et d’un accompagnement personnalisé pour une prise en main rapide, même sans compétences techniques.",
        },
    ];
    return (
        <section className="why-us-container">
            <SectionTItre
                label={"Pourquoi choisir nomApp"}
                titre={"Pour vos restaurants et services"}
                description="Un outil moderne et accessible qui simplifie la gestion de vos menus et optimise vos commandes."
            />
            <motion.div
                className="why-us-cards"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
            >
                {data.map((service, index) => (
                    <WhyUsCard key={index} data={service} />
                ))}
            </motion.div>
        </section>
    );
};

export default WhyUs;

function WhyUsCard({ data }) {
    return (
        <motion.div
            className="why-us-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6, // petit décalage pour l’effet cascade
                ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }}
        >
            <i className={data.icone}></i>
            <h4 className="why-us-nom">{data.nom}</h4>
            <p className="why-us-description">{data.description}</p>
        </motion.div>
    );
}
