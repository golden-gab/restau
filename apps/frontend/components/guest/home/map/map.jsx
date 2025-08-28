"use client";
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./map.css";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import Input from "@/components/shared/input/input";
import Image from "next/image";
import CardRestau from "@/components/shared/cardRestau/cardRestau";

const customIcon = () =>
    L.divIcon({
        html: `<div class="marker-icon" style="width: 2.5rem; height: 2.5rem; border-radius: 50%;"><i class="fi fi-ss-marker"></i></div>`,
        iconSize: [40, 40],
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
                    console.warn("Géolocalisation refusée ou indisponible:", err);
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

    return (
        <div className="map-container">
            <div className="map-header">
                <div className="map-search-bar">
                    <Input placeholder="Search for a location" />
                    <i className="fi fi-rr-search"></i>
                </div>
                <i
                    title="Ma position"
                    className="fi fi-sr-land-layer-location location-btn"
                    onClick={handleLocate}
                ></i>
            </div>

            <MapContainer center={positionToUse} zoom={15} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Marker statique initial */}
                <Marker position={initialPosition} icon={customIcon()}>
                    <Popup>
                        <CardRestau/>
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
