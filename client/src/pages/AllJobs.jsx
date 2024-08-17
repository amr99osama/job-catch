import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

/// loader used for loading data .. // action used for posting data
export const loader = async ({ request }) => {
  console.log("the request URL ", request.url);
  /// get all params
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
  console.log("the params for all URL ", params);
  try {
    const { data } = await customFetch.get("/jobs", { params });
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const AllJobsContext = createContext();
const AllJobs = () => {
  const { data, searchValues } = useLoaderData();
  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <>
        <SearchContainer />
        <JobsContainer />
      </>
    </AllJobsContext.Provider>
  );
};
export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;
