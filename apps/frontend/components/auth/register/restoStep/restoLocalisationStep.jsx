"use client";
import Button from "@/components/shared/button/button";
import Input from "@/components/shared/input/input";
import React, { useState } from "react";
import "./restoStep.css";
import { handleChange } from "@/helpers/function";
import Spinner from "@/components/shared/spinner/spinner";

const RestoLocalisationStep = ({ data, setData, onNext, onPrevious }) => {
    const [activeType, setActiveType] = useState("physique");
    const items = [
        "Yaoundé",
        "Douala",
        "Bafoussam",
        "Bamenda",
        "Garoua",
        "Maroua",
        "Ngaoundéré",
        "Ebolowa",
        "Bertoua",
        "Buéa",
    ];
    // const [filtered, setFiltered] = useState(items);
    const [openFilter, setOpenFilter] = useState(false);
    const [errors, setErrors] = useState({
        ville: "",
        latitude: "",
        longitude: "",
    });
    const [loadPosition, setLoadPosition] = useState(false);
    const handleValidate = () => {
        const errs = {};
        if (!data.latitude && data.longitude) {
            errs.latitude = "Vous devez également rentrer la latitude";

            errs.longitude = " .";
        }
        if (data.latitude && !data.longitude) {
            errs.longitude = "Vous devez également rentrer la longitude";
            errs.latitude = " .";
        }

        setErrors(errs);
        if (Object.keys(errs).length === 0) {
            onNext();
        }
    };
    function handleSkip() {
        setData({
            ...data,
            latitude: "",
            longitude: "",
        });
        onNext();
    }
    const handleLocate = () => {
        if (navigator.geolocation) {
            setLoadPosition(true);
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setData({
                        ...data,
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    });
                    setLoadPosition(false);
                },
                (err) => {
                    setErrors({
                        ...errors,
                        latitude: "Vous devez autoriliser la géolocalisation",
                        longitude: "Vous devez autoriliser la géolocalisation",
                    });
                    setLoadPosition(false);
                },
            );
        } else {
            alert("La géolocalisation n'est pas supportée par ce navigateur.");
        }
    };

    const filtered = items.filter((item) =>
        item.toLowerCase().includes(data.ville.toLowerCase()),
    );

    return (
        <div>
            <div className="tab-header">
                <h3>Localisation du restaurant</h3>
                <p>
                    En fonction du type de restaurant, veuillez renseigner sa localisation
                </p>
            </div>
            <div className="resto-types">
                <div
                    className={`resto-type ${activeType === "physique" ? "active" : ""}`}
                    onClick={() => setActiveType("physique")}
                >
                    <i className="fi fi-rr-terrace"></i>
                    <span>J'ai un restaurant physique</span>
                </div>
                <div
                    className={`resto-type ${activeType === "online" ? "active" : ""}`}
                    onClick={() => setActiveType("online")}
                >
                    <i className="fi fi-rr-site-alt"></i>
                    <span>J'ai un restaurant en ligne</span>
                </div>
            </div>
            <div className="resto-type-info">
                {activeType === "online" ? (
                    <p>
                        <i className="fi fi-rr-info"></i>Assurez d'orthographier
                        correctement la ville dans laquelle vous vous situez.
                        Cela nous aide à mieux vous référencer .
                    </p>
                ) : (
                    <p>
                        <i className="fi fi-rr-info"></i>La latitude et la
                        longitude de votre restaurant nous aide à le positionner
                        sur notre carte .
                    </p>
                )}
            </div>
            <div className="tab-content">
                {activeType === "online" ? (
                    <>
                        <Input
                            label={"Ville"}
                            type={"text"}
                            placeholder={"Exemple : Douala"}
                            value={data.ville}
                            name={"ville"}
                            list={"frameworks"}
                            onChange={(e) => {
                                handleChange(e, data, setData);
                                setOpenFilter(true);
                            }}
                        />
                        {openFilter && data.ville != "" && (
                            <ul className="ville-list">
                                {filtered.map((item) => (
                                    <li
                                        key={item}
                                        onClick={() => {
                                            setData({ ...data, ville: item });
                                            setOpenFilter(false);
                                        }}
                                        className="ville-item"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                ) : (
                    <div className="localisation-line">
                        <Input
                            label={"Latitude"}
                            type={"number"}
                            step={0.1}
                            placeholder={"Exemple : 4.0511"}
                            value={data.latitude}
                            errors={errors.latitude}
                            name={"latitude"}
                            onChange={(e) => handleChange(e, data, setData)}
                        />
                        <Input
                            label={"Longitude"}
                            type={"number"}
                            step={0.1}
                            placeholder={"Exemple : 9.7679"}
                            value={data.longitude}
                            errors={errors.longitude}
                            name={"longitude"}
                            onChange={(e) => handleChange(e, data, setData)}
                        />
                        <div
                            className="localte-section   locate-btn"
                            onClick={handleLocate}
                        >
                            {loadPosition ? (
                                <Spinner />
                            ) : (
                                <i
                                    className="fi fi-sr-land-layer-location"
                                    title="Récupérer ma position actuelle"
                                    // isLoading={loadPosition}
                                ></i>
                            )}
                        </div>
                    </div>
                )}

                <div className="skip-step-container">
                    <span
                        className="skip-step"
                        type="outline-btn"
                        onClick={handleSkip}
                    >
                        Passer pour le moment{" "}
                        <i className="fi fi-rr-arrow-right"></i>
                    </span>
                </div>

                <div className="wizard-buttons">
                    <Button type="outline-btn" onClick={onPrevious}>
                        Précédent
                    </Button>
                    <Button onClick={handleValidate}>Suivant</Button>
                </div>
            </div>
        </div>
    );
};

export default RestoLocalisationStep;
