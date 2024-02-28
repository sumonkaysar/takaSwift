import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { server } from "../../../links";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Shared/Loader";
import AllAgents from "./SingleTransaction/AllAgents";
import AllUsers from "./SingleTransaction/AllUsers";

const DetailedTransactions = () => {
  const { type, id } = useParams();
  const cookie = Cookies.get("takaSwiftToken");
  const {
    isLoading,
    data: transactionsInfo = {},
    refetch,
  } = useQuery({
    queryKey: ["transactionsInfo"],
    queryFn: () => fetch(`${server}/transactions/${type}/${id}`, { headers: { authorization: `Admin ${cookie}` } }).then((res) => res.json()),
  });

  const { firstName, lastName, email, mobile, income, balance } = transactionsInfo?.user || {};

  return (
    !isLoading ?
      <div>
        <div className="pl-5 pt-8">
          <h3 className="text-xl font-bold">{firstName} {lastName}</h3>
          <p>{email} <span className="font-bold">||</span> {mobile}</p>
          <p><span className="font-bold">Balance:</span> {balance} Taka</p>
          {
            income && <p><span className="font-bold">Income:</span> {income} Taka</p>
          }
        </div>
        <h2 className="text-2xl font-bold my-6 text-center underline">Transactions</h2>
        {
          type === "agent" ?
            <AllAgents
              transactions={transactionsInfo?.transactions}
            /> :
            <AllUsers
              transactions={transactionsInfo?.transactions}
            />
        }
      </div>
      :
      <Loader />
  )
};

export default DetailedTransactions