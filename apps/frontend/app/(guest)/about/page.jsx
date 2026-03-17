// import BottomAction from '@/components/guest/about/bottomAction/bottomAction';
import BottomAction from "@/components/guest/about/bottomAction/bottomAction";
import Cta from "@/components/guest/about/cta/cta";
import Faq from "@/components/guest/about/faq/faq";
import Features from "@/components/guest/about/features/features";
import Hero from "@/components/guest/about/hero/hero";
import Pricing from "@/components/guest/about/pricing/pricing";
import WhyUs from "@/components/guest/about/whyUs/whyUs";
import React from "react";

export const metadata = {
    title: "Créer un menu en ligne pour restaurant au Cameroun | Mealop",
    description: "Créez facilement un menu en ligne pour votre restaurant au Cameroun. Partagez-le via WhatsApp et recevez des commandes sans effort avec Mealop.",
    openGraph: {
        title: "Mealop - Le menu en ligne pour les restaurants camerounais",
        description:
            "Créez votre menu en ligne et recevez des commandes via WhatsApp en quelques minutes.",
        images: ["/logo1.png"],
        url: "https://mealop.com/about",
        type: "website",
    },
    alternates: {
        canonical: "https://mealop.com/about",
    },
    keywords: [
        // Général
        "restaurant cameroun",
        "restaurants cameroun",
        "menu restaurant en ligne",
        "menu digital restaurant",
        "plateforme restaurant cameroun",

        // Villes principales
        "restaurant douala",
        "restaurant yaoundé",
        "restaurant bafoussam",
        "restaurant kribi",

        // Intentions utilisateurs (TRÈS IMPORTANT)
        "menu restaurant douala",
        "menu restaurant yaoundé",
        "menu restaurant bafoussam",
        "menu restaurant kribi",

        "restaurant avec menu en ligne",
        "consulter menu restaurant en ligne",
        "voir menu restaurant cameroun",

        // Fast-food & snacks
        "fast food douala",
        "fast food yaoundé",
        "snack bafoussam",
        "restaurant livraison douala",
        "restaurant livraison yaoundé",

        // Business (ta cible restaurateurs)
        "créer menu en ligne restaurant",
        "outil restaurant cameroun",
        "logiciel restaurant cameroun",
        "digitalisation restaurant cameroun",
        "menu qr code restaurant",

        // WhatsApp (très local et puissant)
        "commande whatsapp restaurant",
        "commander nourriture whatsapp",
        "restaurant whatsapp cameroun",

        // Long tail (gros levier SEO)
        "comment mettre son menu en ligne",
        "comment digitaliser son restaurant",
        "solution pour restaurant cameroun",
    ],
};

const AboutPage = () => {
    return (
        <div className="about-page">
            <Hero />
            <WhyUs />
            <Features />
            <Pricing />
            <Cta />
            <Faq />
            <BottomAction />
        </div>
    );
};

export default AboutPage;
