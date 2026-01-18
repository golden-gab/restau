"use client";
import Button from "@/components/shared/button/button";
import Input from "@/components/shared/input/input";
import React, { useState } from "react";
import "./restoStep.css";
import { handleChange } from "@/helpers/function";

const RestoLocalisationStep = ({ data, setData, onNext, onPrevious }) => {
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
                    console.log("hi");
                },
                (err) => {
                    setErrors({
                        ...errors,
                        latitude: "Vous devez autoriliser la géolocalisation",
                        longitude: "Vous devez autoriliser la géolocalisation",
                    });
                    setLoadPosition(false);
                }
            );
        } else {
            alert("La géolocalisation n'est pas supportée par ce navigateur.");
        }
    };
    return (
        <div>
            <div className="tab-header">
                <h3>Localisation du restaurant</h3>
                <p>
                    Si vous avez un local, veuillez enrégistrer ses coodonnées
                    géographiques
                </p>
            </div>
            <div className="tab-content">
                <Input
                    label={"Ville"}
                    type={"text"}
                    placeholder={"Exemple : Douala"}
                    value={data.ville}
                    name={"ville"}
                    onChange={(e) => handleChange(e, data, setData)}
                />
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
                    <Button
                        type="outline-btn"
                        onClick={handleLocate}
                        isLoading={loadPosition}
                    >
                        Récupérer ma position actuelle
                    </Button>
                </div>
                <div className="skip-step-container">
                    <Button className="skip-step" type="outline-btn" onClick={handleSkip}>
                        Passer pour le moment
                    </Button>
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
