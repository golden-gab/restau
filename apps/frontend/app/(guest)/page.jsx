"use client";

import dynamic from "next/dynamic";
import "./page.css";

const Map = dynamic(() => import("@/components/guest/home/map/map"), { ssr: false });
export default function Home() {
    return (
        <main className="home-container">
           <Map/>
        </main>
    );
}
