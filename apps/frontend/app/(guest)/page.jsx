"use client";
import dynamic from "next/dynamic";
import "./page.css";
import { RestaurantService } from "@/services/restauratnts.service";
import Spinner from "@/components/shared/spinner/spinner";
import { PositionProvider } from "@/context/locationContext";

const Map = dynamic(() => import("@/components/guest/home/map/map"), {
    ssr: false,
    // loading: () => (
    //     <div
    //         style={{
    //             width: "100%",
    //             height: "100vh",
    //             background: "#f0f0f0",
    //             display: "flex",
    //             alignItems: "center",
    //             justifyContent: "center",
    //         }}
    //     >
    //         Chargement de la carte...
    //     </div>
    // ),
});

export default function Home() {
    const { data, error, isLoading } = RestaurantService.getAll();
    return (
        <PositionProvider>
            <main className="home-container">
                {isLoading ? (
                    <div className="map-loader">
                        <Spinner />
                        <p>Chargement de la map...</p>
                    </div>
                ) : (
                    <Map data={data.member} />

                    // <GMap/>
                )}
            </main>
        </PositionProvider>
    );
}
