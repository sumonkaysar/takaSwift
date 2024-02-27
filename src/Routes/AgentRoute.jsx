import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { RiseLoader } from "react-spinners";

const AgentRoute = ({ children }) => {
  const { user, loading, logOut } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center">
        <RiseLoader color="#36d7b7" />
      </div>
    );
  }

  if (user?.email && user?.role === 'Agent') {
    return children;
  }

  logOut();

  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default AgentRoute;