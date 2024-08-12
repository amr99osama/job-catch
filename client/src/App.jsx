import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Register,
  Login,
  DashboardLayout,
  Landing,
  Error,
  Stats,
  Profile,
  Admin,
  AddJob,
  EditJob,
  DeleteJob,
} from "./pages";
import AllJobs from "./pages/AllJobs";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as allJobLoader } from "./pages/AllJobs";
import { action as addJobAction } from "./pages/AddJob";
import { loader as editJobLoader } from "./pages/EditJob";
import { action as editJobAction } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { loader as adminLoader } from "./pages/Admin";
import { action as profileAction } from "./pages/Profile";

import "bootstrap/dist/css/bootstrap.min.css";

/// loader for Dashboard layout .. used in react router to fetch data before mounting component
/// want to check when component mounting ..
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          { index: true, element: <AddJob />, action: addJobAction },
          { path: "all-jobs", element: <AllJobs />, loader: allJobLoader },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          { path: "stats", element: <Stats /> },
          { path: "profile", element: <Profile />, action: profileAction },
          { path: "admin", element: <Admin />, loader: adminLoader },
          {
            path: "delete-job/:id",
            action: deleteJobAction,
          },
        ],
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
export default App;
