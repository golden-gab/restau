import Header from "@/components/guest/layout/header/header";
import Footer from "@/components/guest/layout/footer/footer";
import React from "react";
import { CartProvider } from "@/context/CartContext";

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <CartProvider>{children}</CartProvider>
            <Footer />
        </div>
    );
};

export default Layout;
