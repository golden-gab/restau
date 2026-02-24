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
    const { data, error, isLoading } = RestaurantService.getOnline(userPosition);
    const [sectionUp, setSectionUp] = useState(false);
    return (
        <div className={`onlineRestaurants-section ${sectionUp ? " up" : ""}`}>
            <div className="onlineRestaurants-section-header">
                <p className="onlineRestaurants-section-title">
                    Quelques restaurants numériques dans votre ville
                </p>
                <i
                    className={`fi  ${sectionUp ? " fi-rr-angle-small-down" : "fi-rr-angle-small-up"}`}
                    onClick={() => setSectionUp(!sectionUp)}
                ></i>
            </div>
            {!userPosition && (
                <div className="onlineRestaurants-noLocation">
                    <p>
                        Active ta localisation pour voir les restaurants proches
                        de toi
                    </p>
                    <Button onClick={handleUserPosition}>
                        Activer la localisation
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

                {!isLoading &&
                    data &&
                    data.member.map((resto) => (
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
                    data.logoPath
                        ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${data.logoPath}`
                        : `${process.env.NEXT_PUBLIC_STORAGE_URL}/restaurants/logos/default.jpg`
                }
                className="onlineRestaurant-logo"
            />
            <div className="onlineRestaurant-info">
                <p>{data.name}</p>
                <div className="onlineRestaurant-specialities">
                    {data.specialities.map((s) => (
                        <span className="onlineRestaurant-speciality">
                            {s.designation}
                        </span>
                    ))}

                    <span className="onlineRestaurant-speciality">Glacier</span>
                    <span className="onlineRestaurant-speciality">
                        Fast food
                    </span>
                </div>
            </div>
            {/* <Link href={"/restaurants/"}>
                <i
                    className="fi fi-sr-up-right-from-square restaurant-action"
                    title="En savoir plus"
                ></i>
            </Link> */}
        </Link>
    );
}
