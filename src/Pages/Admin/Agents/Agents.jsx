import { useQuery } from "@tanstack/react-query";
import { server } from "../../../links";
import Loader from "../../Shared/Loader";
import SingleAgent from "./SingleAgent/SingleAgent";
import Cookies from "js-cookie";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const Agents = () => {
  const cookie = Cookies.get("takaSwiftToken");
  const [isSearching, setIsSearching] = useState(false);
  const [agent, setAgent] = useState({});

  const {
    isLoading,
    data: agents,
    refetch,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: () => fetch(`${server}/users?role=Agent`, { headers: { authorization: `Admin ${cookie}` } }).then((res) => res.json()),
  });

  const searchAgent = e => {
    if (e.target?.value?.trim()) {
      setIsSearching(true);
      fetch(`${server}/agents/search?mobile=${e.target.value.trim()}`, {
        headers: {
          "authorization": `Admin ${cookie}`
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status === 200) {
            setAgent(result.user);
          }else{
            setAgent({})
          }
        })
        .catch((error) => console.log(error));
    } else {
      setIsSearching(false);
    }
  }

  return (
    isLoading ?
      <Loader /> :
      (<div className="mx-4">
        <h2 className="text-2xl font-bold my-6">All Agents:</h2>
        <div className="mb-8">
          <div className="relative w-fit mx-auto">
            <input onKeyUp={searchAgent} type="text" placeholder="Search" className="input input-bordered input-primary w-full max-w-xs" />
            <FaSearch className="absolute right-5 top-4" />
          </div>
        </div>
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
                !isSearching ?
                  agents?.map(agent =>
                    <SingleAgent
                      key={agent._id}
                      agent={agent}
                      refetch={refetch}
                    />
                  ) :
                  agent?.email &&
                  <SingleAgent
                    agent={agent}
                    refetch={refetch}
                  />
              }
            </tbody>
          </table>
        </div>
      </div>)
  )
};

export default Agents