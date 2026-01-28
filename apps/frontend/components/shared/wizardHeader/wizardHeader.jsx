import React, { useEffect, useRef } from 'react';
import './wizardHeader.css';

const WizardHeader = ({ currentStep, steps }) => {
  const stepRefs = useRef([]);

  useEffect(() => {
    const activeIndex = currentStep - 1;
    const activeStep = stepRefs.current[activeIndex];

    if (activeStep) {
      activeStep.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [currentStep]);

  return (
    <div className="wizard-header">
      {steps.map((step, index) => (
        <div
          key={index}
          ref={(el) => (stepRefs.current[index] = el)}
          className={`wizard-step ${currentStep === index + 1 ? 'active' : ''}`}
        >
          <div className="step-number">{index + 1}</div>
          <div className="step-title">{step}</div>
        </div>
      ))}
    </div>
  );
};

export default WizardHeader;
