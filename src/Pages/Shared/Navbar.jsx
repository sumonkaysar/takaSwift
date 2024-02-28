import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="bg-slate-900 border-b">
      <div className="navbar max-w-[1440px] mx-auto w-11/12">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Taka Swift</a>
        </div>
        <div className="flex-none gap-2">
          {
            user?.email &&
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button">
                <FaUserCircle color="#fff" size={40} />
              </div>
              <div tabIndex={0} className="mt-3 z-[1] py-5 shadow dropdown-content bg-slate-950 rounded-box w-60">
                <h4 className="text-center text-gray-100 font-bold border-b pb-4">Hello, {user.firstName} {user.lastName}!</h4>
                <ul className="menu menu-sm mt-4">
                  {
                    user?.role === "Admin" ?
                      <li><Link to="/admin">Dashboard</Link></li> :
                      user?.role === "Agent" ?
                        <li><Link to="/agent">Dashboard</Link></li> :
                        <li><Link to="/dashboard">Dashboard</Link></li>
                  }
                  <li><span onClick={logOut}>Logout</span></li>
                </ul>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
};

export default Navbar