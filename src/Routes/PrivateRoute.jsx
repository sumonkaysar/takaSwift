import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { RiseLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center">
        <RiseLoader color="#36d7b7" />
      </div>
    );
  }

  if (!user?.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default PrivateRoute;