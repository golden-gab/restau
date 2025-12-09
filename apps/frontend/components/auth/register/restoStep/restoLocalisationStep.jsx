import Button from "@/components/shared/button/button";
import Input from "@/components/shared/input/input";
import React from "react";
import "./restoStep.css";

const RestoLocalisationStep = ({ data, setData, onNext, onPrevious }) => {
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
                        type={"text"}
                        placeholder={"Exemple : 4.0511"}
                        value={data.latitude}
                        name={"latitude"}
                        onChange={(e) => handleChange(e, data, setData)}
                    />
                    <Input
                        label={"Longitude"}
                        type={"text"}
                        placeholder={"Exemple : 9.7679"}
                        value={data.longitude}
                        name={"longitude"}
                        onChange={(e) => handleChange(e, data, setData)}
                    />
                    <Button type="outline-btn">
                        Récupérer ma position actuelle
                    </Button>
                </div>
                <div className="skip-step-container">
                    <p className="skip-step">Passer pour le moment</p>
                </div>

                <div className="wizard-buttons">
                    <Button type="outline-btn" onClick={onPrevious}>
                        Précédent
                    </Button>
                    <Button onClick={onNext}>Suivant</Button>
                </div>
            </div>
        </div>
    );
};

export default RestoLocalisationStep;
