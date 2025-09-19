import Button from "@/components/shared/button/button";
import React from "react";
import "./bottomAction.css";
import Link from "next/link";

const BottomAction = () => {
    return (
        <section className="bottom-action">
            <div className="bottom-action-container">
                <h2 className="">Prêt à digitaliser votre <span className="main-color">restaurant</span>  ?</h2>
                <p>
                    Mettez vos menus en ligne, recevez des commandes via WhatsApp 
                    et suivez vos ventes en quelques clics. Simple, rapide et pensé 
                    pour les restaurateurs qui veulent gagner du temps et attirer plus de clients.
                </p>
                <Link href={"/register"} className="button full-btn">
                    Ouvrir mon restaurant <i className="fi fi-rr-shop"></i>
                </Link>
            </div>
        </section>
    );
};

export default BottomAction;
