"use client";
import Button from "@/components/shared/button/button";
import Input from "@/components/shared/input/input";
import Textarea from "@/components/shared/textarea/textarea";
import { handleChange } from "@/helpers/function";
import React, { useState } from "react";

const RestoInfoStep = ({ data, setData, onNext, onPrevious }) => {
    const [errors, setErrors] = useState({
        restoName: "",
    });
    const handleValidate = () => {
        const errs = {};
        if (!data.restoName) errs.restoName = "Le nom du restaurant est requis";

        setErrors(errs);
        if (Object.keys(errs).length === 0) {
            onNext();
        }
    };
    return (
        <div>
            <div className="tab-header">
                <h3>Informations de base du restaurant</h3>
                <p>Entrez les informations du restaurant</p>
            </div>
            <div className="tab-content">
                <Input
                    label={"Nom du restaurant"}
                    required
                    value={data.restoName}
                    name={"restoName"}
                    errors={errors.restoName}
                    onChange={(e) => handleChange(e, data, setData)}
                />
                <Textarea
                    label={"Description"}
                    value={data.restoDescription}
                    name={"restoDescription"}
                    onChange={(e) => handleChange(e, data, setData)}
                />
            </div>
            <div className="wizard-buttons">
                <Button type="outline-btn" onClick={onPrevious}>
                    Précédent
                </Button>
                <Button onClick={handleValidate}>Suivant</Button>
            </div>
        </div>
    );
};

export default RestoInfoStep;
