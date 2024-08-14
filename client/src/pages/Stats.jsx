import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const response = await customFetch.get('/jobs/stats');
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data.msg);
    return error;
  }
}

const Stats = () => {
  const { defaultStats, defaultMonthlyApps } = useLoaderData();
  return <>
    <StatsContainer defaultStats={defaultStats} />
    <ChartsContainer defaultMonthlyApps={defaultMonthlyApps} />
  </>
};

export default Stats;
