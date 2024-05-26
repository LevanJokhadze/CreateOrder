import PropTypes from "prop-types";

const StepSideBar = ({ currentStep }) => {
  return (
    <>
      <div className="d-flex align-items-center flex-column ms-5 mt-72">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className="d-flex align-items-center flex-column pointer-none"
          >
            <div
              className={`font-15 rounded-50 pd-3 f-light ${
                step == currentStep ? "bg-shadeblue" : "bg-grey-600 darkblue"
              }`}
            >
              {step}
            </div>
            {step < 4 && (
              <hr
                style={{
                  height: "78px",
                  width: "2.5px",
                  backgroundColor: "#d9d9d9",
                  margin: "0px",
                  opacity: "1",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

StepSideBar.propTypes = {
  currentStep: PropTypes.number,
};

export default StepSideBar;
