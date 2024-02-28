import { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user?.balance} Taka
    </div>
  )
};

export default Dashboard