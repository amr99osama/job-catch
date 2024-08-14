import { Link, Form, redirect, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login Successful !");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const Login = () => {
  // want to make a flow for demo user .. test user flow
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: "test123@gmail.com",
      password: "Amr@12345",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("Demo User is Activated  !");
      return navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
  return (
    <Wrapper>
      <Form method="POST" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow
          type="email"
          name="email"
          labelText="Email Address"
          defaultValue="amrosama075@gmail.com"
        />
        <FormRow
          type="password"
          name="password"
          labelText="Password"
          defaultValue="secret123"
        />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          Explore App
        </button>
        {/* <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting .." : "submit"}
        </button> */}
        <SubmitBtn submitTxt="Login" />
        <p>
          Not a Member Yet ?
          <Link to="/register" className="member-btn">
            Register Here
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
