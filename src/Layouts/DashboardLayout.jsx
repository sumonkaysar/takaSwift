import { Outlet } from "react-router-dom";
import SideBar from "../Pages/Shared/SideBar";
import Navbar from "../Pages/Shared/Navbar";

const DashboardLayout = () => {

  return (
    <>
      <Navbar />
      <div className="drawer lg:drawer-open bg-slate-950">
        <input id="dashboard" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet />
        </div>
        <SideBar />
      </div>
    </>
  )
};

export default DashboardLayout