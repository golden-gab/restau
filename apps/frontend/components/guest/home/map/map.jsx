"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import Input from "@/components/shared/input/input";
import Image from "next/image";
import CardRestau from "@/components/shared/cardRestau/cardRestau";
import MapSearch from "../mapSearch/mapSearch";
import MapFilter from "../mapFilter/mapFilter";
import { useMapFilterStore } from "@/stores/useMapFilterStore";
import { APIProvider } from "@vis.gl/react-google-maps";
import Spinner from "@/components/shared/spinner/spinner";
import OnlineRestaurants from "../onlineRestaurants/onlineRestaurants";
import { usePosition } from "@/context/locationContext";

const customIcon = () =>
    L.divIcon({
        html: `<div class="marker-icon" style="width: 2rem; height: 2rem; border-radius: 50%;"><i class="fi fi-sr-marker"></i></div>`,
        iconSize: [20, 20],
        iconAnchor: [20, 20],
    });

const locationIcon = () =>
    L.divIcon({
        html: `<div class="marker-icon" style="width: 2.5rem; height: 2.5rem; border-radius: 50%;"><div class="location-icon"></div></div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    });

const FlyToLocation = ({ position }) => {
    const map = useMap();

    useEffect(() => {
        if (!position) return;

        map.flyTo(position, 16, {
            animate: true,
            duration: 1.2,
        });
    }, [position, map]);

    return null;
};

const Map = ({ data }) => {
    const initialPosition = [3.848, 11.5021];
    const { toggleFilter, selectedSpecialities, isOpen } = useMapFilterStore();
    const { userPosition, loadPosition, handleUserPosition } = usePosition();
    // useEffect(() => {
    //     handleUserPosition();
    // }, [userPosition]);

    const filteredRestaurants = useMemo(() => {
        // aucun filtre → pas de calcul inutile
        if (selectedSpecialities.length === 0) return data;

        return data.filter((restaurant) =>
            restaurant.specialities?.some((spec) =>
                selectedSpecialities.includes(spec.id),
            ),
        );
    }, [data, selectedSpecialities]);
 
    const positionToUse = userPosition || initialPosition;
    const restaurants = [
        {
            id: 1,
            name: "Le Ngondo",
            city: "Douala",
            coords: [4.0511, 9.7679],
            type: "Poisson braisé",
        },
        {
            id: 2,
            name: "Chez Mado",
            city: "Yaoundé",
            coords: [3.848, 11.5021],
            type: "Cuisine camerounaise",
        },
        {
            id: 3,
            name: "Le Mont Febe",
            city: "Yaoundé",
            coords: [3.8833, 11.5167],
            type: "Restaurant hôtel",
        },
        {
            id: 4,
            name: "La Chaumière",
            city: "Douala",
            coords: [4.05, 9.7],
            type: "Fusion africaine",
        },
        {
            id: 5,
            name: "Le Bateau",
            city: "Kribi",
            coords: [2.9372, 9.9106],
            type: "Fruits de mer",
        },
        {
            id: 6,
            name: "Chez Wouri",
            city: "Garoua",
            coords: [9.3, 13.4],
            type: "Grillades",
        },
        {
            id: 7,
            name: "Bafoussam Grill",
            city: "Bafoussam",
            coords: [5.4778, 10.4176],
            type: "Poulet DG",
        },
        {
            id: 8,
            name: "Savane Délices",
            city: "Ngaoundéré",
            coords: [7.3274, 13.5847],
            type: "Spécialités locales",
        },
        {
            id: 9,
            name: "Le Littoral",
            city: "Limbe",
            coords: [4.0167, 9.2167],
            type: "Poissons et fruits de mer",
        },
        {
            id: 10,
            name: "Horizon Grill",
            city: "Maroua",
            coords: [10.597, 14.322],
            type: "Grillades & brochettes",
        },
        {
            id: 11,
            name: "Le Tchop et Yamo",
            city: "Douala",
            coords: [4.0562, 9.7083],
            type: "Fast food africain",
        },
        {
            id: 12,
            name: "Mbopi Grill House",
            city: "Douala",
            coords: [4.0485, 9.732],
            type: "Grillades et brochettes",
        },
        {
            id: 13,
            name: "Bonapriso Gourmet",
            city: "Douala",
            coords: [4.0297, 9.7364],
            type: "Cuisine internationale",
        },
        {
            id: 14,
            name: "Deido Snack Bar",
            city: "Douala",
            coords: [4.0694, 9.7202],
            type: "Snack & boissons",
        },
    ];

    console.log(loadPosition);
    return (
        <div className="map-container">
            <div className="map-header">
                <MapSearch />
                <div className="map-filter-wrapper">
                    <i
                        className={`fi fi-sr-filter location-btn ${
                            isOpen ? "active" : ""
                        }`}
                        onClick={toggleFilter}
                    ></i>
                    <div
                        className={`map-filter-container ${
                            isOpen ? "active" : ""
                        }`}
                    >
                        <MapFilter />
                    </div>
                </div>
                {loadPosition ? (
                    <div className="location-btn">
                        <Spinner />
                    </div>
                ) : (
                    <i
                        title="Ma position"
                        className="fi fi-sr-land-layer-location location-btn"
                        onClick={() => handleUserPosition()}
                    ></i>
                )}
            </div>

            <MapContainer
                center={positionToUse}
                zoom={8}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredRestaurants.map((resto) => {
                    // Vérifier que les coordonnées sont valides
                    const lat = parseFloat(resto.latitude);
                    const lng = parseFloat(resto.longitude);

                    if (isNaN(lat) || isNaN(lng)) {
                        console.warn(
                            `Coordonnées invalides pour ${resto.name}:`,
                            resto.latitude,
                            resto.longitude,
                        );
                        return null;
                    }

                    return (
                        <Marker
                            position={[lat, lng]}
                            icon={customIcon()}
                            key={resto.slug}
                        >
                            <Popup>
                                <CardRestau
                                    userPosition={userPosition}
                                    data={resto}
                                />
                            </Popup>
                        </Marker>
                    );
                })}

                {userPosition && (
                    <>
                        <Marker position={userPosition} icon={locationIcon()} />
                        <FlyToLocation position={userPosition} />
                    </>
                )}
            </MapContainer>
            <OnlineRestaurants />
        </div>
    );
};

export default Map;
