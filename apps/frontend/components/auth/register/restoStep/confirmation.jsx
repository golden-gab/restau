import Button from "@/components/shared/button/button";
import React from "react";

const Confirmation = ({
    data,
    handlePreviousStep,
    handleComplete,
    isMutating,
}) => {
    return (
        <div>
            <div className="tab-header">
                <h3>Confirmation</h3>
                <p>Confirmez les informations suivantes</p>
            </div>
            {/* <div className="confirm-content">
                <p>
                    Vous êtes sur le point de créer le restaurant{" "}
                    <span className="confirm-label"> {data.restoName} </span>
                    avec pour adresse email d'administration{" "}
                    <span className="confirm-label">{data.email}</span>
                </p>
            </div> */}
            <div className="confirm-blocs">
                <ConfirmBlock
                    title="Informations Utilisateur"
                    description="Ces informations seront utilisées pour administrer votre restaurant."
                    data={[
                        { label: "Email", value: data.email },
                    ]}
                />
                <ConfirmBlock
                    title="Informations Restaurant"
                    description={"Information de bases du restaurant"}
                    data={[
                        { label: "Nom du restaurant", value: data.restoName },
                        { label: "Description", value: data.restoDescription ? data.restoDescription : "Non défini" },
                    ]}
                />
                <ConfirmBlock
                    title="Localisation"
                    description={"Il s'agit de la localisation de votre restaurant"}
                    data={[
                        { label: "Ville", value: data.ville ? data.ville : "Non défini" },
                        { label: "Latitude", value: data.latitude ? data.latitude : "Non défini"},
                        { label: "Longitude", value: data.longitude ? data.longitude : "Non défini" },
                    ]}
                />
                <ConfirmBlock
                    description={"Les heures d'ouverture de votre restaurant"}
                    title="Horaires d'Ouverture"
                    data={data.openingHours.map((hours, index) => ({
                        label: hours.day,
                        value:
                            hours.open && hours.close
                                ? `${hours.open} - ${hours.close}`
                                : "Non défini",
                    }))}
                />
            </div>
            <div className="wizard-buttons">
                <Button
                    type="outline-btn"
                    onClick={handlePreviousStep}
                    disabled={isMutating}
                >
                    Précédent
                </Button>
                <Button onClick={handleComplete}>
                    {isMutating
                        ? "Création en cours..."
                        : "Créer mon restaurant"}
                </Button>
            </div>
        </div>
    );
};

export default Confirmation;

function ConfirmBlock({ title, description,data }) {
    return (
        <div className="confirm-block">
            <div className="confim-title">
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
            <div className="confirm-data">
                {data.map((item, index) => (
                    <div key={index} className="data-item">
                        <span className="data-label">{item.label} : </span>
                        <span className="data-value">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
