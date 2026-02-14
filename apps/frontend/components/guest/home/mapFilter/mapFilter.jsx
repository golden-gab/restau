import React from "react";
import "./mapFilter.css";
import { SpecialityService } from "@/services/specialities.service";
import { useMapFilterStore } from "@/stores/useMapFilterStore";

const MapFilter = () => {
    const { data, isLoading } = SpecialityService.getAll();

    const { selectedSpecialities, toggleSpeciality, closeFilter } =
        useMapFilterStore();

    return (
        <div className="map-filter">
            <div className="map-filter-header">
                <h4>Spécialités</h4>
                <i
                    className="fi fi-sr-cross close-btn"
                    onClick={closeFilter}
                ></i>
            </div>
            <div className="map-filter-blocs">
                <div className="map-filter-bloc">
                    <div className="map-filter-specialities">
                        {isLoading ? (
                            <p>Chargement...</p>
                        ) : (
                            data.member.map((speciality) => (
                                <div
                                    key={speciality.id}
                                    className={`map-filter-speciality ${
                                        selectedSpecialities.includes(
                                            speciality.id,
                                        )
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        toggleSpeciality(speciality.id)
                                    }
                                >
                                    {speciality.designation}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapFilter;
