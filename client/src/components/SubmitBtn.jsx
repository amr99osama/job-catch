import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ formBtn, submitTxt }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      className={`btn btn-block ${formBtn && "form-btn"}`}
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting ? "submitting..." : submitTxt}
    </button>
  );
};

export default SubmitBtn;
