import SectionTItre from "@/components/shared/sectionTItre/sectionTItre";
import React from "react";
import styles from "./politique.module.css";

const Page = () => {
    return (
        <section>
            <SectionTItre
                titre={"Politique de confidentialité"}
                description={" Dernière mise à jour : 1er Janvier 2026"}
            />
            <div className={styles.block}>
                <h3>1. Introduction</h3>
                <p>
                    La présente politique de confidentialité explique comment
                    notre plateforme collecte, utilise et protège vos données
                    personnelles lorsque vous utilisez notre service de menu en
                    ligne et de commande via WhatsApp.
                </p>
            </div>

            <div className={styles.block}>
                <h3>2. Données collectées</h3>
                <p>
                    Nous collectons uniquement les données nécessaires au bon
                    fonctionnement du service :
                </p>
                <ul>
                    <li>Nom du restaurant</li>
                    <li>Adresse e-mail du responsable</li>
                    <li>Numéro WhatsApp du restaurant</li>
                    <li>Menus, plats, prix et images</li>
                </ul>
                <p>
                    Aucune donnée bancaire n’est collectée à ce stade du
                    service.
                </p>
            </div>

            <div className={styles.block}>
                <h3>3. Données des clients finaux</h3>
                <p>
                    Les clients qui consultent les menus n’ont pas besoin de
                    créer un compte. Lors d’une commande via WhatsApp, les
                    échanges se font directement entre le client et le
                    restaurant.
                </p>
                <p>
                    Nous ne stockons pas les conversations WhatsApp ni les
                    informations personnelles des clients finaux.
                </p>
            </div>

            <div className={styles.block}>
                <h3>4. Utilisation des données</h3>
                <p>Les données collectées servent à :</p>
                <ul>
                    <li>Afficher le menu en ligne</li>
                    <li>Permettre la gestion des plats</li>
                    <li>Faciliter la commande via WhatsApp</li>
                    <li>Améliorer la plateforme</li>
                </ul>
            </div>

            <div className={styles.block}>
                <h3>5. Sécurité</h3>
                <p>
                    Nous mettons en place des mesures de sécurité techniques et
                    organisationnelles pour protéger les données contre tout
                    accès non autorisé.
                </p>
            </div>

            <div className={styles.block}>
                <h3>6. Partage des données</h3>
                <p>
                    Les données ne sont ni vendues ni partagées avec des tiers,
                    sauf obligation légale.
                </p>
            </div>

            <div className={styles.block}>
                <h3>7. Vos droits</h3>
                <p>
                    Vous pouvez demander l’accès, la modification ou la
                    suppression de vos données à tout moment en nous contactant.
                </p>
            </div>

            <div className={styles.block}>
                <h3>8. Contact</h3>
                <p>
                    Pour toute question concernant cette politique de
                    confidentialité, vous pouvez nous contacter à l’adresse
                    suivante :
                </p>
                <p className={styles.contact}>contact@mealop.com</p>
            </div>
        </section>
    );
};

export default Page;
