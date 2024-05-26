import React, { useState, useEffect, useRef } from "react";
import icon from "images/icon.png";
import axios from "axios";

const options = {
  cargo_type: ["Type 1", "Type 2", "Type 3"],
  container_type: ["Type A", "Type B", "Type C"],
  loading_type: ["Type X", "Type Y", "Type Z"],
  cargo_category: ["Category 1", "Category 2", "Category 3"],
};

const Flat = ({ onSubmit, transportation_type }) => {
  const initialFormData = {
    container_type: "",
    cargo_name: "",
    loading_type: "",
    cargo_category: "",
    cargo_type: "",
    weight: "",
    insurance: false,
    comments: "",
    price: "",
    dimension: { length: "", width: "", height: "" },
    transportation_type,
    file: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [dropdownState, setDropdownState] = useState({
    container_type: false,
    loading_type: false,
    cargo_category: false,
    cargo_type: false,
  });
  const [searchTerms, setSearchTerms] = useState({
    container_type: "",
    loading_type: "",
    cargo_category: "",
    cargo_type: "",
  });

  const dropdownRefs = {
    container_type: useRef(null),
    loading_type: useRef(null),
    cargo_category: useRef(null),
    cargo_type: useRef(null),
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(dropdownRefs).forEach((key) => {
        if (
          dropdownRefs[key].current &&
          !dropdownRefs[key].current.contains(event.target)
        ) {
          setDropdownState((prev) => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleChange = ({ target: { name, value, type, checked, files } }) => {
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        file: files[0], // Update file property with the selected file
      }));
    } else if (["length", "width", "height"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        dimension: { ...prev.dimension, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log formData object with data
    console.log("Form Data:", formData);

    // Create a new FormData object
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "dimension") {
        const { length, width, height } = formData.dimension;
        formDataToSend.append("dimension[length]", length);
        formDataToSend.append("dimension[width]", width);
        formDataToSend.append("dimension[height]", height);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Append the file to the FormData object
    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

    // Send the FormData object to the backend
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/documents/create-order",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("There was an error sending the data:", error);
    }
  };

  const toggleDropdown = (key) => {
    setDropdownState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearchInputChange = (key, value) => {
    setSearchTerms((prev) => ({ ...prev, [key]: value }));
  };

  const handleOptionClick = (key, option) => {
    setFormData((prev) => ({ ...prev, [key]: option }));
    setDropdownState((prev) => ({ ...prev, [key]: false }));
  };

  const filteredOptions = (key) => {
    if (options[key] && searchTerms[key] !== undefined) {
      return options[key].filter((option) =>
        option.toLowerCase().includes(searchTerms[key].toLowerCase())
      );
    }
    return [];
  };

  const renderDropdown = (label, key, value) => (
    <div className="col-md-6">
      <div className="mb-3">
        <label htmlFor={key} className="form-label">
          {label}
        </label>
        <div className="dropdown" ref={dropdownRefs[key]}>
          <input
            type="text"
            className="form-control input"
            id={key}
            name={key}
            value={value}
            onChange={handleChange}
            onClick={() => toggleDropdown(key)}
            aria-haspopup="true"
            aria-expanded={dropdownState[key] ? "true" : "false"}
          />
          <ul
            className={`dropdown-menu ${dropdownState[key] ? "show" : ""}`}
            aria-labelledby="dropdownMenuButton"
          >
            <li>
              <input
                type="search"
                className="form-control input"
                placeholder="Search..."
                value={searchTerms[key]}
                onChange={(e) => handleSearchInputChange(key, e.target.value)}
              />
            </li>
            {filteredOptions(key).map((option) => (
              <li key={option}>
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => handleOptionClick(key, option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {renderDropdown("Type *", "container_type", formData.container_type)}
          {renderDropdown(
            "Loading type",
            "loading_type",
            formData.loading_type
          )}
          {renderDropdown(
            "Cargo category *",
            "cargo_category",
            formData.cargo_category
          )}
          {renderDropdown("Cargo type *", "cargo_type", formData.cargo_type)}
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="cargo_name" className="form-label">
                Cargo name *
              </label>
              <input
                type="text"
                className="form-control input"
                id="cargo_name"
                name="cargo_name"
                value={formData.cargo_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="weight" className="form-label">
                Weight *
              </label>
              <input
                type="text"
                className="form-control input"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price *
              </label>
              <input
                type="text"
                className="form-control input"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="dimension" className="form-label">
                Dimensions (meters)
              </label>
              <div className="dimensions input">
                <input
                  type="text"
                  className="form-control"
                  id="length"
                  name="length"
                  value={formData.dimension.length}
                  onChange={handleChange}
                />
                <p>x</p>
                <input
                  type="text"
                  className="form-control"
                  id="width"
                  name="width"
                  value={formData.dimension.width}
                  onChange={handleChange}
                />
                <p>x</p>
                <input
                  type="text"
                  className="form-control"
                  id="height"
                  name="height"
                  value={formData.dimension.height}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="insurance" className="form-label">
              Is cargo insured? *
            </label>
            <div className="mb-3 checkboxes">
              <div className="form-check d-flex align-items-center checkbox">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="insurance"
                  name="insurance"
                  checked={formData.insurance}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="insurance">
                  Yes
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3 comments">
          <label htmlFor="comments" className="form-label">
            Comments
          </label>
          <textarea
            name="comments"
            className="form-control textarea"
            id="comments"
            value={formData.comments}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="create-img file">
          <input className="file" type="file" onChange={handleChange} />
          <div className="icon">
            <img src={icon} alt="" />
          </div>
          <div className="text">
            <p className="darker">Drag & drop or Choose a file to upload</p>
            <p className="fader">
              DOCX, XLSX, PDF, JPG, and PNG formats up to 50 MB
            </p>
          </div>
          <div className="text-sm-center mt-2">
            <div className="browse">
              <button>Browse</button>
            </div>
          </div>
        </div>
        <button>Submit</button>
      </form>
    </>
  );
};

export default Flat;
