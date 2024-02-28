import { useQuery } from "@tanstack/react-query";
import { server } from "../../../links";
import Loader from "../../Shared/Loader";
import SingleUser from "./SingleUser/SingleUser";
import Cookies from "js-cookie";

const Users = () => {
  const cookie = Cookies.get("takaSwiftToken");
  const {
    isLoading,
    data: users,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch(`${server}/users?role=User`, { headers: { authorization: `Admin ${cookie}` } }).then((res) => res.json()),
  });

  return (
    isLoading ?
      <Loader />
      :
      (<div className="mx-4">
        <h2 className="text-2xl font-bold my-6">All Users:</h2>
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
                users?.map(user =>
                  <SingleUser
                    key={user._id}
                    user={user}
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

export default Users