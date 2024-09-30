import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Matches from "../pages/Matches";
import NotFound from "../pages/NotFound";
import MatchDetails from "../pages/MatchDetails";
import Profile from "../pages/Profile";
import MainLayout from "../layouts/MainLayout";
import AllPlayers from "../pages/AllPlayers";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AllUsers from "../pages/admin/AllUsers";
import UpdateUser from "../pages/admin/UpdateUser";
import AdminHome from "../pages/admin/AdminHome";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/matches",
        element: <Matches />,
      },
      {
        path: "/matches/:id",
        element: <MatchDetails />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/players",
        element: <AllPlayers />,
      },
    ],
  },
  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminHome />,
      },
      {
        path: "/admin/users",
        element: <AllUsers />,
      },
      {
        path: "/admin/update-user/:id",
        element: <UpdateUser />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
