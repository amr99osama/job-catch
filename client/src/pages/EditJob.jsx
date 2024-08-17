const EditJob = () => {
  const job = useLoaderData();
  console.log(job);
  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={job.jobLocation}
          />

          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          {/* <button
            type="submit"
            className="btn btn-block form-btn "
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button> */}
          <SubmitBtn formBtn submitTxt="Edit Job" />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
