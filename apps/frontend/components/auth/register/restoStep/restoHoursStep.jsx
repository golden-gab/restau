import Button from "@/components/shared/button/button";
import Input from "@/components/shared/input/input";
import React from "react";

const RestoHoursStep = ({ data, setData, onNext, onPrevious }) => {
    const [errors, setErrors] = React.useState({});

    const handleOpeningHourChange = (index, field, value) => {
        const updatedOpeningHours = data.openingHours.map((item, i) =>
            i === index ? { ...item, [field]: value } : item,
        );

        setData((prev) => ({
            ...prev,
            openingHours: updatedOpeningHours,
        }));

        // Validation APRÈS
        const { open, close } = updatedOpeningHours[index];

        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };

            if (open && close && open >= close) {
                newErrors[index] =
                    "L'heure d'ouverture doit être avant l'heure de fermeture";
            } else {
                delete newErrors[index];
            }

            return newErrors;
        });
    };

    function handleSkip() {
        // setData((prev) => ({
        //     ...prev,
        //     openingHours: [
        //         { day: "Lundi", open: "", close: "" },
        //         { day: "Mardi", open: "", close: "" },
        //         { day: "Mercredi", open: "", close: "" },
        //         { day: "Jeudi", open: "", close: "" },
        //         { day: "Vendredi", open: "", close: "" },
        //         { day: "Samedi", open: "", close: "" },
        //         { day: "Dimanche", open: "", close: "" },
        //     ],
        // }));
        onNext();
    }

    return (
        <div>
            <div className="tab-header">
                <h3>Horaires du restaurant</h3>
                <p>
                    Veuillez renseigner les horaires d'ouverture et de fermeture
                    de votre restaurant. Laissez vide si le restaurant est fermé
                    ce jour-là.
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
                            errors={errors[index]}
                            onChange={(e) =>
                                handleOpeningHourChange(
                                    index,
                                    "open",
                                    e.target.value,
                                )
                            }
                        />
                        <Input
                            label={"Fermeture"}
                            type={"time"}
                            value={dayInfo.close}
                            min={dayInfo.open || undefined}
                            onChange={(e) =>
                                handleOpeningHourChange(
                                    index,
                                    "close",
                                    e.target.value,
                                )
                            }
                        />
                    </div>
                ))}
            </div>
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
                <Button
                    onClick={onNext}
                    disabled={Object.keys(errors).length > 0}
                >
                    Suivant
                </Button>
            </div>
        </div>
    );
};

export default RestoHoursStep;
