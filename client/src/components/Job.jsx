import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, useSubmit } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import { useState } from "react";
import JobInfo from "./JobInfo";
import { Form } from "react-router-dom";
import ModalComponent from "./ModalComponent";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);
const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  const [showModal, setShowModal] = useState(false);
  const submit = useSubmit();
  const handleDelete = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    setShowModal(false);
    submit(null, { method: "post", action: `/dashboard/delete-job/${_id}` });
  };
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer className="actions">
          <Link to={`/dashboard/edit-job/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          {/* delete directly from action without adding JSX */}
          <button
            type="submit"
            className="btn delete-btn"
            onClick={handleDelete}
          >
            Delete
          </button>
        </footer>
      </div>
      <ModalComponent
        show={showModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </Wrapper>
  );
};

export default Job;
