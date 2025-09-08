"use client";
import Plat from "@/components/shared/plat/plat";
import Tab from "@/components/shared/tab/tab";
import React, { useState } from "react";
import "./restoMenu.css";

const RestoMenu = () => {
    const [active, setActive] = useState();
    const categories = [
        { id: 1, designation: "Tout" },
        { id: 1, designation: "dessert" },
        { id: 2, designation: "accompagnement" },
    ];
    const plats = [
        {
            id: 1,
            name: "plat 1",
            categorie: "dessert",
            description:
                "        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad iusto suscipit libero, debitis consequuntur nostru",
            prix: 1500,
            image: "/plat1.jpg",
        },
        {
            id: 2,
            name: "plat 2",
            categorie: "dessert",
            description:
                "        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad iusto suscipit libero, debitis consequuntur nostru",
            prix: 1500,
            image: "/plat2.jpg",
        },
        {
            id: 3,
            name: "plat 3",
            categorie: "dessert",
            description:
                "        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad iusto suscipit libero, debitis consequuntur nostru",
            prix: 1500,
            image: "/plat3.jpg",
        },
    ];
    return (
        <div className="resto-menu">
            <h3 className="main-color">- Menu du restaurant</h3>
            <Tab tabs={categories} active={active} setActive={setActive} />
            <div className="resto-menu-grid">
                {plats.map((p) => (
                    <Plat data={p} key={p.id} />
                ))}
                 {plats.map((p) => (
                    <Plat data={p} key={p.id} />
                ))}
            </div>
        </div>
    );
};

export default RestoMenu;
