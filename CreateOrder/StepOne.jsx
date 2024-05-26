import React, { useEffect, useState, useRef } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import "@vis.gl/react-google-maps/examples.css";
import StepSideBar from "./StepSideBar";
import { GoPackage } from "react-icons/go";
import { FaLocationDot } from "react-icons/fa6";
import { useJsApiLoader } from "@react-google-maps/api";
import Directions from "./Directions";
import PropTypes from "prop-types";

const API_KEY = import.meta.env.VITE_API_GOOGLE_API;
const libraries = ["places"];

const StepOne = ({ onNext, setFromCoords, setToCoords }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const fromRef = useRef(null);
  const toRef = useRef(null);

  useEffect(() => {
    if (isLoaded) {
      const fromAutocomplete = new window.google.maps.places.Autocomplete(
        fromRef.current
      );
      fromAutocomplete.setFields(["formatted_address", "geometry"]);
      fromAutocomplete.addListener("place_changed", () => {
        const place = fromAutocomplete.getPlace();
        setFrom(place.formatted_address || place.name);
        setFromCoords(place.geometry?.location);
      });

      const toAutocomplete = new window.google.maps.places.Autocomplete(
        toRef.current
      );
      toAutocomplete.setFields(["formatted_address", "geometry"]);
      toAutocomplete.addListener("place_changed", () => {
        const place = toAutocomplete.getPlace();
        setTo(place.formatted_address || place.name);
        setToCoords(place.geometry?.location);
      });
    }
  }, [isLoaded, setFromCoords, setToCoords]);

  const handleGetCoordinates = async () => {
    if (from && to) {
      onNext();
    } else {
      alert("Please enter both 'From' and 'To' locations.");
    }
  };

  return (
    <>
      <div className="d-flex flex-row justify-items-between justify-content-around">
        <StepSideBar currentStep={1} />
        <div className="ms-4">
          <p className="darkblue font-23 mb-112 ml-34">
            Tell us about your locations
          </p>
          <div className="d-flex flex-row align-items-center">
            <div className="d-flex flex-column justify-content-between me-3 align-items-center">
              <GoPackage className="icon-size text-black opacity-50" />
              <hr
                style={{
                  height: "70px",
                  width: "5px",
                  backgroundColor: "#9d9d9d",
                  margin: "5px 0 7px",
                  opacity: "1",
                  border: "dashed 3.3px",
                  color: "#f5f2ef",
                }}
              />
              <FaLocationDot className="icon-size text-black opacity-50" />
            </div>
            <form className="w-350">
              <div className="d-flex flex-column mb-5">
                <label
                  htmlFor="from"
                  className="opacity-75 mb-1 font-15 text-black"
                >
                  From
                </label>
                <input
                  type="text"
                  className="input-border form-control h-40 bg-form"
                  id="from"
                  ref={fromRef}
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
              <div className="d-flex flex-column mb-3">
                <label
                  htmlFor="to"
                  className="opacity-75 mb-1 font-15 text-black"
                >
                  To
                </label>
                <input
                  type="text"
                  className="input-border form-control h-40 bg-form"
                  id="to"
                  ref={toRef}
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
        <APIProvider apiKey={API_KEY}>
          <Map
            defaultCenter={{ lat: 44.65, lng: 39.38 }}
            defaultZoom={6}
            gestureHandling={"greedy"}
            fullscreenControl={false}
            className="h-450 w-400 mt-4 ms-5"
          >
            {from && to ? (
              <Directions key={`${from}-${to}`} from={from} to={to} />
            ) : null}
          </Map>
        </APIProvider>
      </div>
      <div className="bg-white border w-100 mt-auto">
        <div className="d-flex flex-row gap-2 f-normal pt-4 pb-5 justify-content-center">
          <button className="btn bg-white text-black font-small rounded-1 py-2 input-border w-300">
            Cancel
          </button>
          <button
            className="btn bg-shadeblue text-white font-small rounded-1 py-2 w-300"
            onClick={handleGetCoordinates}
          >
            Go next
          </button>
        </div>
      </div>
    </>
  );
};

StepOne.propTypes = {
  onNext: PropTypes.func.isRequired,
  setFromCoords: PropTypes.func.isRequired,
  setToCoords: PropTypes.func.isRequired,
};

export default StepOne;
