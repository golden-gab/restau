"use client";
import dynamic from "next/dynamic";
import "./page.css";
import { RestaurantService } from "@/services/restauratnts.service";
import Spinner from "@/components/shared/spinner/spinner";

const Map = dynamic(() => import("@/components/guest/home/map/map"), {
    ssr: false,
});

export default function Home() {
    const { data, error, isLoading } = RestaurantService.getAll();
    console.log(data);
    return (
        <main className="home-container">
            {isLoading ? (
                <div className="map-loader">
                    <Spinner />
                    <p>Chargement de la map...</p>
                </div>
            ) : (
                // <div className="map-loader">
                //     <Spinner />
                //     <p>Chargement de la map...</p>
                // </div>
                <Map data={data.member} />
            )}
        </main>
    );
}
