import React, { useState } from "react";
import "./cargo.scss";
import cargo from "images/cargo-trailer.png";

const ImageSelection = ({ onSelect }) => {
  const [activeForm, setActiveForm] = useState(null);

  const handleClick = (formKey) => {
    onSelect(formKey);
    setActiveForm(formKey);
  };

  return (
    <div className="imgs d-flex">
      <div
        className={`item-1 bd pointer ${
          activeForm === "form1" ? "active-img" : ""
        }`}
        onClick={() => handleClick("form1")}
      >
        <img
          src={cargo}
          alt="Form 1"
          onClick={(e) => {
            e.stopPropagation();
            handleClick("form1");
          }}
        />
        <p>Tent</p>
      </div>
      <div
        className={`item-2 bd pointer ${
          activeForm === "form2" ? "active-img" : ""
        }`}
        onClick={() => handleClick("form2")}
      >
        <img
          src={cargo}
          alt="Form 2"
          onClick={(e) => {
            e.stopPropagation();
            handleClick("form2");
          }}
        />
        <p>Flat</p>
      </div>
      <div
        className={`item-3 bd pointer ${
          activeForm === "form3" ? "active-img" : ""
        }`}
        onClick={() => handleClick("form3")}
      >
        <img
          src={cargo}
          alt="Form 3"
          onClick={(e) => {
            e.stopPropagation();
            handleClick("form3");
          }}
        />
        <p>Refeer</p>
      </div>
    </div>
  );
};

export default ImageSelection;
