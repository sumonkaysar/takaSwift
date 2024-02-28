import { useContext, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { TbCoinTakaFilled } from "react-icons/tb";

const AgentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [blurred, setBlurred] = useState(true);
  const [blurredIncome, setBlurredIncome] = useState(true);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-8">
        Dashboard
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-5 lg:gap-10">
        <div className="text-center bg-slate-900 px-10 py-5 rounded-xl cursor-pointer" onClick={() => setBlurred(prev => !prev)}>
          <div className="px-5 py-6 bg-[#00b12c] flex rounded-xl items-center justify-center mb-3 max-w-[250px] h-[130px] mx-auto">
            <MdOutlineAccountBalanceWallet className="text-4xl lg:text-7xl text-white" />
          </div>
          <h4 className={blurred && "blur-sm"}>
            <span className="text-lg font-bold">{user?.balance}</span> TK
          </h4>
          <p className="text-xl">My Balance</p>
        </div>
        <div className="text-center bg-slate-900 px-10 py-5 rounded-xl" onClick={() => setBlurredIncome(prev => !prev)}>
          <div className="px-5 py-6 bg-[#a800db] flex rounded-xl items-center justify-center mb-3 max-w-[250px] h-[130px] mx-auto">
            <TbCoinTakaFilled className="text-4xl lg:text-7xl text-white" />
          </div>
          <h4 className={blurredIncome && "blur-sm"}>
            <span className="text-lg font-bold">{user?.income || 0}</span> TK
          </h4>
          <p className="text-xl">Total Money</p>
        </div>
      </div>
    </div>
  )
};

export default AgentDashboard