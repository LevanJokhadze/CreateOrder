import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo/StepTwo";
import us from "images/us.png";

const CreateOrder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [fromCoords, setFromCoords] = useState(null);
  const [toCoords, setToCoords] = useState(null);

  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="bg-admin w-100 d-flex flex-column">
      <div className="d-flex flex-column mr-32 align-items-center">
        <div className="nav-item us-logo border-0 bg-grey-600 h-40 mt-3 ms-auto">
          <img src={us} alt="US Flag" />
        </div>
      </div>
      {currentStep === 1 && (
        <StepOne
          onNext={goToNextStep}
          setFromCoords={setFromCoords}
          setToCoords={setToCoords}
        />
      )}
      {currentStep === 2 && (
        <StepTwo
          onNext={goToNextStep}
          onPrevious={goToPreviousStep}
          fromCoords={fromCoords}
          toCoords={toCoords}
        />
      )}
      {/* Add more steps as needed */}
    </div>
  );
};

export default CreateOrder;
