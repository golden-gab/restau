"use client";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const PositionContext = createContext(null);

const DEFAULT_POSITION = { lat: 4.0511, lng: 9.7679 }; // Douala

export function PositionProvider({ children }) {
    const [userPosition, setUserPosition] = useState(() => {
        if (typeof window === "undefined") return null;
        const saved = sessionStorage.getItem("userPosition");
        return saved ? JSON.parse(saved) : null;
    });
    const [loadPosition, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleUserPosition() {
        if (!navigator.geolocation) {
            setError("Géolocalisation non supportée");
            return;
        }

        setLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const position = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                };
                setUserPosition(position);
                sessionStorage.setItem(
                    "userPosition",
                    JSON.stringify(position),
                ); // ← persister
                setLoading(false);
            },
            (err) => {
                if (err.code === err.PERMISSION_DENIED) {
                    setError("Permission refusée");
                    toast.error(
                        "Permission de géolocalisation refusée. Affichage de la carte centrée sur Douala.",
                    );
                } else {
                    setError("Erreur de géolocalisation");
                    toast.error(
                        "Erreur lors de la récupération de votre position. Affichage de la carte centrée sur Douala.",
                    );
                }
                setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 10000 },
        );
    }

    return (
        <PositionContext.Provider
            value={{ userPosition, loadPosition, error, handleUserPosition }}
        >
            {children}
        </PositionContext.Provider>
    );
}

export function usePosition() {
    return useContext(PositionContext);
}
