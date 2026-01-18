import Button from "@/components/shared/button/button";
import SectionTItre from "@/components/shared/sectionTItre/sectionTItre";
import React from "react";
import "./pricing.css";
import * as motion from "motion/react-client";
import Link from "next/link";

const Pricing = () => {
    const freeplan = {
        name: "Plan Standard",
        description:
            "Une formule simple et efficace pour digitaliser votre restaurant et gérer vos commandes en toute sérénité.",
        price: "Gratuit",
        features: [
            "Création de menus en ligne attractifs",
            "Réception des commandes via WhatsApp",
            "Gestion facile des plats et catégories",
            "Statistiques de ventes simplifiées",
            "Assistance disponible en cas de besoin",
        ],
    };
    return (
        <section id="pricing-section">
            <SectionTItre
                label="Tarifs"
                titre="Des plans adaptés à vos besoins"
                description="Choisissez l’offre qui correspond à votre restaurant et commencez à simplifier la gestion de vos menus et commandes."
            />
            <div className="pricing-cards">
                <PricingCard plan={freeplan} />
            </div>
        </section>
    );
};

export default Pricing;

function PricingCard({ plan }) {
    return (
        <motion.div
            className="pricing-card"
            initial={{  y: 70 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.4,
                ease: "easeOut",
            }}
        >
            <h3 className="pricing-card-header">{plan.name}</h3>
            <p className="pricing-card-description">{plan.description}</p>
            <ul className="pricing-card-features">
                {plan.features.map((feature, index) => (
                    <li className="pricing-card-feature" key={index}>
                        <i className="fi fi-rr-check-circle"></i>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <p className="pricing-card-price">
                {plan.price}
                {/* <span>FCFA / mois</span> */}
            </p>
            <Link href="/register" className="pricing-card-action">
                Commencer maintenant
            </Link>
        </motion.div>
    );
}
