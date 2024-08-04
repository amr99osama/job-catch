import { useAllJobsContext } from "../pages/AllJobs";
import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
const JobsContainer = () => {
  const { data } = useAllJobsContext();
  //const { jobs } = data;
  if (data.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="jobs">
        {data.map((data) => {
          return <Job key={data._id} {...data} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
