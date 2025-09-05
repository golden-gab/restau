"use client";
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import Input from "@/components/shared/input/input";
import Image from "next/image";
import CardRestau from "@/components/shared/cardRestau/cardRestau";

const customIcon = () =>
    L.divIcon({
        html: `<div class="marker-icon" style="width: 2rem; height: 2rem; border-radius: 50%;"><i class="fi fi-ss-marker"></i></div>`,
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
    if (position) {
        map.flyTo(position, map.getZoom());
    }
    return null;
};

const Map = () => {
    const initialPosition = [5.47775, 10.41759];
    const [userPosition, setUserPosition] = useState(null);

    // Demande de géolocalisation au chargement de la page
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const latlng = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    };
                    setUserPosition(latlng);
                },
                (err) => {
                    console.warn(
                        "Géolocalisation refusée ou indisponible:",
                        err
                    );
                    // on reste sur initialPosition
                    setUserPosition(null);
                }
            );
        }
    }, []);

    const handleLocate = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const latlng = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    };
                    setUserPosition(latlng);
                },
                (err) => {
                    console.error("Erreur géolocalisation:", err);
                    setUserPosition(null);
                }
            );
        } else {
            alert("La géolocalisation n'est pas supportée par ce navigateur.");
        }
    };

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
    console.log(restaurants);
    return (
        <div className="map-container">
            <div className="map-header">
                <div className="map-search-bar">
                    <Input placeholder="Rechercher un restaurant" />
                    <i className="fi fi-rr-search"></i>
                </div>
                <i
                    title="Ma position"
                    className="fi fi-sr-land-layer-location location-btn"
                    onClick={handleLocate}
                ></i>
            </div>

            <MapContainer
                center={positionToUse}
                zoom={15}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {restaurants.map((resto) => (
                    <Marker
                        position={resto.coords}
                        icon={customIcon()}
                        key={resto.id}
                    >
                        <Popup>
                            <CardRestau  userPosition={userPosition} data={resto}/>
                        </Popup>
                    </Marker>
                ))}
                {/* Marker statique initial */}
                <Marker position={initialPosition} icon={customIcon()}>
                    <Popup>
                        <CardRestau userPosition={userPosition} />
                    </Popup>
                </Marker>

                {/* Marker utilisateur */}
                {userPosition && (
                    <>
                        <Marker position={userPosition} icon={locationIcon()} />
                        <FlyToLocation position={userPosition} />
                    </>
                )}
            </MapContainer>
        </div>
    );
};

export default Map;
