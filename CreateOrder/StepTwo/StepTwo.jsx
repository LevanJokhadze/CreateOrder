import React, { useState } from "react";
import ImageSelection from "./ImageSelection";
import Flat from "./Forms/Flat";
import Refeer from "./Forms/Refeer";
import Tent from "./Forms/Tent";
import Common from "./Forms/Common";
import "./Forms/forms.scss";

const formComponents = {
  form1: Tent,
  form2: Flat,
  form3: Refeer,
};

const StepTwo = ({ onNext, onPrevious }) => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    const formDetails = {
      selectedForm,
      data: { ...data, selectedImage: selectedForm }, // Include the selected image key in the form data
    };
    setFormData(formDetails);
  };

  const handleImageSelect = (formKey) => {
    setSelectedForm(formKey);
  };

  const SelectedFormComponent = formComponents[selectedForm];

  return (
    <>
      <div className="outer">
        <div className="d-flex flex-column justify-content-center align-items-start">
          <h1 className="title">Specify your cargo</h1>
          <ImageSelection onSelect={handleImageSelect} />
          {selectedForm ? (
            <>
              <SelectedFormComponent onSubmit={handleFormSubmit} />
              {formData && (
                <div>
                  <h2>Submitted Data</h2>
                </div>
              )}
            </>
          ) : (
            <Common />
          )}
        </div>
      </div>
      <div className="bg-white border w-100 mt-auto absolute">
        <div className="d-flex flex-row gap-2 f-normal pt-4 pb-5 justify-content-center">
          <button className="btn bg-white text-black font-small rounded-1 py-2 input-border w-300">
            Cancel
          </button>
          <button className="btn bg-shadeblue text-white font-small rounded-1 py-2 w-300">
            Go next
          </button>
        </div>
      </div>
    </>
  );
};

export default StepTwo;
