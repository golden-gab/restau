import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import './restoLocation.css';
import { MapContainer, Marker, TileLayer } from "react-leaflet";

const RestoLocation = ({ latitude, longitude }) => { 
    const customIcon = () =>
        L.divIcon({
            html: `<div class="marker-icon" style="width: 2rem; height: 2rem; border-radius: 50%;"><i class="fi fi-sr-marker"></i></div>`,
            iconSize: [20, 20],
            iconAnchor: [20, 20],
        });
    return (
        <section id="resto-location">
            <h3>Emplacement du restaurant</h3>
            <div className="resto-map-container">
                <MapContainer
                    center={[latitude, longitude]}
                    zoom={20}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                        position={[latitude, longitude]}
                        icon={customIcon()}
                    ></Marker>
                </MapContainer>
            </div>
        </section>
    );
};

export default RestoLocation;
