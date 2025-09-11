"use client";
import Plat from "@/components/shared/plat/plat";
import Tab from "@/components/shared/tab/tab";
import React, { useState } from "react";
import "./restoMenu.css";
import Input from "@/components/shared/input/input";
import Paginator from "@/components/shared/paginator/paginator";
import { useRouter } from "next/navigation";

const RestoMenu = () => {
    const [active, setActive] = useState("Tout");
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
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
    const totalPages = Math.ceil(plats.length / itemsPerPage); //Calcul du nombre total de page
    // trie pour afficher les elements de la page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const visibleItems = plats.slice(startIndex, endIndex);
    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
        router.push("#menu");
    }

    const categories = [
        { id: 1, designation: "Tout" },
        { id: 1, designation: "dessert" },
        { id: 2, designation: "accompagnement" },
    ];

    return (
        <div className="resto-menu" id="menu"> 
            <h3 className="main-color">- Menu du restaurant</h3>
            <div className="resto-menu-header">
                <Input placeholder={"Entrez le nom d'un plat..."} />
                <Tab tabs={categories} active={active} setActive={setActive} />
            </div>
            <div className="resto-menu-grid">
                {visibleItems.map((p) => (
                    <Plat data={p} key={p.id} />
                ))}
            </div>
            {totalPages !== 1 ? (
                <Paginator
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            ) : (
                <span> </span>
            )}
        </div>
    );
};

export default RestoMenu;
