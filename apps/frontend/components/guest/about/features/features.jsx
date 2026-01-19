import React from "react";
import Image from "next/image";
import "./features.css";
import * as motion from "motion/react-client";
import SectionTItre from "@/components/shared/sectionTItre/sectionTItre";

const Features = () => {
    const data = [
        {
            image: "/menu-img.webp",
            icone: "fi fi-rr-holding-hand-dinner",
            nom: "Menus en ligne",
            description:
                "Mettez en valeur vos plats avec des visuels appétissants et des descriptions claires pour séduire vos clients dès le premier regard.",
        },
        {
            image: "/wha-img.webp",
            icone: "fi fi-brands-whatsapp",
            nom: "Commandes via WhatsApp",
            description:
                "Simplifiez la prise de commande : un simple clic permet à vos clients de commander directement via WhatsApp.",
        },
        {
            image: "/gestion-img.webp",
            icone: "fi fi-rr-snap",
            nom: "Gestion intuitive",
            description:
                "Ajoutez, modifiez ou supprimez vos plats en quelques secondes et organisez-les facilement par catégories.",
        },
        {
            image: "/dashboard-img.webp",
            icone: "fi fi-rr-chart-histogram",
            nom: "Statistiques intelligentes",
            description:
                "Accédez à un tableau clair de vos ventes et identifiez vos plats les plus populaires pour booster votre rentabilité.",
        },
    ];
    return (
        <section id="features">
            <SectionTItre
                label={"Fonctionnalités"}
                titre="Un outil pensé pour les restaurateurs"
                description="Découvrez les atouts de notre solution : un menu en ligne attractif, des commandes fluides via WhatsApp et des statistiques claires pour développer votre activité."
            />
            <div className="features-cards">
                {data.map((feature, index) => (
                    <FeatureCard key={index} data={feature} />
                ))}
            </div>
        </section>
    );
};

export default Features;

function FeatureCard({ data }) {
    return (
        <div className="feature-card">
            <motion.div
                className="feature-card-content"
                initial={{ x: -100 }}
                whileInView={{ x: 0 }}
                transition={{
                    duration: 0.6, // petit décalage pour l’effet cascade
                    ease: "easeOut",
                }}
            viewport={{ once: false }}
            >
                <i className={data.icone + " feature-icon"}></i>
                <h4 className="feature-nom">{data.nom}</h4>
                <p className="feature-description">{data.description}</p>
            </motion.div>
            <Image
                width={400}
                height={400}
                alt="feature image"
                src={data.image}
                className="feature-img"
            />
        </div>
    );
}
