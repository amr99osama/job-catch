import { Form, redirect, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { SubmitBtn } from "../components";
/// action for submission form
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registeration Successfully");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data.msg);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="POST" action="" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="john" />
        <FormRow
          type="text"
          name="lastName"
          labelText="Last Name"
          defaultValue="Osama"
        />
        <FormRow
          type="email"
          name="email"
          labelText="Email Address"
          defaultValue="amrosama075@gmail.com"
        />
        <FormRow
          type="text"
          name="location"
          labelText="Location"
          defaultValue="Cairo, Egypt"
        />
        <FormRow
          type="password"
          name="password"
          labelText="Password"
          defaultValue="secret123"
        />

        <SubmitBtn />
        <p>
          Already a member ?{" "}
          <Link to="/login" className="member-btn">
            Login Page
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
