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
import UserStep from "@/components/auth/register/userStep/userStep";
import RestoInfoStep from "@/components/auth/register/restoStep/restoInfoStep";
import RestoLocalisationStep from "@/components/auth/register/restoStep/restoLocalisationStep";
import RestoHoursStep from "@/components/auth/register/restoStep/restoHoursStep";

const Register = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        restoName: "",
        restoDescription: "",
        ville: "",
        latitude: "",
        longitude: "",
        openingHours: [
            { day: "Lundi", open: "", close: "" },
            { day: "Mardi", open: "", close: "" },
            { day: "Mercredi", open: "", close: "" },
            { day: "Jeudi", open: "", close: "" },
            { day: "Vendredi", open: "", close: "" },
            { day: "Samedi", open: "", close: "" },
            { day: "Dimanche", open: "", close: "" },
        ],
    });

    const router = useRouter();
    const { trigger, isMutating } = useSWRMutation(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        sendRequest,
    );
    const handleComplete = async () => {
        // toast.success("Votre restaurant a été créé avec succès")
        try {
            const result = await trigger(data);
            console.log(result);
            // Vérifier si le résultat contient une erreur
            if (result?.errors) {
                toast.error(result.message || "Une erreur est survenue");
                return;
            }

            toast.success("Votre restaurant a été créé avec succès");
            window.open(process.env.NEXT_PUBLIC_ADMIN_URL, '_blank');
            router.push("/");
        } catch (e) {
            toast.error(e.message || "Une erreur est survenue");
        }
    };
    const [currentStep, setCurrentStep] = useState(1);
    const wizardRef = useRef(null);

    // Validation des étapes

    const validateSecondTab = () => {
        const errs = {};
        if (!data.restoName) errs.restoName = "Le nom du restaurant est requis";

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleNextStep = (currentStep) => {
        wizardRef.current.nextStep();
    };

    const handlePreviousStep = () => {
        wizardRef.current.previousStep();
    };

    const steps = [
        "Inscription",
        "Compte",
        "Restaurant",
        "Localisation",
        "Horaire",
        "Confirmation",
    ];
    return (
        <div className="register-page">
            {/* <Image 
                height={1080}
                width={1080}
                alt="fried-chicken-image"
                src={"/register-image.jpg"}
                className="register-image"
            />*/}

            <Link href={"/about"} className="back-link">
                <i className="fi fi-rr-arrow-left"></i> Acceuil
            </Link>
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
                            </h3> */}
                            <h3>Bienvenue 🎉</h3>
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
                            <p></p>
                            <Button onClick={() => handleNextStep(1)}>
                                Suivant
                            </Button>
                        </div>
                    </div>
                    {/* Étape 1 */}
                    <UserStep
                        data={data}
                        setData={setData}
                        onNext={handleNextStep}
                        onPrevious={handlePreviousStep}
                    />

                    {/* Étape 2 */}

                    <RestoInfoStep
                        data={data}
                        setData={setData}
                        onNext={handleNextStep}
                        onPrevious={handlePreviousStep}
                    />

                    {/* Étape 3 */}
                    <RestoLocalisationStep
                        data={data}
                        setData={setData}
                        onNext={handleNextStep}
                        onPrevious={handlePreviousStep}
                    />

                    <RestoHoursStep
                        data={data}
                        setData={setData}
                        onNext={handleNextStep}
                        onPrevious={handlePreviousStep}
                    />
                    <div>
                        <div className="tab-header">
                            <h3>Confirmation</h3>
                            <p>Confirmez les informations suivantes</p>
                        </div>
                        <div className="confirm-content">
                            <p>
                                Vous êtes sur le point de créer le restaurant{" "}
                                <span className="confirm-label">
                                    {" "}
                                    {data.restoName}{" "}
                                </span>
                                avec pour adresse email d'administration{" "}
                                <span className="confirm-label">
                                    {data.email}
                                </span>
                            </p>
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
