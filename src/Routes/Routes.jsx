import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Agents from "../Pages/Admin/Agents/Agents";
import Users from "../Pages/Admin/Users/Users";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Pages/Users/Dashboard/Dashboard";
import SendMoney from "../Pages/Users/SendMoney/SendMoney";
import AgentRoute from "./AgentRoute";
import CashIn from "../Pages/Agents/CashIn/CashIn";
import WaitingPage from "../Pages/WaitingPage/WaitingPage";
import DetailedTransactions from "../Pages/Admin/DetailedTransactions/DetailedTransactions";
import CashOut from "../Pages/Users/CashOut/CashOut";
import AdminDashboard from "../Pages/Admin/Dashboard/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      // {
      //   path: "/",
      //   element: <Home />,
      // },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/waiting",
        element: <WaitingPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/send-money",
        element: <SendMoney />,
      },
      {
        path: "/dashboard/cash-out",
        element: <CashOut />,
      },
    ],
  },
  {
    path: "/agent",
    element: <PrivateRoute><AgentRoute><DashboardLayout /></AgentRoute></PrivateRoute>,
    children: [
      {
        path: "/agent",
        element: <Dashboard />,
      },
      {
        path: "/agent/cash-in",
        element: <CashIn />,
      },
    ],
  },
  {
    path: "/admin",
    element: <PrivateRoute><AdminRoute><DashboardLayout /></AdminRoute></PrivateRoute>,
    children: [
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/agents",
        element: <Agents />,
      },
      {
        path: "/admin/users",
        element: <Users />,
      },
      {
        path: "/admin/:type/:id/transactions",
        element: <DetailedTransactions />,
      },
    ],
  },
]);

export default router;
