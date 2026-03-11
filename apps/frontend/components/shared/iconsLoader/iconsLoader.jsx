// components/IconsLoader.jsx
"use client";
import { useEffect } from "react";

export default function IconsLoader() {
    useEffect(() => {
        // Chargement uniquement côté client, après le rendu
        import("@flaticon/flaticon-uicons/css/regular/rounded.css");
        import("@flaticon/flaticon-uicons/css/brands/all.css");
        import("@flaticon/flaticon-uicons/css/solid/rounded.css");
    }, []);
    return null;
}