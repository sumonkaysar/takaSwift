import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { RiseLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="w-full h-screen items-center flex justify-center">
        <RiseLoader color="#36d7b7" />
      </div>
    );
  }

  if (!user?.email || user?.status === 'Blocked') {
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;