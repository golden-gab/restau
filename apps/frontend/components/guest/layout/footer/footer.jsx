import React from "react";
import "./footer.css";
import Link from "next/link";
import Logo from "../../../shared/logo/logo";

const Footer = () => {
    return (
        <footer>
            <div className="footer-top">
                <div className="footer-app">
                    <Logo />
                    <p className="footer-text">
                        Une solution simple et efficace pour digitaliser vos menus,
                        gérer vos commandes via WhatsApp et suivre vos commandes en
                        toute sérénité.
                    </p>
                    <div className="social-network">
                        <a
                            href="https://web.facebook.com/zingana.hotel?_rdc=1&_rdr"
                            target="_blank"
                            aria-label="Notre compte Facebook"
                        >
                            <i className="fi fi-brands-facebook"></i>
                        </a>
                        <a
                            href="mailto:contact@ndd.com"
                            target="_blank"
                            aria-label="Envoyez-nous un mail"
                        >
                            <i className="fi fi-rr-envelope"></i>
                        </a>
                    </div>
                </div>

                <div className="footer-links">
                    <p className="footer-links-title">Liens utiles</p>
                    <div className="footer-links-list">
                        <Link href={"/"} className="footer-text">
                            Accueil
                        </Link>
                        <Link href={"/about"} className="footer-text">
                            À propos
                        </Link>
                        <Link href={"/about#pricing-section"} className="footer-text">
                            Tarifs
                        </Link>
                        <Link href={"/about#faq-section"} className="footer-text">
                            FAQ
                        </Link>
                    </div>
                </div>

                <div className="footer-links">
                    <p className="footer-links-title">Contact</p>
                    <div className="footer-links-list">
                        <div className="footer-text">
                            <i className="fi fi-rr-phone-flip"></i>{" "}
                            <span>+237 698 17 96 38</span>
                        </div>
                        <div className="footer-text">
                            <i className="fi fi-rr-envelope"></i>{" "}
                            <span>contact@ndd.com</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p className="footer-text flaticon">
                    Uicons by{" "}
                    <a href="https://www.flaticon.com/uicons" target="_blank">
                        Flaticon
                    </a>
                </p>
                <p className="footer-text">
                    Développé par{" "}
                    <a
                        href="https://golden-gab.com"
                        className="main-color"
                        target="_blank"
                    >
                        Golden Gab
                    </a>{" "}
                    &copy; 2025. Tous droits réservés.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
