"use client";
import React, { useState } from "react";
import "./onlineRestaurants.css";
import Image from "next/image";
import Link from "next/link";
import { RestaurantService } from "@/services/restauratnts.service";
import Spinner from "@/components/shared/spinner/spinner";
import { SkeletonLoaderLine } from "@/components/shared/skeletonLoader/skeletonLoader";
import { usePosition } from "@/context/locationContext";
import Button from "@/components/shared/button/button";

const OnlineRestaurants = () => {
    const { userPosition, handleUserPosition } = usePosition();
    const { data, error, isLoading } =
        RestaurantService.getOnline(userPosition);
    const [sectionUp, setSectionUp] = useState(false);

    return (
        <div className={`onlineRestaurants-section ${sectionUp ? " up" : ""}`}>
            <div className="onlineRestaurants-section-header">
                <p className="onlineRestaurants-section-title">
                    Restaurants digitaux près de vous
                </p>
                <i
                    className={`fi  ${sectionUp ? " fi-rr-angle-small-down" : "fi-rr-angle-small-up"}`}
                    onClick={() => setSectionUp(!sectionUp)}
                ></i>
            </div>
            {!userPosition && (
                <div className="onlineRestaurants-noLocation">
                    <p>
                        Activez la géolocalisation pour trouver les restaurants
                        proches de vous
                    </p>
                    <Button onClick={handleUserPosition}>
                        Déterminer ma position
                    </Button>
                </div>
            )}
            <div className="onlineRestaurants-list">
                {isLoading && userPosition && (
                    <>
                        <SkeletonLoaderLine />
                        <SkeletonLoaderLine />
                        <SkeletonLoaderLine />
                    </>
                )}
                {!isLoading && data?.restaurants?.length === 0 && (
                    <div className="onlineRestaurants-noLocation">
                        <p>Aucun restaurant disponible dans votre région. </p>
                    </div>
                )}
                {!isLoading &&
                    data?.restaurants?.map((resto) => (
                        <OnlineRestaurant key={resto.slug} data={resto} />
                    ))}
            </div>
        </div>
    );
};

export default OnlineRestaurants;

function OnlineRestaurant({ data }) {
    
    return (
        <Link className="onlineRestaurant" href={"/restaurants/" + data.slug}>
            <Image
                height={300}
                width={300}
                alt="logo-du-restaurant"
                src={
                    data.logo_path
                        ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${data.logo_path}`
                        : `https://ui-avatars.com/api/?name=${data.name.at(0)}&background=000&color=fff`
                }
                unoptimized
                className="onlineRestaurant-logo"
            />
            <div className="onlineRestaurant-info">
                <p>{data.name}</p>
                <div className="onlineRestaurant-specialities">
                    {data.specialities.map((s) => (
                        <span
                            className="onlineRestaurant-speciality"
                            key={s.id}
                        >
                            {s.designation}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}
