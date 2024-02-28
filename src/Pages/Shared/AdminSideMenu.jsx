import { HiMiniUsers } from "react-icons/hi2";
import { MdSpaceDashboard, MdSupportAgent } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminSideMenu = () => {

  return (
    <>
      <li className="flex items-center gap-3 mb-3">
        <MdSpaceDashboard className="text-xl text-white" />
        <Link to="/admin" className="text-white font-semibold">Dashboard</Link>
      </li>
      <li className="flex items-center gap-3 mb-3">
        <MdSupportAgent className="text-xl text-white" />
        <Link to="/admin/agents" className="text-white font-semibold">Agents</Link>
      </li>
      <li className="flex items-center gap-3 mb-3">
        <HiMiniUsers className="text-xl text-white" />
        <Link to="/admin/users" className="text-white font-semibold">Users</Link>
      </li>
    </>
  )
};

export default AdminSideMenu