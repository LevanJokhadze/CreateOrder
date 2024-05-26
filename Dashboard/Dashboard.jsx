import us from "images/us.png";
import dashboard from "images/dashboard.png";
import RegulationModal from "./RegulationModal";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="ms-5 d-flex flex-column mr-32 w-100 align-items-center">
        <div className="nav-item us-logo border-0 bg-auth h-40 mt-3 ms-auto">
          <img src={us} alt="US Flag" />
        </div>
        <div className="darkblue h4 -mt-10 mb-60 me-auto">Dashboard</div>
        <img
          src={dashboard}
          alt="task image"
          className="img-330 opacity-50 align-self-center mb-60"
        />
        <p className="font-30 mb-4 darkblue ">You have no orders yet</p>
        <p className="opacity-50 mb-4 lh-sm font-small w-400 text-black text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Link
          to="/admin"
          className="w-300 btn bg-shadeblue text-white font-small"
        >
          Create new
        </Link>
      </div>
      <RegulationModal />
    </>
  );
};

export default Dashboard;
