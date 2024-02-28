import { useQuery } from "@tanstack/react-query";
import { server } from "../../../links";
import Cookies from "js-cookie";
import { TbCoinTakaFilled } from "react-icons/tb";
import { HiMiniUsers } from "react-icons/hi2";
import { MdOutlineAccountBalanceWallet, MdSupportAgent } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const cookie = Cookies.get("takaSwiftToken");
  const {
    isLoading,
    data: dashData = {},
    refetch,
  } = useQuery({
    queryKey: ["dashData"],
    queryFn: () => fetch(`${server}/dashboard/admin`, { headers: { authorization: `Admin ${cookie}` } }).then((res) => res.json()),
  });
  const {adminBalance, totalMoney, totalUsers, totalAgents, totalTransactions} = dashData;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-8">
        Dashboard
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-5 lg:gap-10">
        <div className="text-center bg-slate-900 px-10 py-5 rounded-xl">
          <div className="px-5 py-6 bg-[#00b12c] flex rounded-xl items-center justify-center mb-3 max-w-[250px] h-[130px] mx-auto">
            <MdOutlineAccountBalanceWallet className="text-4xl lg:text-7xl text-white" />
          </div>
          <h4>
            <span className="text-lg font-bold">{adminBalance}</span> TK
          </h4>
          <p className="text-xl">My Balance</p>
        </div>
        <div className="text-center bg-slate-900 px-10 py-5 rounded-xl">
          <div className="px-5 py-6 bg-[#a800db] flex rounded-xl items-center justify-center mb-3 max-w-[250px] h-[130px] mx-auto">
            <TbCoinTakaFilled className="text-4xl lg:text-7xl text-white" />
          </div>
          <h4>
            <span className="text-lg font-bold">{totalMoney}</span> TK
          </h4>
          <p className="text-xl">Total Money</p>
        </div>
        <div className="text-center bg-slate-900 px-10 py-5 rounded-xl">
          <div className="px-5 py-6 bg-[#0088be] flex rounded-xl items-center justify-center mb-3 max-w-[250px] h-[130px] mx-auto">
            <HiMiniUsers className="text-4xl lg:text-7xl text-white" />
          </div>
          <h4>
            <span className="text-lg font-bold">{totalUsers}</span>
          </h4>
          <p className="text-xl">Total Users</p>
        </div>
        <div className="text-center bg-slate-900 px-10 py-5 rounded-xl">
          <div className="px-5 py-6 bg-[#be0085] flex rounded-xl items-center justify-center mb-3 max-w-[250px] h-[130px] mx-auto">
            <MdSupportAgent className="text-4xl lg:text-7xl text-white" />
          </div>
          <h4>
            <span className="text-lg font-bold">{totalAgents}</span>
          </h4>
          <p className="text-xl">Total Agents</p>
        </div>
        <div className="text-center bg-slate-900 px-10 py-5 rounded-xl">
          <div className="px-5 py-6 bg-[#1c00be] flex rounded-xl items-center justify-center mb-3 max-w-[250px] h-[130px] mx-auto">
            <FaRegMoneyBillAlt className="text-4xl lg:text-7xl text-white" />
          </div>
          <h4>
            <span className="text-lg font-bold">{totalTransactions}</span>
          </h4>
          <p className="text-xl">Total Transactions</p>
        </div>
      </div>
    </div>
  )
};

export default AdminDashboard