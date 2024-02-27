import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";

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
    ],
  },
  // {
  //   path: "/admin",
  //   element: <PrivateRoute><AdminRoute><AdminRoot /></AdminRoute></PrivateRoute>,
  //   children: [
  //     {
  //       path: "/admin",
  //       element: <AdminDashboard />,
  //     },
  //   ],
  // },
]);

export default router;
