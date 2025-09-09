"use client";
import dynamic from "next/dynamic";
import "./page.css";
import { RestaurantService } from "@/services/restauratnts.service";

const Map = dynamic(() => import("@/components/guest/home/map/map"), { ssr: false });

export default function Home() {
    const {data , error, isLoading} = RestaurantService.getAll()
    console.log(data)
    return (
        <main className="home-container">
            {isLoading ? <h1>is loading</h1>: <Map data={data.member}/>}
           
        </main>
    );
}
