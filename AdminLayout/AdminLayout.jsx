import SideBar from "./SideBar";
import { createContext } from "react";
import PropTypes from "prop-types";

export const LayoutContext = createContext();

const AdminLayout = ({ children }) => {
  return (
    <>
    <div className="d-flex flex-row">
      <SideBar />
      {children}
    </div>
    </>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node,
};

export default AdminLayout;
