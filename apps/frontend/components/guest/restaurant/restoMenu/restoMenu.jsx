"use client";
import Plat from "@/components/shared/plat/plat";
import Tab from "@/components/shared/tab/tab";
import React, { useEffect, useState } from "react";
import "./restoMenu.css";
import Input from "@/components/shared/input/input";
import Paginator from "@/components/shared/paginator/paginator";
import { useRouter } from "next/navigation";

const RestoMenu = ({ plats, categories }) => {
    const [active, setActive] = useState("Tout");
    const [data, setData] = useState(plats);
    const [search, setSearch] = useState(""); // <-- Ajout du state recherche
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleItems = data.slice(startIndex, endIndex);

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
        router.push("#menu");
    }

    useEffect(() => {
        let filtered = plats;
        if (active !== "Tout") {
            filtered = filtered.filter(
                (item) => item.categorie.designation === active
            );
        }
        if (search.trim() !== "") {
            filtered = filtered.filter((item) =>
                item.name.toLowerCase().includes(search.trim().toLowerCase())
            );
        }
        setData(filtered);
        setCurrentPage(1);
    }, [active, plats, search]);

    return (
        <div className="resto-menu" id="menu">
            <h3 className="main-color">- Menu du restaurant</h3>
            <div className="resto-menu-header">
                <Input
                    placeholder={"Entrez le nom d'un plat..."}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Tab tabs={categories} active={active} setActive={setActive} />
            </div>
            <div className="resto-menu-grid">
                {visibleItems.map((p) => (
                    <Plat data={p} key={p.id} />
                ))}
                {visibleItems.map((p) => (
                    <Plat data={p} key={p.id} />
                ))}
                {visibleItems.map((p) => (
                    <Plat data={p} key={p.id} />
                ))}
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
