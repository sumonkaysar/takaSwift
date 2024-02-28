import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { TbLogout } from "react-icons/tb";
import AdminSideMenu from "./AdminSideMenu";
import UsersSideMenu from "./UsersSideMenu";
import AgentsSideMenu from "./AgentsSideMenu";

const SideBar = () => {
  const { user, loading, logOut } = useContext(AuthContext);

  return (
    <div className="drawer-side">
      <label htmlFor="dashboard" aria-label="close sidebar" className="drawer-overlay"></label>
      <div className="bg-gray-900 h-full flex flex-col justify-between">
        <ul className="w-64 pt-8 pl-5">
          {
            user?.role === "Admin" ?
              <AdminSideMenu /> :
              user?.role === "Agent" ?
                <AgentsSideMenu /> :
                <UsersSideMenu />
          }
        </ul>
        <div className="mt-10 border-t border-red-400 pt-4 mx-5 pb-6">
          <button onClick={logOut} className="flex gap-3 items-center text-red-500">
            <TbLogout className="text-xl" />
            <span className="cursor-pointer font-semibold">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;