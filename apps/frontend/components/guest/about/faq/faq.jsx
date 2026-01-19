"use client";
import React, { useState } from "react";
import "./faq.css";
import * as motion from "motion/react-client";
import SectionTItre from "@/components/shared/sectionTItre/sectionTItre";
const container = {
    hidden: { y: 50 },
    visible: {
        y: 0,
        transition: {
            staggerChildren: 0.07,
            y: { type: "spring", stiffness: 200, damping: 50, duration: 0.5 },
        },
    },
};
const Faq = () => {
    const list = [
        {
            question: "Comment créer et mettre à jour mon menu en ligne ?",
            reponse:
                "C’est très simple ! Depuis votre tableau de bord, vous pouvez ajouter de nouveaux plats, modifier leurs descriptions, prix et images, ou encore les classer par catégories .",
        },
        {
            question:
                "Mes clients doivent-ils installer une application pour commander ?",
            reponse:
                "Non, vos clients n’ont besoin d’aucune application. Ils consultent simplement votre menu via un lien unique et passent commande directement par WhatsApp.",
        },
        {
            question:
                "Puis-je personnaliser mon espace avec le logo de mon restaurant ?",
            reponse:
                "Oui ! Vous pouvez ajouter le nom de votre restaurant, votre logo ainsi que vos horaires d’ouverture pour un espace 100% personnalisé.",
        },
        {
            question: "Comment reçois-je les commandes de mes clients ?",
            reponse:
                "Chaque commande est envoyée directement sur votre WhatsApp avec un message pré-rempli contenant tous les détails nécessaires : plat, quantité et options éventuelles.",
        },
        {
            question: "Est-ce que je peux suivre mes commandes ?",
            reponse:
                "Bien sûr. Vous avez accès à des statistiques simples qui vous permettent de suivre l’évolution de vos commandes et d’identifier vos plats les plus populaires.",
        },
        {
            question: "Est-ce que l’assistance est incluse ?",
            reponse:
                "Oui, notre équipe est disponible pour vous accompagner en cas de besoin et répondre rapidement à vos questions.",
        },
    ];
    return (
        <section id="faq-section">
            <div className="faq-container">
                <SectionTItre
                    label={"FAQ"}
                    titre={"Foire aux questions"}
                    description="Toutes les réponses aux questions les plus fréquentes sur notre solution pour restaurants et snacks."
                />
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    className="faq-list"
                >
                    {list.map((item, index) => (
                        <FaqBlock
                            key={index}
                            question={item.question}
                            reponse={item.reponse}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Faq;

function FaqBlock({ question, reponse }) {
    const [open, setOpen] = useState(false);
    const [icon, setIcon] = useState("fi-rr-add");
    function handleClick() {
        setOpen(!open);
        if (icon === "fi-rr-add") setIcon("fi-rr-minus-circle");
        else setIcon("fi-rr-add");
    }
    return (
        <div className="faq">
            <div className="faq-header" onClick={handleClick}>
                <span className="Question">{question} </span>
                <i className={"fi " + icon}></i>
            </div>
            {open === true && <p className="faq-response">{reponse} </p>}
        </div>
    );
}
