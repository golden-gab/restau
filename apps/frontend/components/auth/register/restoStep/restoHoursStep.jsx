import Button from "@/components/shared/button/button";
import Input from "@/components/shared/input/input";
import React from "react";

const RestoHoursStep = ({ data, setData, onNext, onPrevious }) => {
    const handleOpeningHourChange = (index, field, value) => {
        setData((prev) => ({
            ...prev,
            openingHours: prev.openingHours.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            ),
        }));
    };
    return (
        <div>
            <div className="tab-header">
                <h3>Horaires du restaurant</h3>
                <p>
                    Veuillez renseigner les horaires d'ouverture et de fermeture
                    de votre restaurant. Laissez vide si le restaurant est fermé ce jour-là.
                </p>
            </div>
            <div className="tab-content">
                {data.openingHours.map((dayInfo, index) => (
                    <div key={index} className="day-line">
                        <Input
                            label={"Jour"}
                            disabled
                            placeholder={""}
                            value={dayInfo.day}
                        />
                        <Input
                            label={"Ouverture"}
                            type={"time"}
                            value={dayInfo.open}
                            onChange={(e) =>
                                handleOpeningHourChange(
                                    index,
                                    "open",
                                    e.target.value
                                )
                            }
                        />
                        <Input
                            label={"Fermeture"}
                            type={"time"}
                            value={dayInfo.close}
                            onChange={(e) =>
                                handleOpeningHourChange(
                                    index,
                                    "close",
                                    e.target.value
                                )
                            }
                        />
                    </div>
                ))}
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
    );
};

export default RestoHoursStep;
