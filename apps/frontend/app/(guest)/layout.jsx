import Header from "@/components/guest/layout/header/header";
import Footer from "@/components/guest/layout/footer/footer";
import React from "react";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
    title: "Restaurants au Cameroun : menus en ligne, fast-food et snacks | Mealop",
    description:
        "Découvrez les restaurants au Cameroun et consultez leurs menus en ligne. Trouvez facilement des fast-food, snacks et restaurants à Douala, Yaoundé, Bafoussam et commandez via WhatsApp.",

    openGraph: {
        title: "Trouvez des restaurants et leurs menus au Cameroun | Mealop",
        description:
            "Explorez les restaurants, consultez leurs menus et commandez facilement via WhatsApp avec Mealop.",
        url: "https://mealop.com",
        type: "website",
        images: ["/logo1.png"],
    },

    alternates: {
        canonical: "https://mealop.com",
    },

    robots: {
        index: true,
        follow: true,
    },
};

const Layout = ({ children }) => {
    return (
        <div className="guest-layout">
            <Header />
            <CartProvider>{children}</CartProvider>
            <Footer />
        </div>
    );
};

export default Layout;
