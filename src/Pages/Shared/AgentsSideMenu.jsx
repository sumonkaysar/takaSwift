import { BsCashCoin } from "react-icons/bs";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

const AgentsSideMenu = () => {

  return (
    <>
      <li className="flex items-center gap-3 mb-3">
        <MdSpaceDashboard className="text-xl text-white" />
        <Link to="/agent" className="text-white font-semibold">Dashboard</Link>
      </li>
      <li className="flex items-center gap-3 mb-3">
        <BsCashCoin className="text-xl text-white" />
        <Link to="/agent/cash-in" className="text-white font-semibold">Cash In</Link>
      </li>
    </>
  )
};

export default AgentsSideMenu