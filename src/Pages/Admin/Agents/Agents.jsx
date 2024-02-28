import { useQuery } from "@tanstack/react-query";
import { server } from "../../../links";
import Loader from "../../Shared/Loader";
import SingleAgent from "./SingleAgent/SingleAgent";
import Cookies from "js-cookie";

const Agents = () => {
  const cookie = Cookies.get("takaSwiftToken");
  const {
    isLoading,
    data: agents,
    refetch,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: () => fetch(`${server}/users?role=Agent`, { headers: { authorization: `Admin ${cookie}` } }).then((res) => res.json()),
  });

  return (
    isLoading ?
      <Loader />
      :
      (<div className="mx-4">
        <h2 className="text-2xl font-bold my-6">All Agents:</h2>
        <div className="bg-slate-800">
          <table className="table text-gray-100">
            <thead className="text-gray-400">
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Balance</th>
                <th>Income</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                agents?.map(agent =>
                  <SingleAgent
                    key={agent._id}
                    agent={agent}
                    refetch={refetch}
                  />
                )
              }
            </tbody>
          </table>
        </div>
      </div>)
  )
};

export default Agents