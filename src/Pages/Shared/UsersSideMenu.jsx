import { Link } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { IoCashOutline } from "react-icons/io5";

const UsersSideMenu = () => {

  return (
    <>
      <li className="flex items-center gap-3 mb-3">
        <MdSpaceDashboard className="text-xl text-white" />
        <Link to="/dashboard" className="text-white font-semibold">Dashboard</Link>
      </li>
      <li className="flex items-center gap-3 mb-3">
        <IoIosSend className="text-xl text-white" />
        <Link to="/dashboard/send-money" className="text-white font-semibold">Send Money</Link>
      </li>
      <li className="flex items-center gap-3 mb-3">
        <IoCashOutline className="text-xl text-white" />
        <Link to="/dashboard/cash-out" className="text-white font-semibold">Cash Out</Link>
      </li>
    </>
  )
};

export default UsersSideMenu