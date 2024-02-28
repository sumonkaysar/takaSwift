import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, logOut } = useContext(AuthContext);

  if (user?.email && user?.role === 'Admin') {
    return children;
  }

  logOut();

  return <Navigate to="/login" />;
}

export default AdminRoute;