"use client";
import useSWR from "swr";
import RestoInfo from "@/components/guest/restaurant/restoInfo/restoInfo";
import RestoMenu from "@/components/guest/restaurant/restoMenu/restoMenu";
import React from "react";
import "./style.css";
import RestoCart from "@/components/guest/restaurant/retoCart/restoCart";
import Horaires from "@/components/guest/restaurant/Horaires/horaires";
import { useParams } from "next/navigation";
import SkeletonLoader from "@/components/shared/skeletonLoader/skeletonLoader";
import RestoLoader from "@/components/guest/restaurant/RestoLoader/restoLoader";
import dynamic from "next/dynamic";

const Page = () => {
    const { slug } = useParams();
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
        slug ? `${process.env.NEXT_PUBLIC_API_URL}/restaurants/${slug}` : null,
        fetcher,
    );
    const Map = dynamic(
        () => import("@/components/guest/restaurant/location/restoLocation"),
        {
            ssr: false,
        },
    );
//   console.log(data)
    return (
        <main className="restaurant-page">
            {isLoading ? (
                <RestoLoader />
            ) : (
                <>
                    <RestoInfo data={data} />

                    <div className="resto-menu-panier">
                        <RestoMenu
                            acceptOrder={data.acceptOrder}
                            plats={data.plats}
                            categories={data.categories}
                        />
                        {data.acceptOrder == 1 && (
                            <RestoCart
                                tel={data.whatsappNumber}
                                restoId={data.id}
                            />
                        )}
                    </div>
                    <Horaires week={data.openingHours} />
                    {data.latitude && data.longitude && (
                        <Map
                            latitude={data.latitude}
                            longitude={data.longitude}
                        />
                    )}
                </>
            )}
        </main>
    );
};

export default Page;
