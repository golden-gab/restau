import React from 'react';
import './wizardHeader.css'

const WizardHeader = ({ currentStep, steps }) => {
  return (
    <div className="wizard-header">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`wizard-step ${currentStep === index + 1 ? "active" : ""}`}
        >
          <div className="step-number">{index + 1}</div>
          <div className="step-title">{step}</div>
        </div>
      ))}
    </div>
  );
}

export default WizardHeader;
