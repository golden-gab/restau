import {
    APIProvider,
    Map,
    MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import React from "react";

const GMap = () => {
    return (
        <APIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            onLoad={() => console.log("Maps API has loaded.")}
        >
            <Map
                style={{ width: "100vw", height: "100vh" }}
                defaultCenter={{ lat: 22.54992, lng: 0 }}
                defaultZoom={3}
                gestureHandling="greedy"
                disableDefaultUI
            />
        </APIProvider>
    );
};

export default GMap;
