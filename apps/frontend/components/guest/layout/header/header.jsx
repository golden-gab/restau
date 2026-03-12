"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./header.css";
import Button from "../../../shared/button/button";
import Logo from "@/components/shared/logo/logo";

const Header = () => {
    const nav = useRef();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    function handleNavMobile() {
        nav.current.classList.toggle("active");
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50); // Change de couleur après 50px de scroll
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const links = [
        {
            to: "/",
            text: "Explorer",
            icon: "fi fi-rr-home",
        },
        {
            to: "/about",
            text: "A propos",
            icon: "fi fi-rr-info",
        },
        {
            to: "/about#pricing-section",
            text: "Tarif",
            icon: "fi fi-rr-info",
        },
        {
            to: "/about#faq-section",
            text: "FAQ",
            icon: "fi fi-rr-info",
        },
        // {
        //   to: "/seminaire",
        //   text: "Séminaire",
        //   icon: "fi fi-rr-info",
        // },
    ];

    return (
        <header className={`${isScrolled ? "header scrolled" : "header "}`}>
            <Link href="/" className="sm-logo"> 
                 <Logo /> 
            </Link>

            <nav className="navbar" ref={nav}>
                <Link href="/" className="lg-logo" style={{ width: "25%" }}> 
                    <Logo /> 
               </Link>

                <Navigation links={links} onClick={handleNavMobile} />

                <div className="nav-right">
                    <Link
                        className="action-header button glass-btn"
                        href={"https://mealopadmin.grinboard.com/restaurateur/login"}
                        target="_blank"
                        onClick={handleNavMobile}
                    >
                        Se connecter
                    </Link>
                    <Link href={"/register"} onClick={handleNavMobile}>
                        <Button>Ouvrir mon restaurant</Button>
                    </Link>
                </div>
            </nav>

            <div id="header-mobile-icons">
                <i
                    id="menu-btn"
                    className="fi fi-rr-menu-burger header-mobile-icon"
                    onClick={handleNavMobile}
                ></i>
            </div>
        </header>
    );
};

export default Header;

const Navigation = ({ links, onClick }) => {
    const [active, setActive] = useState(false);

    function handlesubLinks() {
        setActive(!active);
        onClick();
    }

    return (
        <div className="nav-left">
            {links.map((link, index) => (
                <div key={index} className="link-container">
                    <Link
                        href={link.to}
                        onClick={
                            link.subLinks ? () => setActive(!active) : onClick
                        }
                        className="nav-link"
                    >
                        <span>{link.text} </span>
                        {link.subLinks && (
                            <i
                                className={`fi ${
                                    active
                                        ? "fi-rr-angle-small-up"
                                        : "fi-rr-angle-small-down"
                                }`}
                            ></i>
                        )}
                    </Link>

                    {link.subLinks && (
                        <div
                            className={active ? "sublinks active" : "sublinks"}
                        >
                            {link.subLinks.map((sub, subIndex) => (
                                <Link
                                    key={subIndex}
                                    href={sub.to}
                                    onClick={handlesubLinks}
                                    className="nav-link"
                                >
                                    <i className={sub.icon}></i>
                                    <span>{sub.text}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
