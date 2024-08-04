import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { Navbar, BigSidebar, SmallSidebar } from "../components";
import { createContext, useContext, useState } from "react";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
/// configuring the context
const DashboardContext = createContext();
/// loader
export const loader = async () => {
  try {
    const { data } = await customFetch.get("/user/current-user");
    // console.log(data.user._id);
    return data;
  } catch (error) {
    return redirect("/");
  }
};
const DashboardLayout = () => {
  const navigate = useNavigate();
  const data = useLoaderData();
  console.log(data);

  const user = useLoaderData();
  // states for sidebar
  const [showSidebar, setShowSidebar] = useState(false);
  // states for darktheme
  // eslint-disable-next-line no-unused-vars
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  //// functions for states
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    /// toggling in Dark for Body
    document.body.classList.toggle("dark-theme", newDarkTheme);
    /// creating localstorage to save the latest selection of theme color
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  /// for toggling sidebar
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // logging out users
  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logging Out ...");
  };
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleSidebar,
        toggleDarkTheme,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

/// custom Hook // used to export the context to make it accessible for any other components

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
