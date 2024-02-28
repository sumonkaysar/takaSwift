import { useQuery } from "@tanstack/react-query";
import { server } from "../../../links";
import Loader from "../../Shared/Loader";
import SingleUser from "./SingleUser/SingleUser";
import Cookies from "js-cookie";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Users = () => {
  const cookie = Cookies.get("takaSwiftToken");
  const [isSearching, setIsSearching] = useState(false);
  const [user, setUser] = useState({});

  const {
    isLoading,
    data: users,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch(`${server}/users?role=User`, { headers: { authorization: `Admin ${cookie}` } }).then((res) => res.json()),
  });

  const searchUser = e => {
    if (e.target?.value?.trim()) {
      setIsSearching(true);
      fetch(`${server}/users/search?mobile=${e.target.value.trim()}`, {
        headers: {
          "authorization": `Admin ${cookie}`
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status === 200) {
            setUser(result.user);
          } else {
            setUser({})
          }
        })
        .catch((error) => console.log(error));
    } else {
      setIsSearching(false);
    }
  }

  return (
    isLoading ?
      <Loader />
      :
      (<div className="mx-4">
        <h2 className="text-2xl font-bold my-6">All Users:</h2>
        <div className="mb-8">
          <div className="relative w-fit mx-auto">
            <input onKeyUp={searchUser} type="text" placeholder="Search" className="input input-bordered input-primary w-full max-w-xs" />
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
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                !isSearching ?
                  users?.map(user =>
                    <SingleUser
                      key={user._id}
                      user={user}
                      refetch={refetch}
                    />
                  ) :
                  user?.email &&
                  <SingleUser
                    user={user}
                    refetch={refetch}
                  />
              }
            </tbody>
          </table>
        </div>
      </div>)
  )
};

export default Users