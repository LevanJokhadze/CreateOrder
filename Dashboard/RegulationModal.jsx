import regulate from "images/regulate-logo.png";
import { useState } from "react";

const RegulationModal = () => {

  const [showModal, setShowModal] = useState(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div
      className={`modal fade ${showModal ? "show d-block bg-modal" : ""}`}
      tabIndex="-1"
    >
      <div className="modal-dialog-centered modal-dialog-scrollable max-w-700 mx-auto">
        <div className="modal-content p-2" style={{ height: "427px" }}>
          <div className="text-black d-flex flex-column align-items-center text-center">
              <img src={regulate} alt="email icon" width={164} height={164} className="mt-4" />
              <p className="f-light font-30 mb-1">Opt in to receive email updates</p>
              <p
                className="opacity-75 mt-3 mb-5 lh-sm font-12 w-350"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              </p>
              <button onClick={handleCloseModal} className="w-350 btn bg-shadeblue text-white">Agree</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegulationModal;
