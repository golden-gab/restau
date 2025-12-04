"use client";
import React, { useState, useRef } from "react";
import StepWizard from "react-step-wizard";
import Image from "next/image";
import Input from "@/components/shared/input/input";
import Button from "@/components/shared/button/button";
import Textarea from "@/components/shared/textarea/textarea";
import { handleChange, sendRequest } from "@/helpers/function";
import "./style.css";
import WizardHeader from "@/components/shared/wizardHeader/wizardHeader";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const Register = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        restoName: "",
        restoDescription: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        restoName: "",
    });
    const router = useRouter(); 
    const { trigger, isMutating } = useSWRMutation(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        sendRequest
    );
    const handleComplete = async () => {
        // toast.success("Votre restaurant a été créé avec succès")
        try {
            const result = await trigger(data);
            console.log(result)
            toast.success("Votre restaurant a été créé avec succès"); 
            // router.push("/about");
        } catch (e) {
            // error handling
            console.error(e);
        }
    };
    const [currentStep, setCurrentStep] = useState(1);
    const wizardRef = useRef(null);

    // Validation des étapes
    const validateFirstTab = () => {
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
        return Object.keys(errs).length === 0;
    };

    const validateSecondTab = () => {
        const errs = {};
        if (!data.restoName) errs.restoName = "Le nom du restaurant est requis";

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleNextStep = (currentStep) => {
        if (currentStep === 2 && !validateFirstTab()) return;
        if (currentStep === 3 && !validateSecondTab()) return;
        wizardRef.current.nextStep();
    };

    const handlePreviousStep = () => {
        wizardRef.current.previousStep();
    };

    const steps = ["Inscription", "Compte", "Restaurant", "Confirmation"];
    return (
        <div className="register-page">
            <Image
                height={1080}
                width={1080}
                alt="fried-chicken-image"
                src={"/register-image.jpg"}
                className="register-image"
            />
            <div className="register-container">
                <div className="back">
                    <Link href={"/about"}>
                        <Image
                            height={300}
                            width={300}
                            alt="fried-chicken-image"
                            src={"/logo1.png"}
                            className="register-logo"
                        />
                    </Link>
                </div>
                <WizardHeader currentStep={currentStep} steps={steps} />
                <StepWizard
                    ref={wizardRef}
                    onStepChange={({ activeStep }) =>
                        setCurrentStep(activeStep)
                    }
                >
                    <div>
                        <div className="tab-header">
                            {/* <h3>
                                Bienvenue sur {process.env.NEXT_PUBLIC_APP_NAME}🎉
                            </h3> */}<h3>
                                Bienvenue 🎉
                            </h3>
                            <p>Merci de l'intérêt que vous nous portez !</p>
                            <p className="second-description">
                                En poursuivant, vous confirmez avoir lu et
                                accepté nos
                                <a href="/conditions" className="link">
                                    {" "}
                                    conditions d’utilisation{" "}
                                </a>
                                ainsi que notre
                                <a href="/confidentialite" className="link">
                                    {" "}
                                    politique de confidentialité
                                </a>
                                .
                            </p>
                        </div>
                        <div className="wizard-buttons">
                            <Button onClick={() => handleNextStep(1)}>
                                Suivant
                            </Button>
                        </div>
                    </div>
                    {/* Étape 1 */}
                    <div>
                        <div className="tab-header">
                            <h3>Informations du compte</h3>
                            <p>
                                Entrez les informations de l'administrateur du
                                restaurant
                            </p>
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
                            <Button
                                type="outline-btn"
                                onClick={handlePreviousStep}
                            >
                                Précédent
                            </Button>
                            <Button onClick={() => handleNextStep(2)}>
                                Suivant
                            </Button>
                        </div>
                    </div>

                    {/* Étape 2 */}
                    <div>
                        <div className="tab-header">
                            <h3>Informations du restaurant</h3>
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
                            <Button
                                type="outline-btn"
                                onClick={handlePreviousStep}
                            >
                                Précédent
                            </Button>
                            <Button onClick={() => handleNextStep(3)}>
                                Suivant
                            </Button>
                        </div>
                    </div>

                    {/* Étape 3 */}
                    <div>
                        <div className="tab-header">
                            <h3>Confirmation</h3>
                            <p>Confirmez les informations suivantes</p>
                        </div>
                        <div className="tab-content">
                            <div className="confirm-line">
                                <span className="confirm-label">
                                    Email de l'administrateur:{" "}
                                </span>
                                <span className="confirm-value">
                                    {data.email}
                                </span>
                            </div>
                            <div className="confirm-line">
                                <span className="confirm-label">
                                    Nom du restaurant :{" "}
                                </span>
                                <span className="confirm-value">
                                    {data.restoName}
                                </span>
                            </div>
                            <div className="confirm-line">
                                <span className="confirm-label">
                                    Description du restaurant :{" "}
                                </span>
                                <p className="confirm-value">
                                    {data.restoDescription ||
                                        "Aucune description"}
                                </p>
                            </div>
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
                </StepWizard>
            </div>
        </div>
    );
};

export default Register;
