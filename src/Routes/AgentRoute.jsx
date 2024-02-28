import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

const AgentRoute = ({ children }) => {
  const { user, logOut } = useContext(AuthContext);

  if (user?.email && user?.role === 'Agent') {
    if (user?.status === 'Approved') {
      return children;
    }else{
      return <Navigate to="/waiting" />;
    }
  }

  logOut();

  return <Navigate to="/login" />;
}

export default AgentRoute;