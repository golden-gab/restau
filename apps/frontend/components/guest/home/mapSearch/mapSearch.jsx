import Input from "@/components/shared/input/input";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import "./mapSearch.css";
import { fetcher, seeMore } from "@/helpers/function";
import useSWR from "swr";
import { useMapFilterStore } from "@/stores/useMapFilterStore";

const MapSearch = () => {
    const [showResults, setShowResults] = useState(false);
    const [search, setSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // Query pour déclencher la recherche
    const {toggleFilter} = useMapFilterStore()
    // Configuration SWR avec query conditionnel
    const {
        data: restaurants,
        error,
        isLoading,
        mutate,
    } = useSWR(
        searchQuery
            ? `${process.env.NEXT_PUBLIC_API_URL}/restaurants?page=1&name=${searchQuery}`
            : null,
        fetcher
    );

    function handleSubmit(e) {
        e.preventDefault();
        if (search.trim().length > 0) {
            setSearchQuery(search.trim());
            setShowResults(true);
        }
    }

    function clearSearch(){
        setSearch('')
        setShowResults(false)
    }
    return (
        <div className="map-search-bar">
            <form onSubmit={(e) => handleSubmit(e)}>
                <Input
                    placeholder="Retrouver un restaurant"
                    value={search}
                    onClick={toggleFilter}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {!showResults ? (
                    <i
                        className="fi fi-rr-search"
                        onClick={(e) => handleSubmit(e)}
                    ></i>
                ) : (
                    <i
                        className="fi fi-rr-cross"
                        onClick={clearSearch}
                    ></i>
                )}
            </form>
            {showResults && (
                <div className="map-search-results">
                    {isLoading ? (
                        <div className="map-search-results-empty">
                            <span>Recherche en cours...</span>
                        </div>
                    ) : error ? (
                        <div className="map-search-results-error">
                            <span>Erreur lors de la recherche</span>
                            <button onClick={() => mutate()}>Réessayer</button>
                        </div>
                    ) : !restaurants || restaurants.member.length === 0 ? (
                        <div className="map-search-results-empty">
                            <span>Aucun résultat</span>
                        </div>
                    ) : (
                        restaurants.member &&
                        restaurants.member.map((d) => (
                            <Link
                                href={"restaurants/" + d.slug}
                                key={d.slug}
                                className="map-search-result"
                            >
                                <Image
                                    src={
                                        d.logoPath
                                            ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${d.logoPath}`
                                            : `${process.env.NEXT_PUBLIC_STORAGE_URL}/restaurants/logos/default.jpg`
                                    }
                                    width={200}
                                    height={200}
                                    alt="restaurant-logo"
                                    className="map-search-result-logo"
                                />
                                <div>
                                    <p>{d.name}</p>
                                    <p className="map-search-result-info">
                                        {seeMore(d.description, 50)}
                                    </p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default MapSearch;
