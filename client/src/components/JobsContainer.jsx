import { useAllJobsContext } from "../pages/AllJobs";
import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
import PageBtnContainer from "./PageBtnContainer";
const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numOfPages } = data;
  console.log(data);
  console.log(jobs);
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
      <h5>{totalJobs} Job{jobs.length > 1 && 's'} found</h5>
      <div className="jobs">
        {data.jobs.map((data) => {
          return <Job key={data._id} {...data} />;
        })}
      </div>
      <div>
        {numOfPages > 1 ? <PageBtnContainer /> : ""}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
