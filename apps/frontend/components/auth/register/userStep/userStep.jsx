"use client";
import Button from "@/components/shared/button/button";
import Input from "@/components/shared/input/input";
import { handleChange } from "@/helpers/function";
import React, { useState } from "react";

const UserStep = ({ data, setData, onNext, onPrevious }) => {
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleValidate = () => {
        const errs = {};
        if (!data.email) errs.email = "Le champ email est requis";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
            errs.email = "Veuillez renseigner un email correct";

        if (!data.password) errs.password = "Le champ mot de passe est requis";
        else if (data.password.length < 5)
            errs.password = "5 caractères minimum";

        if (!data.confirmPassword)
            errs.confirmPassword = "Vous devez confirmer le mot de passe";
        else if (data.confirmPassword !== data.password)
            errs.confirmPassword = "Vous devez utiliser le même mot de passe";

        setErrors(errs);
        if (Object.keys(errs).length === 0) {
            onNext();
        }
    };
    return (
        <div>
            <div className="tab-header">
                <h3>Informations du compte</h3>
                <p>Entrez les informations de l'administrateur du restaurant</p>
            </div>
            <div className="tab-content">
                <Input
                    label={"Email"}
                    type={"email"}
                    placeholder={"Exemple :User@gmail.com"}
                    required
                    value={data.email}
                    name={"email"}
                    errors={errors.email}
                    onChange={(e) => handleChange(e, data, setData)}
                />
                <Input
                    label={"Mot de passe"}
                    required
                    type={"password"}
                    value={data.password}
                    name={"password"}
                    errors={errors.password}
                    onChange={(e) => handleChange(e, data, setData)}
                />
                <Input
                    required
                    label={"Confirmer le mot de passe"}
                    type={"password"}
                    value={data.confirmPassword}
                    name={"confirmPassword"}
                    errors={errors.confirmPassword}
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

export default UserStep;
