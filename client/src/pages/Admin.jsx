import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import StatItem from "../components/StatItem";
import { useDashboardContext } from "../pages/DashboardLayout";

export const loader = async () => {
  try {
    const response = await customFetch.get("/user/admin/app-stats");
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { user } = useDashboardContext();
  const { users, jobs } = useLoaderData();
  console.log(user);
  return (
    <>
      <h3 style={{ marginBottom: "20px" }}>Welcome Back, {user.user.name}</h3>
      <Wrapper>
        <StatItem
          title="current users"
          count={users}
          color="#e9b949"
          bcg="#fcefc7"
          icon={<FaSuitcaseRolling />}
        />
        <StatItem
          title="total jobs"
          count={jobs}
          color="#647acb"
          bcg="#e0e8f9"
          icon={<FaCalendarCheck />}
        />
      </Wrapper>
    </>
  );
};
export default Admin;
