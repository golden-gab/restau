import Header from "@/components/guest/layout/header/header";
import Footer from "@/components/guest/layout/footer/footer";
import React from "react";

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer/>
        </div>
    );
};

export default Layout;
