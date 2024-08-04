import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";
const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="error" />
          <h3>Ohh ! This Page is not found </h3>
          <p>We cant Seem to find the page you are looking for </p>
          <Link to="/dashboard">Return to Home Page</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3>Something Went Wrong ..</h3>
      </div>
    </Wrapper>
  );
};

export default Error;
