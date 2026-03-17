import SectionTItre from "@/components/shared/sectionTItre/sectionTItre";
import React from "react";
import styles from "./conditions.module.css";

export const metadata = {
    title: "Conditions d’utilisation | Mealop",
    description:
        "Consultez les conditions d’utilisation de Mealop pour comprendre les règles d’accès et d’utilisation de la plateforme.",
    openGraph: {
        title: "Conditions d’utilisation - Mealop",
        description:
            "Découvrez les règles et conditions d’utilisation de la plateforme Mealop.",
        url: "https://mealop.com/conditions",
        type: "website",
    },
    alternates: {
        canonical: "https://mealop.com/conditions",
    },
    robots: {
        index: true,
        follow: true,
    },
};
const Page = () => {
    return (
        <section>
            <SectionTItre
                titre={"Conditions d'utilisation"}
                description={"Dernière mise à jour : 2 Janvier 2026"}
            />
            <div className={styles.block}>
                <h3>1. Objet</h3>
                <p>
                    Les présentes conditions d’utilisation ont pour objet de
                    définir les règles d’accès et d’utilisation de la plateforme
                    permettant aux restaurants et snacks de présenter leurs
                    menus en ligne et de recevoir des commandes via WhatsApp.
                </p>
            </div>

            <div className={styles.block}>
                <h3>2. Accès au service</h3>
                <p>
                    L’accès à la plateforme est réservé aux professionnels de la
                    restauration. La consultation des menus par les clients
                    finaux est libre et ne nécessite aucune création de compte.
                </p>
            </div>

            <div className={styles.block}>
                <h3>3. Création de compte</h3>
                <p>
                    Pour utiliser le service, le restaurant doit créer un compte
                    avec des informations exactes et à jour. Le restaurant est
                    responsable de la confidentialité de ses identifiants de
                    connexion.
                </p>
            </div>

            <div className={styles.block}>
                <h3>4. Fonctionnement des commandes</h3>
                <p>
                    Les commandes sont effectuées via WhatsApp. La plateforme se
                    limite à faciliter la mise en relation entre le client et le
                    restaurant.
                </p>
                <p>
                    La plateforme n’intervient pas dans la préparation, la
                    livraison, la facturation ou le paiement des commandes.
                </p>
            </div>

            <div className={styles.block}>
                <h3>5. Responsabilités</h3>
                <p>
                    Le restaurant est seul responsable des informations
                    affichées sur son menu (prix, disponibilité, descriptions,
                    images).
                </p>
                <p>
                    La plateforme ne saurait être tenue responsable des litiges
                    entre le restaurant et ses clients.
                </p>
            </div>

            <div className={styles.block}>
                <h3>6. Utilisation interdite</h3>
                <p>Il est strictement interdit de :</p>
                <ul>
                    <li>Utiliser la plateforme à des fins illégales</li>
                    <li>Publier des contenus faux, trompeurs ou offensants</li>
                    <li>Porter atteinte au bon fonctionnement du service</li>
                </ul>
            </div>

            <div className={styles.block}>
                <h3>7. Disponibilité du service</h3>
                <p>
                    La plateforme est accessible 24h/24, 7j/7, sauf interruption
                    pour maintenance ou cas de force majeure.
                </p>
            </div>

            <div className={styles.block}>
                <h3>8. Suspension ou résiliation</h3>
                <p>
                    La plateforme se réserve le droit de suspendre ou de
                    supprimer un compte en cas de non-respect des présentes
                    conditions.
                </p>
            </div>

            <div className={styles.block}>
                <h3>9. Évolution des conditions</h3>
                <p>
                    Les présentes conditions peuvent être modifiées à tout
                    moment. Les utilisateurs seront informés en cas de
                    changement majeur.
                </p>
            </div>

            <div className={styles.block}>
                <h3>10. Contact</h3>
                <p>
                    Pour toute question relative aux conditions d’utilisation,
                    vous pouvez nous contacter à l’adresse suivante :
                </p>
                <p className={styles.contact}>contact@mealop.com</p>
            </div>
        </section>
    );
};

export default Page;
